Vue.component('elastic-item', {
  props: ['template', 'datum'],
  render(h) {
    return this.template
      ? this.template()
      : h('div');
  }
});
