export default {
  data: () => ({
    record: {},
    readonly: false,
    disable: false,
    excludeValidation: []
  }),
  methods: {
    /**
     * @returns {Promise<unknown>}
     */
    validateForm () {
      return new Promise((resolve, reject) => {
        let formHasErrors = false
        Object.keys(this.$refs).forEach((key) => {
          let validate
          if (this.excludeValidation.indexOf(key) === -1) {
            if (this.$refs[key].$refs.input) {
              validate = this.$refs[key].$refs.input.validate()
            } else {
              validate = this.$refs[key].validate()
            }
            if (!formHasErrors) {
              formHasErrors = !validate
            }
          }
        })
        if (!formHasErrors) {
          return resolve()
        }
        return reject()
      })
    },
    /**
     * @returns {Promise<unknown>}
     */
    validateFormManual () {
      return new Promise((resolve, reject) => {
        return resolve()
      })
    },
    /**
     */
    save () {
      this.validateForm().then(() => {
        this.validateFormManual().then(() => {
          this.service.save(this.record)
            .then(() => (this.$router.push({ name: this.name })))
        })
      })
    },
    /**
     */
    cancel () {
      if (this.scope === 'view') {
        this.$router.push({ name: this.name })
        return
      }
      this.$message
        .question(
          this.$t('domains.dashboard.form.cancel.title'),
          this.$t('domains.dashboard.form.cancel.message')
        )
        .then((confirm) => {
          if (confirm.value) {
            this.$router.push({ name: this.name })
          }
        })
    },
    /**
     */
    configure () {}
  },
  /**
   */
  created () {
    if (this.$route.params.scope) {
      this.scope = this.$route.params.scope
    }
    if (this.scope !== 'add') {
      this.service.read(`/${this.$route.params.id}`)
        .then((response) => {
          this.record = response
        })
    }
    if (this.scope === 'view') {
      this.disable = true
      this.readonly = true
    }
    this.configure()
  }
}
