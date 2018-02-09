Vue.component('type3', {
  template: `
    <div class="Type3">
      <elastic-field-background-img class="Type3__background"/>
      <div class="Type3__header">
        <elastic-field class="Type3__header-elem1"/>
        <elastic-field class="Type3__header-elem2"/>
      </div>
      
      <div class="Type3__content">
        <elastic-field class="Type3__content-elem1"/>
        <elastic-field class="Type3__content-elem2"/>
      </div>
      
      <div class="Type3__footer">
        <elastic-field class="Type3__footer-elem1"/>
      </div>
    </div>`,
  props: ['model'],
});
