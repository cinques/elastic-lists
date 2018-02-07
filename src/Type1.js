Vue.component('type1', {
  template: `
    <div class="Type1">
      <div class="Type1__header">
        <elastic-field class="Type1__header-elem1"/>
      </div>
      
      <div class="Type1__content">
        <elastic-field class="Type1__content-elem1"/>
        <div class="Type1__content-elem2">
          <elastic-field class="Type1__content-elem2-1"/>
          <elastic-field class="Type1__content-elem2-2"/>
        </div>
        <elastic-field class="Type1__content-elem3"/>
      </div>
      
      <div class="Type1__footer">
        <div class="Type1__footer-static-text">
          <div class="Type1__info">Информация</div>
          <div class="Type1__maps">Карты</div>
        </div>
        <div class="Type1__footer-links">
          <elastic-field-link class="Type1__wiki" text="wiki"/>
          <div class="Type1__footer-links-right-column">
            <elastic-field-link class="Type1__mende" text="менде"/>
            <elastic-field-link class="Type1__yandex" text="яндекс"/>
          </div>
         </div>
      </div>
    </div>`,
  props: ['model'],
});
