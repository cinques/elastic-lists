Vue.component('ElasticItemList', {
  props: ['config'],
  template: `<div class="ElasticItemList">
              <template v-if="filteredData.length">
                ${itemTemplate}
              </template>
            </div>`,
  data() {
    return {
      filteredData: this.config.JSON,
    }
  },
  created() {
    EventBus.$on('onFilter', () => {
      this.filteredData = this.config.JSON.filter(x => x.__filtered__);
    });
  },
});

Vue.component('App', {
  template: `
    <div id="app">
      <div class="ElasticView">
        <div class="Header">{{config.DatasetName}}</div>
        <ElasticFilterList :config="config"/>
        <ElasticItemList ref="itemList" :config="config"/>
      </div>
    </div>`,
  created() {
    this.config.JSON = data;
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
  template: '<App/>',
});
