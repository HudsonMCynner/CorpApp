export default {
  data: () => ({
    dataRows: [],
    searchable: {}
  }),
  methods: {
    /**
     * @param {Object} $event
     */
    destroy ($event) {
      this.$message.question(
        this.$t('domains.dashboard.table.destroy.title'),
        this.$t('domains.dashboard.table.destroy.message')
      )
        .then((confirmation) => {
          if (!confirmation.value) {
            return
          }
          this.service.destroy(`/${$event.id}`)
            .then(() => (this.dataRows.splice(this.dataRows.findIndex((item) => item.id === $event.id), 1)))
        })
    },

    buscarRegistros () {
      this.service.read('')
        .then((response) => {
          this.dataRows = response
        })
    },
    /**
     * @param {String} scope
     * @param {Object} params
     */
    navegarView (scope, params) {
      this.$router.push({
        name: this.name,
        params: {
          ...params,
          scope
        }
      })
    }
  }
}
