<template>
  <q-layout>
    <q-page>
      <q-page-container style="background: #999999;">
        <div class="row">
         <drag-a-drop-list />
        </div>
      </q-page-container>
    </q-page>
  </q-layout>
</template>

<script>
import DragADropList from 'src/components/DragList/DragADropList'
export default {
  name: 'Components',
  components: { DragADropList },
  data: () => ({
  }),
  methods: {
    showInfoMessage () {
      this.$message.info('Info', 'Info')
    },
    showWarningMessage () {
      this.$message.warning('Warning', 'Warning')
    },
    showSuccessMessage () {
      this.$message.success('Success', 'Success')
    },
    showQuestionMessage () {
      this.$message.question('Question?', '?????')
    }
  }
}
</script>

<style scoped>

</style>
