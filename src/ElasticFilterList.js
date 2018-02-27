Vue.component('elastic-filter-list', {
  template: `
    <div class="ElasticFilterList" :class="{ ElasticFilterList_sticky: sticky }">
      <div class="ElasticFilterList__column"
           v-for="(column, idx) of columns"
           :style="{ flexGrow: config.FiltersRelation[idx] }"
           :key="column.key">
        <div class="ElasticFilterList__header ellipsis" :title="column.name" @click="onSort(column)">{{column.name}}</div>
        <div class="ElasticFilterList__filters">
          <template v-if="sticky">
            <elastic-filter
               :name="filters[column.key][0] || '- Все -'"
               :number="column.filters.get(filters[column.key][0])"
               :canChangeVisible="false"
            />
          </template>
          <div :class="{ hidden: sticky }">
            <div class="ElasticFilterList__filters-shadow"></div>
            <div class="ElasticFilterList__filters-content">
              <elastic-filter
                v-for="([filter, number], _) of [...column.filters]"
                :key="filter"
                :name="filter"
                :number="number"
                @onFilter="onFilter(column.key, ...arguments)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>`,
  props: ['config'],
  created() {
    window.addEventListener('scroll', this.onScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll);
  },
  mounted() {
    this.offsetTop = (this.$el.offsetTop || 400) + 463;
  },
  data() {
    return {
      offsetTop: 0,
      sticky: false,
      columns: [],
      filters: {},
    }
  },
  watch: {
    'config.Filters'() {
      const filters = {};
      const columns = this.config.Filters.map(x => (
        {
          key: x,
          name: x,
          sortType: 0,
        }
      ));

      for (const column of columns) {
        const key = column.key;
        const columnFilters = new Map();

        for (const datum of this.config.JSON) {
          const value = datum[key];
          columnFilters.set(value, (columnFilters.get(value) + 1) || 1);
        }

        column.filters = columnFilters;
        filters[key] = [];
      }

      this.columns = columns;
      this.filters = filters;
    }
  },
  methods: {
    onSort(column) {
      function compare(entry1, entry2) {
        const a = entry1[sortType];
        const b = entry2[sortType];
        
        if (sortType === 1) {
          // количество элементов сортируем по убыванию
          return b - a;
        }
        
        // все остальное по возрастанию
        return a > b ? 1 : a < b ? -1 : 0;
      }
      
      const sortType = Number(!column.sortType);
      column.sortType = sortType;
      column.filters = new Map([...column.filters].sort(compare));
    },
    onScroll() {
       this.sticky = window.pageYOffset > this.offsetTop;
    },
    onFilter(key, value, isActive) {
      if (isActive) {
        this.filters[key].push(value);
      } else {
        const idx = this.filters[key].indexOf(value);
        if (idx !== -1) {
          this.filters[key].splice(idx, 1);
        }
      }

      this.recalculate();
      EventBus.$emit('onFilter');
    },

    recalculate() {
      // Обнуляем счетчики фильтров
      for (const column of this.columns) {
        column.filters = new Map([...column.filters.keys()].map(key => [key, 0]));
      }

      for (const datum of this.config.JSON) {
        for (const column of this.columns) {
          const columnKey = column.key;

          datum.__filtered__ = true;
          for (const [filterKey, filter] of Object.entries(this.filters)) {
            if (filter.length && filter.every(x => x != datum[filterKey])) {
              datum.__filtered__ = false;
            }
          }

          if (datum.__filtered__) {
            const filter = datum[columnKey];
            column.filters.set(filter, column.filters.get(filter) + 1);
          }
        }
      }
    },
  },
});
