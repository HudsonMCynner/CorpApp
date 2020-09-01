<template>
  <q-card style="margin-bottom: 10px">
    <q-card-section style="padding-left: 20px">
      <span style="font-size: 20px;">{{ title }}</span>
    </q-card-section>

    <q-separator inset/>

    <q-card-section>
      <div>
        <slot name="form"></slot>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'AppSection',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.q-card__section--vert {
  padding: 5px;
}
</style>
