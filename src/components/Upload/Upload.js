// noinspection NpmUsedModulesInstalled
import { QUploader } from 'quasar'

export default {
  /**
   */
  extends: QUploader,
  /**
   */
  name: 'upload',
  /**
   */
  data: () => ({
    isClear: false
  }),
  /**
   */
  props: {
    value: {
      type: [String, FormData, Object, File, Array],
      default: () => {}
    },
    tableFile: {
      type: Boolean,
      default: false
    },
    file: {
      type: Array,
      default: () => ([])
    }
  },
  /**
   */
  methods: {
    /**
     */
    limpar () {
      this.expanded = false
      this.files = []
      this.queue = []
      this.totalSize = 0
      this.uploadSize = 0
      this.queuedFiles = []
    },
    /**
     * @param files
     * @returns {T[]}
     * @private
     */
    __filter (files) {
      let value
      return Array.prototype.filter.call(files, (file) => {
        value = this.computedExtensions.some((ext) => {
          return file.type.toUpperCase().startsWith(ext.toUpperCase()) ||
            file.name.toUpperCase().endsWith(ext.toUpperCase())
        })
        if (!value) {
          this.$emit('format:error')
        }
        return value
      })
    }
  },
  /**
   */
  watch: {
    /**
     * @param queue
     */
    queue (queue) {
      if (queue.length > 0 && this.tableFile) {
        this.limpar()
      }
      this.$emit('queue', queue)
    },
    /**
     * @param files
     */
    files (files) {
      if (files.length > 0 && this.tableFile) {
        this.limpar()
      }
    }
  },
  /**
   */
  created () {
    if (this.file.length > 0) {
      this.files = this.file
      this.queue = this.file
      this.totalSize = this.file[0].size
    }
  }
}
