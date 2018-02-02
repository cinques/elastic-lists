Vue.component('elastic-filter', {
  template: `
    <div class="ElasticFilter"
         :class="{
           ElasticFilter_active: isActive,
           ElasticFilter_empty: !number,
         }"
         @click="onClick"
    >
      <span class="ElasticFilter__name ellipsis" :title="name">{{name}}</span>
      <span class="ElasticFilter__number ellipsis" :title="number">{{number}}</span>
    </div>`,
  props: ['name', 'number'],
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
