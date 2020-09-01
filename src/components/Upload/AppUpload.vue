<template>
  <div>
    <upload
      outline
      :label="label"
      ref="upload"
      :disable="disable"
      :file="isFile"
      :filter="filterFiles"
      :multiple="multiple"
      :table-file="tableFile"
      @added="add"
      @removed="removed"
      @queue="queue"
      color="secondary"
      hide-upload-btn
      url="''"
      v-model="model"
    />
  </div>
</template>

<script type="text/javascript">
import upload from './Upload'

export default {
  /**
   */
  extends: {},
  /**
   */
  mixins: [],
  /**
   */
  name: 'AppUpload',
  /**
     */
  components: { upload },
  /**
   */
  props: {
    label: {
      type: String,
      default: ''
    },
    tableFile: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, FormData, Object, File, Array],
      default: ''
    },
    format: {
      type: [String, RegExp],
      default: () => (/pdf|docx|doc|xlsx|xls|odt|txt|png|jpeg|jpg/)
    },
    disable: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    defaultMessage: {
      type: Boolean,
      default: false
    }
  },
  /**
   */
  computed: {
    isFile () {
      if (Array.isArray(this.file)) {
        return this.file
      }
      if (this.file) {
        return [this.file]
      }
      return []
    }
  },
  /**
   */
  watch: {
    /**
     */
    value: {
      /**
       * @param value
       */
      handler (value) {
        this.error = false
        this.model = value
        this.file = value
        if (value === null || value === undefined) {
          this.$refs.upload.reset()
        }
      }
    }
  },
  /**
   */
  data: () => ({
    model: null,
    error: false,
    file: undefined
  }),
  methods: {
    /**
     */
    formatError () {
      this.error = true
      if (this.defaultMessage) {
        return this.$message.info(this.$t('domains.components.appUpload.formatError', 'info'))
      }
      this.$emit('format:error')
    },
    /**
     * @param files
     * @returns {*}
     */
    filterFiles (files) {
      const MAX_FILE_SIZE = 10 * 1024 * 1024 /* =3M */
      return files.filter((file) => {
        if (file.size > MAX_FILE_SIZE) {
          this.error = true
          if (this.defaultMessage) {
            this.$message.info(this.$t('domains.components.appUpload.sizeExceeded'), 'info')
          } else {
            this.$emit('size:exceeded')
          }
        }
        return file.size <= MAX_FILE_SIZE
      })
    },
    /**
     * @param queue
     */
    queue (queue) {
      if (this.multiple) {
        this.$emit('input', queue)
      }
    },
    /**
     * @param event
     */
    add (event) {
      if (!this.multiple) {
        const extension = event[0].type.split('/')
        if (!extension[1].match(this.format)) {
          return this.formatError()
        }
        this.$emit('input', event[0])
      }
    },
    /**
     * @param event
     */
    removed (event) {
      if (!this.multiple) {
        this.$emit('removed', event[0])
      }
    }
  },
  /**
   */
  created () {
    this.file = this.value
    this.model = this.value
  }
}
</script>
<style
  lang="stylus"
  rel="stylesheet/stylus"
  scoped
>
:focus{
  outline none
}
.q-uploader
  width 100%
  border: 1px solid #959595;
  box-shadow: none;
</style>
