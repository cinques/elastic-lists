Vue.component('ElasticFilter', {
  template: `
    <div class="ElasticFilter"
         :class="{
           ElasticFilter_active: isActive,
           ElasticFilter_empty: !number && canChangeVisible,
         }"
         @click="onClick"
    >
      <span class="ElasticFilter__name ellipsis" :title="name">{{name}}</span>
      <span class="ElasticFilter__number ellipsis" :title="number">{{number}}</span>
    </div>`,
  props: {
    name: [String, Number],
    number: [String, Number],
    canChangeVisible: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      isActive: false,
    }
  },
  methods: {
    onClick() {
      this.isActive = !this.isActive;
      this.$emit('onFilter', this.name, this.isActive);
    }
  },
});
