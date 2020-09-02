<template>
  <div class="row">
    <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
      <app-quant-card
        :card-color="'#43a047'"
        :icon="'people'"
        :top-right-label="'Quantidade de Professores'"
        :middle-label="'3458'"
        :bottom-label="'Acessar alunos'"/>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
      <app-quant-card
        :card-color="'#e53935'"
        :icon="'school'"
        :top-right-label="'Quantidade de Alunos'"
        :middle-label="'3458'"
        :bottom-label="'Acessar alunos'"/>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
      <app-quant-card
        :card-color="'#fb8c00'"
        :icon="'category'"
        :top-right-label="'Quantidade de Categorias'"
        :middle-label="'3458'"
        :bottom-label="'Acessar alunos'"/>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
      <app-quant-card
        :card-color="'#00acc1'"
        :icon="'class'"
        :top-right-label="'Quantidade de Cursos'"
        :middle-label="'3458'"
        :bottom-label="'Acessar alunos'"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>

<style scoped>

</style>
