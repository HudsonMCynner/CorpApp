<template>
  <div>
    <label>{{ label }}</label>
    <q-editor
      :toolbar="toolbar"
      :definitions="definitions"
      :height="height"
      :min-height="minHeight"
      v-model="text"
      :fonts="{
      arial: 'Arial',
      arial_black: 'Arial Black',
      comic_sans: 'Comic Sans MS',
      courier_new: 'Courier New',
      impact: 'Impact',
      lucida_grande: 'Lucida Grande',
      times_new_roman: 'Times New Roman',
      verdana: 'Verdana'
    }"
    />
  </div>
</template>

<script>
export default {
  name: 'AppHtml',
  props: {
    label: {
      type: String,
      default: ''
    },
    minHeight: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      default: () => []
    },
    definitions: {
      type: Object,
      default: () => {}
    },
    value: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    text: ''
  }),
  created () {
    this.text = this.value
  },
  watch: {
    value () {
      this.text = this.value
    },
    text () {
      /**
       * Remove as fontes que não são suportadas no servidor para impressão de relatórios
       * @type {string}
       */
      this.text = this.text.replace(/<font[^>]*?face="([\w\s]+)"[^>]*?>/mg, '<font face="Arial">')
      this.$emit('input', this.text)
    }
  }
}
</script>

<style scoped>

</style>
