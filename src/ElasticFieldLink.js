Vue.component('elastic-field-link', {
  template: `
    <div class="ElasticField" :class="'ElasticItem__' + selected">
      <a class="ElasticField__text" :href="selected">{{text}}</a>
      <ul class="ElasticField__ul">
        <li class="ElasticField__li" v-for="field of Object.keys(model)" @click="onFieldChange(field)">{{field}}</li>
      </ul>
    </div>`,
  props: ['text'],
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
      return `<div class="${classList}"><a :href="datum.${this.selected}">${this.text}</a></div>`
    }
  },
});
