<template>
  <q-layout class="card-wrapper">
    <q-page>
      <q-page-container style="height: 100vh; padding: 0; display: flex;
    flex-direction: column; justify-content: center; align-items: center">
        <login-form></login-form>
      </q-page-container>
    </q-page>
    <q-footer>
      <div style="display: flex;flex-direction: row; cursor:pointer;" v-if="!login" @click="login = true">
        <q-icon name="engineering" style="font-size: 4rem;"/>
        <div style="display: flex; flex-direction: column; margin: 0 0 0 10px">
          <span style="font-size: 16px">Acesso</span>
          <span style="font-size: 20px">Administrador</span>
        </div>
      </div>
    </q-footer>
</q-layout>
</template>

<script>
import LoginForm from 'src/pages/Autenticacao/Login/View/LoginForm'
export default {
  name: 'Login',
  beforeCreate () {
    this.$store.dispatch('auth/actionLogout')
  },
  components: { LoginForm },
  data () {
    return {
      usuario: '',
      senha: '',
      login: false
    }
  }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  scoped
>
.auto-grid {
  --auto-grid-min-size: 49px;
  height 150px
  cursor pointer
}

.auto-grid > * {
  box-shadow: 0 0 12px -2px rgba(0, 0, 0, 0.75);
  width 100%
  height 100%
  background-attachment: initial !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-size: cover;
}
@supports(display: grid) {
  .auto-grid {
    display: grid;
    grid-gap: 1rem;
    height 95%
    padding: 0 20px;
    width: 500px;
  }
}
.wrapper {
  width 100%
  height 70%
  position absolute
  top 52%
  left 50%
  transform translate(-50%, -50%)
  display: flex;
  justify-content: center;
}

li {
  list-style-type: none;
  border-radius: 1rem;
  text-align: center;
  font-size: 1.2rem;
  position: relative;
  background white
  height 100%
  width 100%
}

.modulo-name
  position: absolute;
  bottom: 10px;
  left: 50%;
  font-weight 700
  color: black;
  transform: translate(-50%, 25%);
  font-size: 25px;
  width: 100%;

.card-wrapper
  /*height 100vh*/
  background-image url("~assets/back.jpg")
  background-repeat no-repeat
  background-size cover
  .q-card
    height 100%
    .q-card-container
      height 100%
.q-footer
  background transparent
.ead-logo
  background-image url("~assets/logo.jpg")
  background-repeat no-repeat
  background-size: contain;
  width: 290px;
  height: 120px;
</style>
