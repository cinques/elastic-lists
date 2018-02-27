Vue.component('ElasticFieldBgImg', {
  template: `
    <div>
      <BaseElasticField ref="base" class="ElasticFieldBackgroundImg">
        <div class="ElasticField__text">bg</div>
      </BaseElasticField>
    </div>
  `,
  methods: {
    getTemplate() {
      const base = this.$refs.base;
      const classList = this.$el.classList;
      return `
        <div class="${classList} bg-img" :style="{ backgroundImage: 'url(' + datum.${base.selected} + ')' }"></div>
      `;
    }
  },
});
