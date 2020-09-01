<!--
 * **********************************************
 * tagnos-front
 * TDR Informática Ltda
 * Todos os direitos reservados ©
 * **********************************************
 * Nome do arquivo: AppCollorPicker.vue
 * Criado por: Matheus Pimentel
 * Data da criação: 30/11/2019
 * Observação:
 * **********************************************
-->
<template>
  <div>
    <q-input
      :label="label"
      v-model="color"
      ref="input"
      :rules="rules"
      outlined
      :readonly="readonly || disable"
      :disable="readonly || disable"
    >
      <template v-slot:append>
        <q-icon
          v-if="!disable && !readonly"
          name="palette"
          :style="{ color: color }"
        >
          <q-popup-proxy
            ref="modal-color"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-color
              v-model="color"
            />
            <q-btn
              color="primary"
              label="escolher"
              @click="hideModalColor"
            />
          </q-popup-proxy>
        </q-icon>
        <i
          v-else
          class="q-icon fas fa-square"
          :style="{ fontSize: '21px',
                    color: color }"
        />
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  name: 'AppCollorPicker',
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    rules: {
      type: Array,
      default: () => ([])
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    color: ''
  }),
  methods: {
    /**
     */
    hideModalColor () {
      this.$refs['modal-color'].hide()
      this.$emit('next')
    }
  },
  created () {
    this.color = this.value
  },
  watch: {
    value () {
      this.color = this.value
    },
    color () {
      this.$emit('input', this.color)
    }
  }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  scoped
>
.q-icon
  cursor pointer

.q-btn
  width 100%
</style>
