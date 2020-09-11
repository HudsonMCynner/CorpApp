<template>
  <div>
    <div
      class="content"
    >
      <q-dialog
        v-model="modal"
      >
        <q-card>
          <q-card-section class="app-modal-header">
            {{ itemSelecionado.name }}
          </q-card-section>
          <q-card-section class="app-modal-body">
            {{ itemSelecionado }}
          </q-card-section>
          <q-card-actions class="app-modal-bottom">
            <q-btn
              label="Fechar"
              @click="fecharModal"
              class="float-right"
              color="white"
              icon="fas fa-sign-out-alt"
              text-color="grey-10"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <template v-for="(situacao, indexSituacao) in situacoes">
        <div
          :key="indexSituacao"
          class="list"
        >
          <label class="list-title">{{ situacao.name }}</label>
          <draggable
            class="list-group"
            :list="getListByType(lista, situacao)"
            group="people"
            @remove="chechMove"
            @add="chechMove"
            @change="movement($event, situacao)"
          >
            <div
              class="list-group-item"
              v-for="(atendimento, indexAtendimento) in getListByType(lista, situacao)"
              :key="indexAtendimento+indexSituacao"
              @dblclick="openModal(atendimento)"
            >
              {{ atendimento.name }} {{ indexAtendimento }}
            </div>
          </draggable>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
export default {
  name: 'DragADropList',
  components: {
    draggable
  },
  created () {
    this.lista = this.value
  },
  props: {
    value: {
      type: Array,
      default: () => ([])
    },
    situacoes: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      modal: false,
      lista: [],
      itemSelecionado: {},
      interacao: false
    }
  },
  methods: {
    openModal (value) {
      this.itemSelecionado = value
      this.modal = true
    },
    fecharModal () {
      this.itemSelecionado = {}
      this.modal = false
    },
    getListByType (list, type) {
      return Array.isArray(list) && list.length > 0 ? list.filter((item) => item.situacao.id === type.id) : []
    },
    added (value, situacao) {
      this.interacao = true
      this.$message.question('', 'Deseja realmente mover este item')
        .then((response) => {
          if (response.value) {
            this.interacao = false
            const index = this.lista.findIndex((item) => item.id === value.id)
            if (index !== -1) {
              this.lista[index].situacao = situacao
            }
            this.emit(this.lista)
            return
          }
          this.interacao = false
        })
    },
    replace ($event) {
      console.log('~> replace', $event)
    },
    clone ($event) {
      console.log('~> clone', $event)
    },
    moved ($event) {
      debugger
      console.log('~> move', $event)
      return ($event.draggedContext.element.id !== '1')
    },
    emit (value) {
      this.$emit('input', value)
    },
    chechMove ($event) {
      if (this.interacao) {
        $event.preventDefault()
      }
    },
    // eslint-disable-next-line no-unused-vars
    movement ($event, situacao) {
      debugger
      if ($event.added) {
        this.added($event.added.element, situacao)
      }
    }
  },
  watch: {
    value: {
      handler (values) {
        this.lista = values
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
.list-group-item:first-child {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}

.list-group-item {
 position: relative;
 display: block;
 padding: 5px 5px
 background-color: #fff;
 border: 1px solid rgba(0,0,0,.125);
 cursor pointer
 margin 0 0 5px  0
}
.content
  display: flex;
  flex-direction: row;
  justify-content space-around
  width: 100%;
  height: calc(100vh - 215px);
  .list
    width: 100%;
    margin 0 5px
    border: 1px solid #959595;
    border-radius: 5px;
    &:first-child
      margin 0 5px 0 0
    &:last-child
      margin 0 0 0 5px
    .list-title
      background: #d0d0d04f;
      text-align: center;
      padding: 5px;
      font-size: 14px;
      font-weight: bold;
      color: black;
    .list-group
      overflow: auto;
      height: calc(100% - 35px);
      padding: 5px 5px 0px 5px;
      &::-webkit-scrollbar-track
        display none
      &::-webkit-scrollbar
        display none
.q-card
  width: calc(100vw - 30%);
  height: calc(100vh - 40%);
  border-radius: 15px;

.q-dialog
  .app-modal-body
    height: calc(100% - 110px);
    margin-top 25px
    padding: 0;
  .app-modal-header
    height: 35px;
    border-radius 2px
    color white
    background-color: $primary
    border-width 0 0 1px 0
    border-style solid
    border-color #ddd
    padding 10px 20px
  .app-modal-bottom
    height 50px
    padding 7px 5px
    border-width 1px 0 0 0
    border-style solid
    border-color $borderColor
    background #efefef
    border-radius 0 0 14px 14px
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

</style>
