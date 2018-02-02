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

Vue.component('app', {
  template: `
    <div id="app">
      <elastic-builder :config="config" @onBuild="build" />
      
      <link v-if="config.Style"
            rel="stylesheet"
            :href="'data:text/css;charset=UTF-8,' + encodeURIComponent(config.Style)">
      <div class="ElasticView" :class="{ hidden: !config.Style.length }">
        <div class="Header">{{config.DatasetName}}</div>
        <elastic-filter-list :config="config"/>
        <elastic-item-list ref="itemList" :config="config"/>
      </div>
    </div>`,
  created() {
    EventBus.$on('onFileChange', (json) => {
      this.config.JSON = json;
      this.config.Filters = Object.keys(json[0]).slice(0, this.config.FiltersRelation.length);
      EventBus.$emit('onFiltersChanged');
    })
  },
  data() {
    return {
      config: {
        DatasetName: 'Header',
        CardType: 'type1',
        FiltersRelation: [1, 1, 1],
        Filters: [],
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
      const config = {...this.config, JSON: [], Style: ''};

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
