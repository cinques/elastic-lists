Vue.component('BaseElasticField', {
  template: `
    <div class="ElasticField">
      <slot :selected="selected"></slot>
      <ul class="ElasticField__ul">
        <li 
          v-for="field of model"
          class="ElasticField__li"
          @click="onFieldChange(field)"
        >
          {{ field }}
        </li>
      </ul>
    </div>`,
  inject: ['model'],
  data() {
    return {
      selected: this.model[0],
    }
  },
  methods: {
    onFieldChange(field) {
      this.selected = field;
      EventBus.$emit('onFieldChange');
    },
  },
});
