Vue.component('type1', {
  template: `
    <div class="Type1">
      <ElasticFieldBgImg class="Type1__background"/>
      <div class="Type1__header">
        <ElasticField class="Type1__header-elem1"/>
      </div>
      
      <div class="Type1__content">
        <ElasticField class="Type1__content-elem1"/>
        <div class="Type1__content-elem2">
          <ElasticField class="Type1__content-elem2-1"/>
          <ElasticField class="Type1__content-elem2-2"/>
        </div>
        <ElasticField class="Type1__content-elem3"/>
      </div>
      
      <div class="Type1__footer">
        <div class="Type1__footer-static-text">
          <div class="Type1__info">Информация</div>
          <div class="Type1__maps">Карты</div>
        </div>
        <div class="Type1__footer-links">
          <ElasticFieldLink class="Type1__wiki" text="wiki"/>
          <div class="Type1__footer-links-right-column">
            <ElasticFieldLink class="Type1__mende" text="менде"/>
            <ElasticFieldLink class="Type1__yandex" text="яндекс"/>
          </div>
         </div>
      </div>
    </div>`,
});
