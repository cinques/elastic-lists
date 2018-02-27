Vue.component('ElasticField', {
  template: `
    <div>
      <BaseElasticField ref="base">
        <div class="ElasticField__text" slot-scope="props">
          {{ props.selected }}
        </div>
      </BaseElasticField>
    </div>
  `,
  methods: {
    getTemplate() {
      const base = this.$refs.base;
      const classList = this.$el.classList;
      return `
        <div class="${classList}">{{ datum.${base.selected} }}</div>
      `;
    }
  },
});
