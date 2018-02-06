Vue.component('type1', {
  template: `
    <div class="ItemCard-T1">
      <div class="Title">
        <elastic-field/>
      </div>
      
      <div class="Item">
        <elastic-field/>
        <elastic-field/>, <elastic-field/>
        <elastic-field/>
      </div>
      
      <div class="btn_Single">
        <div class="ElasticItem__info">Информация</div>
        <elastic-field-link text="wiki"/>
      </div>
      
      <div class="btn_Group">
        <div class="ElasticItem__maps">Карты</div>
        <elastic-field-link text="менде"/>
        <elastic-field-link text="яндекс"/>
      </div>
    </div>`,
  props: ['model'],
});
