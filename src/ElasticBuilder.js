Vue.component('ElasticBuilder', {
  template: `
    <div class="ElasticBuilder">
      <div class="ElasticBuilder__row0">
        Builder
      </div>
      
      <div class="ElasticBuilder__row1">
        <label class="ElasticBuilder__dataset-name">
          <div class="ElasticBuilder__label-text">Dataset name</div>
          <input class="ElasticBuilder__label-option" type="text" v-model="config.DatasetName">
        </label>
    
        <label class="ElasticBuilder__card-type">
          <div class="ElasticBuilder__label-text">Card type</div>
          <select class="ElasticBuilder__label-option" v-model="config.CardType">
            <option v-for="type of availableCardTypes" :value="type">
              {{type}}
            </option>
          </select>
        </label>
    
        <label class="ElasticBuilder__filters-relation">
          <div class="ElasticBuilder__label-text">Filters Relation</div>
          <input class="ElasticBuilder__label-option" type="text" pattern="(\\d{1,2}/)+\\d" value="1/1/1" @blur="onFiltersRelation" @keyup.enter="onFiltersRelation">
        </label>
    
        <label class="ElasticBuilder__json">
          <div class="ElasticBuilder__label-text">JSON</div>
          <div class="ElasticBuilder__label-option">{{jsonFileName}}</div>
          <input type="file" accept=".json" @change="readFile">
        </label>
        
        <label class="ElasticBuilder__style">
          <div class="ElasticBuilder__label-text">Style</div>
          <div class="ElasticBuilder__label-option">{{styleFileName}}</div>
          <input type="file" accept=".css" @change="readCss">
        </label>
      </div>
      
      <template v-if="fields.length">
      
        <div class="ElasticBuilder__filters" ref="filters">
          <label v-for="(filter, idx) of config.Filters" :key="idx">
            <div class="ElasticBuilder__label-text">
              <div class="ElasticBuilder__label-text-left">F{{idx}}</div>
              <div class="ElasticBuilder__label-text-right">
                
                <div class="ElasticBuilder__filter-sort-type" @click="filter.sortType = Number(!filter.sortType)">
                  {{ filter.sortType === 0 ? 'A-Z' : '1-9' }}
                </div>
                
                <div
                  class="ElasticBuilder__filter-sort-lock"
                  :class="{ 'is-active' : filter.sortLock }"
                  @click="filter.sortLock = !filter.sortLock"
                >
                  L
                </div>
              </div>
            </div>
            <select class="ElasticBuilder__label-option" v-model="filter.name">
              <option v-for="(field, fieldIdx) of fields" :value="field" :selected="fieldIdx === idx">
                {{field}}
              </option>
            </select>
          </label>
        </div>
        
        <label class="ElasticBuilder__json-order">
          <div class="ElasticBuilder__label-text">
            <div class="ElasticBuilder__label-text-left">Json Order</div>
            <div class="ElasticBuilder__label-text-right">
              <div
                class="ElasticBuilder__json-order-type"
                @click="jsonOrderType = Number(!jsonOrderType), $_sortJson()"
              >
                {{ jsonOrderType === 0 ? 'A-Z' : 'Z-A' }}
              </div>
              
              <div
                class="ElasticBuilder__json-order-show"
                :class="{ 'is-active' : config.IsShowCardsOnEmptyFilter }"
                @click="config.IsShowCardsOnEmptyFilter = !config.IsShowCardsOnEmptyFilter"
              >
                S
              </div>
            </div>
          </div>
          <select class="ElasticBuilder__label-option" @change="onJsonOrderChange">
            <option v-for="(field, fieldIdx) of fields" :value="field">
              {{field}}
            </option>
          </select>
        </label>
        
      </template>
      
      <div class="ElasticBuilder__row2">
          <div class="ElasticBuilder__json-template" >JSON Template</div>
          <div class="ElasticBuilder__build" @click="$emit('onBuild')">Build</div>
      </div>
    </div>`,
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      cardType: 'type1',
      availableCardTypes: ['type1', 'type2', 'type3'],
      jsonFileName: '',
      styleFileName: '',
      jsonOrderType: 0,
      jsonOrderField: null,
    }
  },
  computed: {
    fields() {
      return Object.keys(this.config.JSON[0] || {});
    }
  },
  methods: {
    readFile(event) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const json = JSON.parse(e.target.result);
        json.forEach((x, idx) => x.__id__ = idx);
        EventBus.$emit('onFileChange', json);
      };

      const file = event.target.files[0];
      this.jsonFileName = file.name;
      reader.readAsText(file);
    },
    readCss(event) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.config.Style = e.target.result;
      };

      const file = event.target.files[0];
      this.styleFileName = file.name;
      reader.readAsText(file);
    },
    onFiltersRelation(event) {
      const target = event.target;
      if (target.checkValidity()) {
        const ratios = target.value.split('/').map(Number);
        const filters = this.config.Filters;

        for (let i = 0; i < ratios.length; i++) {
          if (filters[i]) {
            filters[i].ratio = ratios[i];
          } else {
            filters.push({
              name: this.fields[filters.length],
              ratio: ratios[i],
              sortType: 0,
              sortLock: false,
            });
          }
        }
      }
    },
    onJsonOrderChange(e) {
      this.jsonOrderField = e.target.value;
      this.$_sortJson();
    },
    $_sortJson() {
      const orderType = this.jsonOrderType;
      const orderField = this.jsonOrderField || this.fields[0];

      function compareFn({ [orderField]: a }, { [orderField]: b }) {
         return orderType === 0
           ? a > b ? 1 : a < b ? -1 : 0
           : a < b ? 1 : a > b ? -1 : 0;
      }

      this.config.JSON = this.config.JSON.sort(compareFn);
    },
  }
});
