<template>
  <div class="row justify-center row-container">
    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4" style="position: relative" >
      <q-card class="cards text-white" style="padding: 30px 20px 20px 20px;  background: radial-gradient(circle, rgb(214 119 89) 0%, #682314 100%);">
        <q-card-section>
          <div class="text-h6">CORP</div>
        </q-card-section>
        <q-card-section style="position: relative; padding: 15px 0px 0px 15px;  background: white;border-radius: 10px;">
          <div class="row" style="margin-right: 16px;">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-sm">
              <q-input
                ref="cpf"
                :placeholder="$t('domains.dashboard.login.cpf')"
                v-model="login.cpf"
                mask="###.###.###-##"
                outlined
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-sm">
              <q-input
                ref="senha"
                type="password"
                :placeholder="$t('domains.dashboard.login.senha')"
                v-model="login.senha"
                outlined
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </div>
            <div class="actions">
              <q-btn color="primary" label="Acessar" @click="entrar"/>
              <q-btn color="primary" label="Caadastrar" @click="cadastrar"/>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import LoginService from 'src/layouts/Autenticacao/Login/Service/LoginService'
export default {
  name: 'LoginForm',
  beforeCreate () {
    this.$store.dispatch('auth/actionLogout')
  },
  data: () => ({
    login: {
      cpf: '',
      senha: ''
    }
  }),
  methods: {
    entrar () {
      LoginService.instance().login(this.login)
        .then(this.salvarInformacaoUsuario)
    },
    salvarInformacaoUsuario (usuario) {
      this.$store.dispatch('auth/actionUsuario', usuario)
        .then(this.abrirDashBoard)
    },
    abrirDashBoard () {
      this.$router.push('/dashboard')
    },
    voltar () {
      this.clientes = false
      this.$emit('back')
    },
    cadastrar () {
      this.$router.push('/novo-cadastro')
    }
  }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  scoped
>
.row-container
  /*position: absolute;*/
  width: 100%;
  left: 0;
  bottom: 0;
  height: calc(100vh - 190px);
  display: flex;
.row-container-login
  align-content: flex-start;
.row-container-clientes
  align-content: flex-end;
.cards
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 20px;
  padding: 0;
  text-align: center;
.q-table__container
  height 100%
  border-radius 10px
>>>.q-table__card
  .q-table__middle
    max-height: calc(100% - 4px);
  .q-table__bottom
    display none
.btn-back
  position: absolute;
  top: 23px;
  left: 23px;
  z-index: 1;

.actions
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 106px;
  padding: 10px 20%;
</style>
