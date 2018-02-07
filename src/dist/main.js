Vue.component('elastic-item-list', {
  props: ['config'],
  template: `<div class="ElasticItemList">
              <template v-if="filteredData.length">
                ${itemTemplate}
              </template>
            </div>`,
  data() {
    return {
      filteredData: [],
    }
  },
  created() {
    EventBus.$on('onFileChange', (json) => {
      this.filteredData = json;
    });
    EventBus.$on('onFilter', () => {
      this.filteredData = this.config.JSON.filter(x => x.__filtered__);
    });
  },
});

Vue.component('app', {
  template: `
    <div id="app">
      <div class="ElasticView">
        <div class="Header">{{config.DatasetName}}</div>
        <elastic-filter-list :config="config"/>
        <elastic-item-list ref="itemList" :config="config"/>
      </div>
    </div>`,
  created() {
    EventBus.$on('onFileChange', (json) => {
      this.config.JSON = json;
      EventBus.$emit('onFiltersChanged');
    })
  },
  data() {
    return {
      config: ${config}
    }
  },
});


window.EventBus = new Vue();

new Vue({
  el: '#app',
  template: '<app/>',
});

EventBus.$emit('onFileChange', data);
