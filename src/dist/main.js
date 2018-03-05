Vue.component('ElasticItemList', {
  props: ['config'],
  template: `<div class="ElasticItemList">
              <template v-if="filteredData.length && isShowCards">
                ${itemTemplate}
              </template>
            </div>`,
  data() {
    return {
      filteredData: this.config.JSON,
      isShowCards: this.config.IsShowCardsOnEmptyFilter,
    }
  },
  created() {
    EventBus.$on('onFilter', (activeFiltersCount) => {
      this.filteredData = this.config.JSON.filter(x => x.__filtered__);
      if (!this.config.IsShowCardsOnEmptyFilter) {
        this.isShowCards = !!activeFiltersCount;
      }
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
  props: {
    config: {
      type: Object,
      required: true,
    }
  },
});


window.EventBus = new Vue();

fetch('data.json')
  .then(response => response.json())
  .then(json => {
    const config = ${config};
    config.JSON = json;

    new Vue({
      el: '#app',
      template: '<App :config="config"/>',
      data() {
        return {
          config,
        }
      },
    });
  });

