Vue.component('elastic-field-colors', {
   template: `
    <div class="ElasticField" :class="'ElasticItem__' + selected">
      <div class="ElasticField__text">colors</div>
      <ul class="ElasticField__ul">
        <li class="ElasticField__li" v-for="field of Object.keys(model)" @click="onFieldChange(field)">{{field}}</li>
      </ul>
    </div>`,
   data() {
      const model = this.$parent.model;
      return {
         model,
         selected: Object.keys(model)[0],
      }
   },
   methods: {
      onFieldChange(field) {
         this.selected = field;
         EventBus.$emit('onFieldChange');
      },
      getTemplate() {
         const classList = this.$el.classList.toString().replace('ElasticField', '');
         return `<div class="${classList}">
                  <div v-for="color of datum.${this.selected}" :style="{ backgroundColor: color }"></div>
                </div>`
      }
   },
});
