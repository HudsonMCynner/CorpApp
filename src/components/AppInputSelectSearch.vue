<template>
  <div style="position: relative;">
    <div>
      <q-input
        :readonly="disableSearch"
        :label="label"
        ref="input"
        outlined
        :disable="disable"
        :value="model"
        :placeholder="list.length > 0 ? '' : 'Sem registros'"
        @input="makeSearch($event)"
        @click="showList = !showList"
        :rules="rules"
      >
        <template v-slot:append>
          <q-icon
            v-if="model"
            name="highlight_off"
            @click="clean"
          />
          <q-icon
            name="keyboard_arrow_down"
            @click="clickIcon"
          />
        </template>
      </q-input>
    </div>
    <div>
      <div v-if="showList" class="backdrop" @click="showList = !showList">
      </div>
      <div
        v-if="showList && !disable"
        class="options-list"
      >
        <q-list>
          <q-item
            v-for="(item, index) in list"
            :key="index"
            clickable
            v-close-popup
            @click.native="setValue(item)"
          >
            {{ item.label }}
          </q-item>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script>
import { prop } from 'src/util'

export default {
  name: 'AppInputSelectSearch',
  created () {
    this.list = this.options
    this.model = prop(this.value, this.displayKey)

    if (!this.disable && this.initializeValues) {
      this.getInitialValues()
    }
  },
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    disable: {
      type: Boolean,
      default: false
    },
    initializeValues: {
      type: Boolean,
      default: true
    },
    disableSearch: {
      type: Boolean,
      default: false
    },
    displayKey: {
      type: String,
      required: true,
      default: () => ('')
    },
    label: {
      type: String,
      required: true,
      default: () => ('')
    },
    options: {
      type: Array,
      default: () => ([])
    },
    search: {
      type: Object,
      default: () => ({
        service: null,
        searchParam: null,
        searchValue: null,
        searchable: {}
      })
    },
    formatRow: {
      type: Function,
      required: true,
      default: () => () => {}
    },
    rules: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    model: null,
    showList: false,
    list: []
  }),
  methods: {
    /**
     */
    clickIcon () {
      this.showList = !this.showList
    },
    getInitialValues () {
      this.search.service.instance().search({
        pagination: {
          page: 1,
          rowsPerPage: 10
        },
        sorter: this.search.sorterParam
      }, [], { ...this.search.searchable, ...this.search.searchValue ? JSON.parse(`{"${this.search.searchParam}":"${this.search.searchValue}"}`) : '' })
        .then((response) => {
          this.list = response.rows.map(this.formatRow)
        })
    },
    clean () {
      this.model = null
      this.$emit('input', undefined)
    },
    setValue ($event) {
      // console.log('~> ', $event)
      this.model = prop($event.value, this.displayKey) ? prop($event.value, this.displayKey) : null
      this.showList = false
      this.$emit('input', $event.value)
    },
    makeSearch ($event) {
      if ($event.length === 0) {
        return this.clean()
      }
      if ($event.length > 1) {
        this.search.service.instance().search({
          pagination: {
            page: 1,
            rowsPerPage: 10
          },
          sorter: this.search.sorterParam
        }, [], { ...this.search.searchable, ...JSON.parse(`{"${this.search.searchParam}":"${$event}"}`) })
          .then((response) => {
            this.list = response.rows.map(this.formatRow)
            this.showList = true
          })
      }
    },
    /**
     */
    focus () {
      this.$refs.inputSearch.focus()
      this.showList = true
    }
  },
  watch: {
    options: {
      handler (values) {
        this.list = values
      },
      deep: true
    },
    value: {
      handler (value) {
        this.model = prop(value, this.displayKey)
      }
    },
    disable: {
      handler (value) {
        if (value) {
          this.getInitialValues()
        }
      }
    }
  }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  scoped
>
.backdrop
  width: 100vw;
  height: 100vh;
  background: rgb(153, 153, 153);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  opacity: 0;
.options-list
  max-height: 300px
  overflow-y: auto
  position: absolute
  top: 50px
  left: 0px
  background: white
  z-index: 9999
  border: 1px solid #b1b1b1
  width: 100%
  .q-list
    .q-item
      display: flex;
      align-items: center;
      line-height 15px

.q-icon
  cursor pointer
</style>
