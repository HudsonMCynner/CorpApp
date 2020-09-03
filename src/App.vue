<template>
  <div id="q-app" style="height: 100vh;" class="card-wrapper">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style
  lang="stylus"
  rel="stylesheet/stylus"
  scoped
>
.card-wrapper
  /*height 100vh*/
  background-image url("~assets/back.jpg")
  background-repeat no-repeat
  background-size cover
</style>
