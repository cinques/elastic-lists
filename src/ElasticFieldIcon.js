Vue.component('ElasticFieldIcon', {
  template: `
    <div>
      <BaseElasticField ref="base">
        <img
          class="ElasticField__text"
          slot-scope="props"
          :src="props.selected"
        >
      </BaseElasticField>
    </div>
  `,
  methods: {
    getTemplate() {
      const base = this.$refs.base;
      const classList = this.$el.classList;
      return `
        <div class="${classList}"><img :src="datum.${base.selected}"></div>
      `;
    }
  },
});
