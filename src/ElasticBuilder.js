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
      
      <div v-if="fields.length" class="ElasticBuilder__filters" ref="filters">
        <label v-for="(filter, idx) of config.Filters" :key="idx">
          <div class="ElasticBuilder__label-text">
            <div class="ElasticBuilder__label-text-left">F{{idx}}</div>
            <div class="ElasticBuilder__label-text-right">
              
              <div class="ElasticBuilder__filter-sort-type" @click="filter.sortType = Number(!filter.sortType)">
                <div v-if="filter.sortType === 0">A-Z</div>
                <div v-else-if="filter.sortType === 1">1-9</div>
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
  }
});
