Vue.component('BaseElasticField', {
  template: `
    <div class="ElasticField">
      <slot :selected="selected"></slot>
      <ul class="ElasticField__ul">
        <li 
          v-for="field of Object.keys(model)"
          class="ElasticField__li"
          @click="onFieldChange(field)"
        >
          {{ field }}
        </li>
      </ul>
    </div>`,
  data() {
    const model = this.$parent.$parent.model;
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
  },
});
