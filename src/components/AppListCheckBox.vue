<template>
  <div class="list-of-choices">
    <template v-for="(item, index) in choices" >
      <div class="choice row" :key="index">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div class="row">
            <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1" v-if="selection === 'multiple'">
              <q-checkbox :value="getSelected(item)" @input="selectValue(item)"/>
            </div>
            <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1" v-if="selection === 'single'">
              <q-radio v-model="singleSelectionValue" :val="item" @input="$emit('input', singleSelectionValue)"/>
            </div>
            <div class="col-xs-11 col-sm-11 col-md11 col-lg-11">
              <q-btn dense icon="delete" color="red" class="float-right" @click="deleteOpcao(index)">
                <q-tooltip>Remover</q-tooltip>
              </q-btn>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
              <app-input :label="`Opção ${index + 1}`" type="textarea" rows="4" v-model="item.descricao"/>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
              <app-upload />
            </div>
          </div>
        </div>
      </div>
      <hr :key="'separator' + item"/>
    </template>
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-sm">
      <q-btn icon="add" color="accent" @click="addOpcao" label="Adicionar Opção"/>
    </div>
  </div>
</template>

<script>
import AppUpload from 'src/components/Upload/AppUpload'
import AppInput from 'src/components/AppInput'
export default {
  name: 'AppListCheckBox',
  components: { AppInput, AppUpload },
  created () {
    this.choices = this.escolhas
  },
  props: {
    selection: {
      type: String,
      default: () => ('none')
    },
    escolhas: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    selecteds: [],
    choices: [],
    singleSelectionValue: false
  }),
  methods: {
    addOpcao () {
      this.choices.push({
        descricao: ''
      })
    },
    deleteOpcao (index) {
      this.choices.splice(index, 1)
    },
    input ($event) {
      this.$emit('input', $event)
    },
    selectValue (value) {
      const index = this.selecteds.findIndex((item) => item === value)
      if (index !== -1) {
        this.selecteds.splice(index, 1)
        this.$emit('input', this.selecteds)
        return
      }
      this.selecteds.push(value)
      this.$emit('input', this.selecteds)
    },
    getSelected (value) {
      return this.selecteds.findIndex((item) => value === item) !== -1
    }
  },
  watch: {
    escolhas: {
      handler (values) {
        this.choices = values
      },
      deep: true
    }
  }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  scoped
>
.list-of-choices
  border 1px solid #ddd
  padding 2px
  .choice
    display flex
    flex-direction row
    align-items center

</style>
