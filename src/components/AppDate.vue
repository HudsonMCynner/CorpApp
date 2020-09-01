<template>
  <div>
    <q-input
      outlined
      ref="input"
      :disable="disable"
      :readonly="readonly"
      mask="##/##/####"
      v-model="record"
      :label="label"
      :rules="getRules"
      :autofocus="autofocus"
      :placeholder="placeholder"
    >
      <template v-slot:append>
        <q-icon
          name="event"
          class="cursor-pointer"
        >
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date
              v-model="widget"
              @input="selectData"
            />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
import { date } from 'quasar'

export default {
  name: 'AppDate',
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String
    },
    rules: {
      type: Array,
      default: () => []
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
  data () {
    return {
      record: undefined,
      widget: undefined
    }
  },
  computed: {
    getRules () {
      return this.rules.length > 0 ? this.rules : [(data) => date.isValid(data) || this.$t('domains.validations.dataInvalida')]
    }
  },
  methods: {
    selectData () {
      this.record = date.formatDate(this.widget, 'DD/MM/YYYY')
      console.log(date.isValid(this.record))
      this.$refs.qDateProxy.hide()
    }
  },
  watch: {
    record () {
      this.$emit('input', this.record)
    },
    value (value) {
      this.record = value
    }
  }
}
</script>

<style scoped>

</style>
