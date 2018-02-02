Vue.component('elastic-field', {
  template: `
    <div class="ElasticField" :class="'ElasticItem__' + selected">
      {{selected}}
      <ul class="ElasticField__ul" :class="{ hidden: !expanded }">
        <li class="ElasticField__li" v-for="field of Object.keys(model)" @click="onFieldChange(field)">{{field}}</li>
      </ul>
    </div>`,
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
  },
});
