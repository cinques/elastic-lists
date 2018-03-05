Vue.component('ElasticItemList', {
  template: `
    <div class="ElasticItemList">
      <template v-if="filteredData.length">
        <component ref="templateCard"
                   class="ElasticItem"
                   :is="config.CardType"
                   :model="filteredData[0]" />
        <template v-if="cardTemplate && isShowCards">
          <ElasticItem v-for="datum of filteredData"
                     :key="datum.__id__"
                     :datum="datum"
                     :render="cardTemplate.render"
                     :staticRenderFns="cardTemplate.staticRenderFns" />
        </template>
      </template>
    </div>`,
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      filteredData: [],
      cardTemplate: null,
      isShowCards: this.config.IsShowCardsOnEmptyFilter,
    }
  },
  provide() {
    const provided = {};
    Object.defineProperty(provided, 'model', {
      get: () => Object.keys(this.filteredData[0]),
    });

    return provided;
  },
  watch: {
    'config.JSON'() {
      this.filteredData = this.config.JSON;
      this.$nextTick(() => {
        this.cardTemplate = this.buildCardTemplate();
      })
    },
    'config.CardType'() {
      this.$nextTick(() => { this.cardTemplate = this.buildCardTemplate() });
    }
  },
  created() {
    EventBus.$on('onFilter', (activeFiltersCount) => {
      this.filteredData = this.config.JSON.filter(x => x.__filtered__);
      if (!this.config.IsShowCardsOnEmptyFilter) {
        this.isShowCards = !!activeFiltersCount;
      }
    });
    EventBus.$on('onFieldChange', () => {
      this.cardTemplate = this.buildCardTemplate();
    })
  },
  methods: {
    buildCardTemplate(raw) {
      const traverse = (child, isRoot) => {
        const vm = child.__vue__;
        if (vm && !isRoot) {
          return vm.getTemplate();
        }

        if (!child.children.length) {
          return child.outerHTML;
        }

        const childClone = child.cloneNode();
        childClone.innerHTML = [...child.children].map(x => traverse(x)).join('');

        if (isRoot) {
          return childClone.innerHTML;
        }

        return childClone.outerHTML;
      };

      const root = this.$refs.templateCard.$el;
      const markup = traverse(root, true);
  
      const rootClone = root.cloneNode();
      rootClone.innerHTML = markup;
  
      rootClone.setAttribute(':class', '"now" + datum.now');
      
      if (raw) {
        rootClone.setAttribute('v-for', 'datum of filteredData');
        rootClone.setAttribute(':key', 'datum.__id__');
        return rootClone.outerHTML;
      }
      
      return Vue.compile(rootClone.outerHTML);
    },
  },
});
