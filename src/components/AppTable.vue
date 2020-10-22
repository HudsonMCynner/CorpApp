<template>
  <div style="padding: 0 5px;">
    <div class="input-search" v-if="enableSearch">
      <q-input
        :disable="disable"
        :readonly="readonly"
        :value="inputValue"
        placeholder="Pesquisar"
        outlined
        dense
        @keypress.enter="inputSearch(dataPagination, $event.target.value)"
      >
      </q-input>
    </div>
    <div>
      <q-table
        :class="{ 'readonly' : disable || readonly }"
        :title="title"
        :data="dataRows"
        :columns="dataColumns"
        :pagination.sync="dataPagination"
        :row-key="rowKey"
        @update:selected="updateSelected"
        @update:pagination="updatePagination"
        @request="updateRequest"
        :selection="selection"
        :selected.sync="selecteds"
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-if="selection !== 'none'" style="width: 72px;">
              <q-checkbox
                :class="{'disable-select-all': noSelectAll || selection === 'single' }"
                :value="selectedAll"
                @input="selectAllRows"
              />
            </q-th>
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.label }}
            </q-th>
            <q-th v-if="dataRowAction.enable" style="width: 135px;">{{ dataRowAction.label }}</q-th>
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-if="selection === 'multiple' || selection === 'single'">
              <q-checkbox
                :value="getSelected(props.row)"
                @input="selectRow(props.row)"
              />
            </q-td>
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              <div v-if="col.html" v-html="col.value"/>
              <div v-else>{{ col.value }}</div>
            </q-td>
            <q-td class="table-actions" v-if="dataRowAction.enable">
              <template v-for="(action, index) in dataRowAction.actions">
                <q-btn
                  v-bind="action"
                  :key="index"
                  @click="rowActionClick(action.name, props.row)">
                  <q-tooltip>
                    {{ action.tooltip }}
                  </q-tooltip>
                </q-btn>
              </template>
            </q-td>
          </q-tr>
        </template>
        <template
          v-slot:pagination="props"
        >
          <PaginationDefault
            v-bind="{ isFirstPage, isLastPage, current: props.pagination.page, total: props.pagination.pagesNumber }"
            v-on="{ previousPage, nextPage }"
          />
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import PaginationDefault from 'src/components/PaginationDefault'
export default {
  name: 'AppTable',
  components: { PaginationDefault },
  created () {
    this.dataColumns = this.columns
    this.dataRows = this.rows
    this.dataPagination = this.pagination
    this.dataRowAction = this.rowAction
  },
  props: {
    rowAction: {
      type: Object,
      default: () => ({})
    },
    disable: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    enableSearch: {
      type: Boolean,
      default: true
    },
    noSelectAll: {
      type: Boolean,
      default: false
    },
    rowKey: {
      type: String,
      default: () => ('id')
    },
    selection: {
      type: String,
      default: () => ('none')
    },
    selectedItems: {
      type: Array,
      default: () => ([])
    },
    pagination: {
      type: Object,
      default: () => ({})
    },
    columns: {
      type: Array,
      default: () => ([])
    },
    rows: {
      type: Array,
      default: () => ([])
    },
    title: {
      type: String,
      default: () => ('')
    }
  },
  data: () => ({
    inputValue: null,
    dataColumns: [],
    dataRows: [],
    dataPagination: {},
    dataRowAction: {},
    lastSort: '',
    selecteds: [],
    selectedAll: false
  }),
  methods: {
    getSelected (row) {
      return this.selectedItems.findIndex((item) => item.id === row.id) !== -1
    },
    selectRow (row) {
      if (this.selection === 'multiple') {
        const index = this.selecteds.findIndex((item) => item.id === row.id)
        if (index !== -1) {
          this.selecteds.splice(index, 1)
          this.$emit('update:selected', this.selecteds)
          return
        }
        this.selecteds.push(row)
        this.$emit('update:selected', this.selecteds)
        return
      }
      if (this.selection === 'single') {
        const index = this.selecteds.findIndex((select) => select.id === row.id)
        if (index !== -1) {
          this.selecteds.splice(index, 1)
          this.$emit('update:selected', this.selecteds)
          return
        }
        this.selecteds.splice(0, 1, row)
        this.$emit('update:selected', this.selecteds)
      }
    },
    selectAllRows ($event) {
      this.selectedAll = $event
      if (!$event) {
        this.selecteds = []
        this.$emit('update:selected', [])
        return
      }
      this.selecteds = this.rows
      this.$emit('update:selected', this.selecteds)
    },
    inputSearch (pagination, value) {
      const searchable = {}
      searchable[pagination.sortBy] = value
      this.$emit('update:searchable', {
        pagination: {
          ...this.pagination,
          ...pagination,
          page: !this.inputValue || !value ? 1 : pagination.page
        },
        searchable: value ? searchable : {}
      })
      this.inputValue = value !== '' && value !== null && value !== undefined ? value : null
    },
    updatePagination ($event) {
      if (this.inputValue) {
        this.inputSearch($event, this.inputValue)
        return
      }
      this.$emit('update:pagination', $event)
    },
    updateSelected ($event) {
      this.$emit('update:selected', $event)
    },
    updateRequest ($event) {
      if (this.lastSort === $event.pagination.sortBy) {
        $event.pagination.descending = !this.pagination.descending
      }
      if (!$event.pagination.sortBy) {
        $event.pagination.sortBy = this.lastSort
        $event.pagination.descending = !this.pagination.descending
      }
      this.lastSort = $event.pagination.sortBy
      this.$emit('update:request', $event)
    },
    rowActionClick (name, row) {
      this.$emit(`row:${name}`, row)
    },
    /**
     */
    previousPage () {
      this.updatePagination({ ...this.pagination, page: this.pagination.page - 1 })
    },
    /**
     */
    nextPage () {
      this.updatePagination({ ...this.pagination, page: this.pagination.page + 1 })
    }
  },
  computed: {
    /**
     * @returns {Boolean}
     */
    isFirstPage () {
      return this.pagination.page === 1
    },
    /**
     * @returns {Boolean}
     */
    isLastPage () {
      return this.pagination.page === this.pagination.pagesNumber
    }
  },
  watch: {
    columns: {
      handler (columns) {
        this.dataColumns = columns
      },
      deep: true
    },
    selectedItems: {
      handler (items) {
        this.selecteds = items
      },
      deep: true
    },
    rows: {
      handler (rows) {
        this.dataRows = rows
      },
      deep: true
    },
    pagination: {
      handler (pagination) {
        this.dataPagination = pagination
      },
      deep: true
    },
    rowAction: {
      handler (config) {
        this.dataRowAction = config
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
>>>.actions
  padding: 0 20px;
  min-height: 45px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap wrap
  margin-bottom 10px
  justify-content: flex-end;
  .q-btn
    margin: 5px;
    padding: 2px;
    height: 40px;
    .q-btn__wrapper
      padding 0
      .q-btn__content
        display flex
        flex-direction: row;
        justify-content: flex-start;
        padding: 0 5px;
        .q-icon
          margin: 0 5px 0 0px;
.header-action
  float right
.input-search
  padding 0 0 10px 0
.table-actions
  display flex
  flex-direction row
  justify-content: space-around;
/*flex-wrap: wrap;*/
.q-table thead tr
  height 35px
>>>.q-table__bottom
  background: #9999996e;
  height: 30px;
  min-height: 30px;
  padding: 0 10px;
  .q-table__control
    .q-table__bottom-item
      display none
.disable-select-all
  visibility hidden
  pointer-events none
.readonly
  >>>.q-table__middle
    opacity: 0.6 !important;
    pointer-events none !important
    cursor not-allowed !important

.sticky-dynamic
  /* height or max-height is important */
  height: calc(100vh - 225px)

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: #fff

  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
  thead tr:first-child th
    top: 0
</style>
