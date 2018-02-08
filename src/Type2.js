Vue.component('type2', {
  template: `
    <div class="Type2">
      <div class="Type2__header">
        <elastic-field class="Type2__header-elem1"/>
        <elastic-field class="Type2__header-elem2"/>
      </div>
      
      <div class="Type2__content">
        <elastic-field-icon class="Type2__content-elem1"/>
        <div class="Type2__content-elem2">
          <elastic-field class="Type2__content-elem2-1"/>
          <elastic-field class="Type2__content-elem2-2"/>
          <div class="Type2__content-elem2-3">
            <elastic-field class="Type2__content-elem2-3-1"/>
            <elastic-field class="Type2__content-elem2-3-2"/>
          </div>
        </div>
      </div>
      
      <div class="Type2__footer">
        <div class="Type2__footer-elem1">
          <div class="Type2__footer-elem1-1">Colors</div>
          <elastic-field-colors class="Type2__footer-elem1-2"/>
        </div>
        
        <div class="Type2__footer-elem2">
          <div class="Type2__footer-elem2-1">Contacts</div>
          <div class="Type2__footer-elem2-2">
            <elastic-field-link class="Type2__email" text="email"/>
            <elastic-field-link class="Type2__web" text="web"/>
            <elastic-field-link class="Type2__social" text="social"/>
          </div>
         </div>
      </div>
    </div>`,
  props: ['model'],
});
