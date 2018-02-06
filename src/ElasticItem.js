Vue.component('elastic-item', {
  props: ['render', 'staticRenderFns', 'datum'],
  render(h) {
    if (!this.$options.staticRenderFns) {
      this.$options.staticRenderFns = this.staticRenderFns;
    }
    
    return this.render
      ? this.render()
      : h('div');
  }
});
