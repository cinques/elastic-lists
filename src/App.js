const files = [
  'src/dist/index.html',
  'src/dist/vue.js',
  'src/ElasticFilter.js',
  'src/ElasticFilterList.js',
  'src/dist/main.js',
];
Promise.all(files.map(url => fetch(url).then(resp => resp.text())))
  .then(result => {
    window.dist = {
      index: result[0],
      vue: result[1],
      main: result[2] + result[3] + result[4],
    };
  });

Vue.component('App', {
  template: `
    <div id="app">
      <ElasticBuilder :config="config" @onBuild="build" />
      
      <link v-if="config.Style"
            rel="stylesheet"
            :href="'data:text/css;charset=UTF-8,' + encodeURIComponent(config.Style)">
      
      <div class="ElasticView" v-show="config.Style.length">
        <div class="Header">{{config.DatasetName}}</div>
        <ElasticFilterList :config="config"/>
        <ElasticItemList ref="itemList" :config="config"/>
      </div>
    </div>`,
  created() {
    EventBus.$on('onFileChange', (json) => {
      this.config.JSON = json;

      const fields = Object.keys(json[0]);
      this.config.Filters.forEach((filter, i) => {
        filter.name = fields[i];
      });
    })
  },
  data() {
    return {
      config: {
        DatasetName: 'Header',
        CardType: 'type1',
        Filters: [{
          name: null,
          ratio: 1,
          sortType: 0,
          sortLock: false,
        }, {
          name: null,
          ratio: 1,
          sortType: 0,
          sortLock: false,
        }, {
          name: null,
          ratio: 1,
          sortType: 0,
          sortLock: false,
        }],
        JSON: [],
        Style: '',
      },
    }
  },
  methods: {
    build() {
      const zip = new JSZip();

      zip.file('index.html', dist.index);
      zip.file('style.css', this.config.Style);
      zip.file('vue.js', dist.vue);
      zip.file('data.js', 'window.data = ' + JSON.stringify(this.config.JSON));

      const itemTemplate = this.$refs.itemList.buildCardTemplate(true);
      const config = Object.assign({}, this.config, { JSON: [], Style: ''});

      const main = dist.main
        .replace('${config}', JSON.stringify(config))
        .replace('${itemTemplate}', itemTemplate);
      zip.file('main.js', main);

      zip.generateAsync({type: "blob"}).then(function (content) {
        saveAs(content, "dist.zip");
      });
    }
  },
});
