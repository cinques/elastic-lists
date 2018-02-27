Vue.component('ElasticFieldLink', {
  template: `
    <div>
      <BaseElasticField ref="base">
        <a
          class="ElasticField__text"
          slot-scope="props"
          :href="props.selected"
        >
          {{ text }}
        </a>
      </BaseElasticField>
    </div>
  `,
  props: ['text'],
  methods: {
    getTemplate() {
      const base = this.$refs.base;
      const classList = this.$el.classList;
      return `
        <div v-show="datum.${base.selected}" class="${classList}">
          <a :href="datum.${base.selected}">${this.text}</a>
        </div>
      `;
    }
  },
});
