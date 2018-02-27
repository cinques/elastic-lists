Vue.component('ElasticFieldColor', {
  template: `
    <div>
      <BaseElasticField ref="base">
        <div class="ElasticField__text">*</div>
      </BaseElasticField>
    </div>
  `,
  methods: {
    getTemplate() {
      const base = this.$refs.base;
      const classList = this.$el.classList;
      return `
        <div class="${classList}" :style="{ backgroundColor: datum.${base.selected} }"></div>
      `;
    }
  },
});
