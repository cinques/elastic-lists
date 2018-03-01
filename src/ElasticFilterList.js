Vue.component('ElasticFilterList', {
  template: `
    <div class="ElasticFilterList" :class="{ 'ElasticFilterList--sticky': sticky }">
      <div class="ElasticFilterList__column"
           v-for="(column, idx) of columns"
           :style="{ flexGrow: config.FiltersRelation[idx] }"
           :key="column.key">
        <div class="ElasticFilterList__header ellipsis" :title="column.name" @click="onSort(column)">
          <div class="ElasticFilterList__column-name">{{column.name}}</div>
          <div v-show="column.sortType === 1" class="ElasticFilterList__column-sort">A-Z</div>
        </div>
        <div class="ElasticFilterList__filters">
          <ElasticFilter
            v-show="sticky"
            :name="filters[column.key][0] || '- Все -'"
            :number="column.filters.get(filters[column.key][0])"
            :canChangeVisible="false"
          />
          <div v-show="!sticky">
            <div class="ElasticFilterList__filters-shadow"></div>
            <div class="ElasticFilterList__filters-content">
              <ElasticFilter
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
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      columns: [],
      filters: {},
      offsetTop: 0,
      sticky: false,
    }
  },
  watch: {
    'config.Filters'() {
      this.calculateFilters();
    }
  },
  created() {
    this.calculateFilters();
    window.addEventListener('scroll', this.onScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll);
  },
  mounted() {
    this.offsetTop = (this.$el.offsetTop || 400) + 463;
  },
  methods: {
    calculateFilters() {
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
          if (Array.isArray(value)) {
            for (const valueItem of value) {
              columnFilters.set(valueItem, (columnFilters.get(valueItem) + 1) || 1);
            }
          } else {
            columnFilters.set(value, (columnFilters.get(value) + 1) || 1);
          }
        }

        column.filters = this.$_sortFilters(columnFilters, column.sortType);
        filters[key] = [];
      }

      this.columns = columns;
      this.filters = filters;
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
            if (!filter.length) {
              continue;
            }

            const value = datum[filterKey];
            if (Array.isArray(value)) {
              if (value.every(valueItem => filter.every(x => x != valueItem))) {
                datum.__filtered__ = false;
              }
            } else {
              if (filter.every(x => x != value)) {
                datum.__filtered__ = false;
              }
            }
          }

          if (datum.__filtered__) {
            const filter = datum[columnKey];
            if (Array.isArray(filter)) {
              for (const filterItem of filter) {
                column.filters.set(filterItem, column.filters.get(filterItem) + 1);
              }
            } else {
              column.filters.set(filter, column.filters.get(filter) + 1);
            }
          }
        }
      }
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

    onSort(column) {
      column.sortType = Number(!column.sortType);
      column.filters = this.$_sortFilters(column.filters, column.sortType);
    },

    $_sortFilters(filters, sortType) {
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

      return new Map([...filters].sort(compare));
    },
  },
});
