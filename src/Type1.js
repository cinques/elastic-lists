Vue.component('type1', {
  template: `
    <div class="Type1">
      <div class="Type1__title">
        <elastic-field class="Type1__title-elem1"/>
      </div>
      
      <div class="Type1__item">
        <elastic-field class="Type1__item-elem1"/>
        <elastic-field class="Type1__item-elem2"/>, <elastic-field class="Type1__item-elem3"/>
        <elastic-field class="Type1__item-elem4"/>
      </div>
      
      <div class="Type1__btn-single">
        <div class="Type1__btn-signle-caption">Информация</div>
        <elastic-field-link class="Type1__btn-signle-wiki" text="wiki"/>
      </div>
      
      <div class="Type1__btn-group">
        <div class="Type1__btn-group-caption">Карты</div>
        <elastic-field-link class="Type1__btn-group-mende" text="менде"/>
        <elastic-field-link class="Type1__btn-group-yandex" text="яндекс"/>
      </div>
    </div>`,
  props: ['model'],
});
