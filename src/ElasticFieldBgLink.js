Vue.component('ElasticFieldBgLink', {
  template: `
    <div class="ElasticFieldBgLink">
      <BaseElasticField ref="base">
        <div class="ElasticField__text">url</div>
      </BaseElasticField>
    </div>
  `,
  methods: {
    getTemplate() {
      const base = this.$refs.base;
      const classList = this.$el.classList.toString().replace('ElasticFieldBgLink', '');
      return `
        <a class="${classList}" :href="datum.${base.selected}"></a>
      `;
    }
  },
});
