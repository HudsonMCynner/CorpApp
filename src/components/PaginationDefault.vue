<template>
  <div class="row items-center">
    <q-btn
      :disable="isFirstPage"
      @click="$emit('previousPage')"
      class="q-mr-sm"
      flat
      icon="keyboard_arrow_left"
      round
      size="sm"
      text-color="black"
    />
    <div
      class="q-mr-sm"
      style="font-size: small"
    >
      {{ current }} / {{ total }}
    </div>
    <q-btn
      :disable="isLastPage"
      @click="$emit('nextPage')"
      flat
      icon="keyboard_arrow_right"
      round
      size="sm"
      text-color="black"
    />
  </div>
</template>

<script type="text/javascript">
/**
 */
export default {
  name: 'PaginationDefault',
  /**
   */
  props: {
    isFirstPage: {
      type: Boolean,
      default: true
    },
    isLastPage: {
      type: Boolean,
      default: true
    },
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style scoped>

</style>
