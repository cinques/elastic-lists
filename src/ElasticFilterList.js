Vue.component('elastic-filter-list', {
  template: `
    <div class="ElasticFilterList">
      <div class="ElasticFilterList__column"
           v-for="(column, idx) of columns"
           :style="{ flexGrow: config.FiltersRelation[idx] }"
           :key="column.key">
        <div class="ElasticFilterList__header ellipsis" :title="column.name">{{column.name}}</div>
        <div class="ElasticFilterList__filters">
          <elastic-filter
            v-for="(number, filter) of column.filters"
            :key="filter"
            :name="filter"
            :number="number"
            @onFilter="onFilter(column.key, ...arguments)"
          />
        </div>
      </div>
    </div>`,
  props: ['config'],
  created() {
    EventBus.$on('onFiltersChanged', this.onFiltersChanged.bind(this));
  },
  data() {
    return {
      columns: {},
      filters: {},
    }
  },
  methods: {
    onFiltersChanged() {
      const filters = {};
      const columns = this.config.Filters.map(x => ({name: x, key: x}));

      for (const column of columns) {
        const key = column.key;
        const columnFilters = {};

        for (const datum of this.config.JSON) {
          const value = datum[key];
          columnFilters[value] = (columnFilters[value] + 1) || 1;
        }

        column.filters = columnFilters;
        filters[key] = []
      }

      this.columns = columns;
      this.filters = filters;
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
        Object.keys(column.filters).forEach(filter => {
          column.filters[filter] = 0;
        });
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
            column.filters[filter] += 1;
          }
        }
      }
    },
  },
});
