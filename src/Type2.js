Vue.component('type2', {
  template: `
    <div class="Type2">
      <ElasticFieldBgColor class="Type2__background"/>
      <div class="Type2__header">
        <ElasticField class="Type2__header-elem1"/>
        <ElasticField class="Type2__header-elem2"/>
      </div>
      
      <div class="Type2__content">
        <ElasticFieldIcon class="Type2__content-elem1"/>
        <div class="Type2__content-elem2">
          <ElasticField class="Type2__content-elem2-1"/>
          <ElasticField class="Type2__content-elem2-2"/>
          <div class="Type2__content-elem2-3">
            <ElasticField class="Type2__content-elem2-3-1"/>
            <ElasticField class="Type2__content-elem2-3-2"/>
          </div>
        </div>
      </div>
      
      <div class="Type2__footer">
        <div class="Type2__footer-elem1">
          <div class="Type2__footer-elem1-1">Colors</div>
          <div class="Type2__footer-elem1-2">
            <ElasticFieldColor class="Type2__footer-elem1-2-1"/>
            <ElasticFieldColor class="Type2__footer-elem1-2-2"/>
            <ElasticFieldColor class="Type2__footer-elem1-2-3"/>
          </div>
        </div>
        
        <div class="Type2__footer-elem2">
          <div class="Type2__footer-elem2-1">Contacts</div>
          <div class="Type2__footer-elem2-2">
            <ElasticFieldLink class="Type2__email" text="email"/>
            <ElasticFieldLink class="Type2__web" text="web"/>
            <ElasticFieldLink class="Type2__social" text="social"/>
          </div>
         </div>
      </div>
    </div>`,
});
