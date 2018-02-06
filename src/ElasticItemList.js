Vue.component('elastic-item-list', {
  template: `
    <div class="ElasticItemList">
      <template v-if="filteredData.length">
        <component ref="templateCard"
                   :is="config.CardType"
                   :model="filteredData[0]" />
        <template v-if="cardTemplate">
          <elastic-item v-for="datum of filteredData"
                     :key="datum.__id__"
                     :datum="datum"
                     :render="cardTemplate.render"
                     :staticRenderFns="cardTemplate.staticRenderFns" />
        </template>
      </template>
    </div>`,
  props: ['config'],
  data() {
    return {
      filteredData: [],
      cardTemplate: null,
    }
  },
  created() {
    EventBus.$on('onFileChange', (json) => {
      this.filteredData = json;
      this.$nextTick(() => {
        this.cardTemplate = this.buildCardTemplate();
      })
    });
    EventBus.$on('onFilter', () => {
      this.filteredData = this.config.JSON.filter(x => x.__filtered__);
    });
    EventBus.$on('onFieldChange', () => {
      this.cardTemplate = this.buildCardTemplate();
    })
  },
  watch: {
    'config.CardType'() {
      this.$nextTick(() => { this.cardTemplate = this.buildCardTemplate() });
    }
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

      const markup = traverse(this.$refs.templateCard.$el, true);

      return raw
        ? markup
        : Vue.compile(`<div class="ElasticItem">${markup}</div>`);
    },
  },
});
