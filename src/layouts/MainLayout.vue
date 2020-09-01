<template>
  <q-layout :view="'lHh Lpr lFf'" class="main">
    <q-header elevated>
      <q-toolbar class="bg-white text-black">
        <q-btn
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          dense
          flat
          icon="menu"
          round
        />
        <q-space />
        <div>{{ getUserName }}</div>
        <q-btn @click="myAccount = !myAccount"
               flat
               icon="account_circle"
               round>
          <q-menu>
            <q-list class="user-actions">
              <q-item clickable v-close-popup @click.native="minhaConta">
                <q-item-section
                  avatar
                >
                  <q-icon name="alarm_on" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ $t('domains.dashboard.minhaConta') }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item @click.native="sair" clickable v-close-popup>
                <q-item-section
                  avatar
                >
                  <q-icon name="exit_to_app" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ $t('domains.dashboard.sair') }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      bordered
      content-class="bg-grey-1"
      show-if-above
      v-model="leftDrawerOpen"
    >
      <essential-link
        :menus="essentialLinks"
      />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import menus from 'src/static/menu'

export default {
  name: 'MainLayout',
  created () {
    this.getMenuPorTipoAcesso()
  },
  components: {
    EssentialLink
  },
  data () {
    return {
      leftDrawerOpen: false,
      myAccount: false,
      essentialLinks: []
    }
  },
  methods: {
    sair () {
      this.$store.dispatch('auth/actionLogout')
      this.$router.push('/auth/login')
    },
    minhaConta () {
    },
    openDashboard (list) {
      const index = list.findIndex((item) => item.to.search('/dashboard'))
      if (index !== -1) {
        this.$router.push(list[0].to)
      }
    },
    getMenuPorTipoAcesso () {
      const usuario = this.$store.getters['auth/getUsuario']
      const tipo = usuario.tipo
      const tipoAcesso = {
        0: 'administrador',
        1: 'professor',
        2: 'aluno',
        3: 'responsavel'
      }
      if (tipoAcesso[tipo]) {
        this.essentialLinks = menus[tipoAcesso[tipo]]
        this.openDashboard(this.essentialLinks)
        return
      }
      this.essentialLinks = menus[tipoAcesso[0]]
    }
  },
  computed: {
    getUserName () {
      return this.$store.getters['auth/getUsuario'].nome || ''
    }
  }
}
</script>
<style
  lang="stylus"
  rel="stylesheet/stylus"
  scoped
>
.q-header, .q-footer
  z-index: 1000;

.main
  height: 100vh;
  //background: radial-gradient(circle, rgb(149, 118, 53) 0%, rgb(50, 43, 16) 100%);
.q-item__label--header
  padding 10px
  display flex
  justify-content center
  box-shadow 0 12px 20px -10px rgba(0, 0, 0, .28), 0 4px 20px 0 rgba(0, 0, 0, .12), 0 7px 8px -5px rgba(0, 0, 0, .2)

.menu-header
  height 50px
  width 150px
  /*background-image url("~assets/login/logo_sistema.png")*/
  background-repeat no-repeat
  background-size: contain

.user-actions
  min-width 150px
  .q-item
    min-height: 35px;
    padding 0 5px
</style>
