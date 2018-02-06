Vue.component('elastic-field-link', {
  template: `
    <div class="ElasticField" :class="'ElasticItem__' + selected">
      <a :href="selected">{{text}}</a>
      <ul class="ElasticField__ul" :class="{ hidden: !expanded }">
        <li class="ElasticField__li" v-for="field of Object.keys(model)" @click="onFieldChange(field)">{{field}}</li>
      </ul>
    </div>`,
  props: ['text'],
  data() {
    const model = this.$parent.model;
    return {
      model,
      selected: Object.keys(model)[0],
      expanded: false,
    }
  },
  methods: {
    onFieldChange(field) {
      this.selected = field;
      EventBus.$emit('onFieldChange');
    },
    getTemplate() {
      return `<a class="ElasticItem__${this.selected}" :href="datum.${this.selected}">${this.text}</a>`
    }
  },
});
