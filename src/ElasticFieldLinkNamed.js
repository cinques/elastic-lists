Vue.component('ElasticFieldLinkNamed', {
    template: `
        <div>
          <BaseElasticField ref="base">
            <a
              class="ElasticField__text"
              slot-scope="props"
              :href="props.selected"
            >
              NamedLink
            </a>
          </BaseElasticField>
        </div>
        `,
    methods: {
        getTemplate() {
            const base = this.$refs.base;
            const classList = this.$el.classList;
            return `
                <div v-if="Array.isArray(datum.${base.selected})"
                     :class="{ 'is-disabled': !datum.${base.selected}[0] }"
                     class="${classList}"
                >
                  <a :href="datum.${base.selected}[1]">{{ datum.${base.selected}[0] }}</a>
                </div>
              `;
        }
    },
});
