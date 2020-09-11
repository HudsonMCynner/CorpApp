<template>
  <div style="background: white; height: 100%;">
    <drag-a-drop-list :situacoes="situacoes" :value="data"/>
  </div>
</template>

<script>
import DragADropList from 'src/components/DragList/DragADropList'
export default {
  name: '',
  components: { DragADropList },
  data: () => ({
    data: [
      {
        name: 'John',
        id: 1,
        situacao: {
          id: 1,
          name: 'EM ANDAMENTO'
        }
      },
      {
        name: 'Johnson',
        id: 7,
        situacao: {
          id: 2,
          name: 'CONFIRMADO'
        }
      },
      {
        name: 'Gerard',
        id: 4,
        situacao: {
          id: 2,
          name: 'CONFIRMADO'
        }
      }
    ],
    situacoes: [
      {
        name: 'EM ANDAMENTO',
        id: 1
      },
      {
        name: 'CONFIRMADO',
        id: 2
      }
    ]
  }),
  methods: {
    reloadList () {
    }
  }
}
</script>

<style scoped>

</style>
