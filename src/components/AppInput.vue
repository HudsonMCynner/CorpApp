<template>
  <q-input
    :autofocus="autofocus"
    :disable="disable"
    :readonly="readonly"
    :label="label"
    :rules="rules"
    :rows="rows"
    ref="input"
    :type="type"
    @input="input"
    :placeholder="placeholder"
    outlined
    :mask="mask"
    v-model="record"
  >
    <template v-slot:append>
      <slot name="append"></slot>
    </template>
  </q-input>
</template>

<script>
import { empty } from 'src/util'

export default {
  name: 'AppInput',
  created () {
    this.record = this.value
  },
  data: () => ({
    record: null
  }),
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    label: {
      type: String,
      required: true
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array,
      default: () => []
    },
    rows: {
      type: String,
      default: () => ('')
    },
    uppercase: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'text'
    },
    mask: {
      type: String
    },
    placeholder: {
      type: String
    },
    disable: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    input ($event) {
      if (this.uppercase) {
        this.$emit('input', empty($event) ? $event : $event.toUpperCase())
        return
      }
      this.$emit('input', $event)
    }
  },
  watch: {
    value: {
      handler (value) {
        this.record = value
      },
      deep: true
    },
    record () {
      this.$emit('input', this.record)
    }
  }
}
</script>

<style scoped>

</style>
