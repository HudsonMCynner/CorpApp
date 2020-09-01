<template>
  <div class="row justify-center row-container"
       style="height: 80%"
  :class="clientes ? 'row-container-clientes' : 'row-container-login'">
    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4" style="position: relative" v-if="!clientes">
      <q-btn
        color="primary"
        class="btn-back"
        round
        dense
        icon="keyboard_arrow_left"
        @click="voltar"/>
      <q-card class="cards card-images card-aluno text-white" style="padding: 30px 20px 20px 20px;  background: radial-gradient(circle, rgb(214 119 89) 0%, #682314 100%);">
        <q-card-section>
          <div class="text-h6">Autenticação</div>
        </q-card-section>
        <q-card-section style="position: relative;     padding: 15px 0px 0px 15px;
    background: white;border-radius: 10px;">
          <div class="row" style="margin-right: 16px;">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-sm">
              <q-input
                ref="cpf"
                :placeholder="$t('domains.dashboard.login.cpf')"
                v-model="login"
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
                v-model="senha"
                outlined
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-sm">
              <q-btn color="primary" icon-right="keyboard_arrow_right" label="Acessar" @click="entrar"/>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8" style="position: relative; height: 100%"
         v-else>
      <q-btn
        color="primary"
        class="btn-back"
        round
        dense
        icon="keyboard_arrow_left"
        @click="voltar"/>
      <q-card class="cards card-images card-aluno text-white" style="background: radial-gradient(circle, rgb(149, 118, 53) 0%, rgb(50, 43, 16) 100%); height: 100%;">
        <q-card-section>
          <div class="text-h6">Clientes</div>
          <div class="text-subtitle2">Selecione um cliente para prosseguir</div>
        </q-card-section>

        <q-card-section class="q-pt-none" style="height: calc(100% - 88px);">
          <q-table
            :data="data"
            :pagination.sync="pagination"
            :columns="columns"
            row-key="name"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td
                  v-for="col in props.cols"
                  :key="col.name"
                  :props="props"
                >
                  {{ col.value }}
                </q-td>
                <q-td>
                  <q-btn
                    color="primary"
                    round
                    dense
                    icon="keyboard_arrow_right"
                    @click="selecionar(props.row)">
                    <q-tooltip>
                      Acessar
                    </q-tooltip>
                  </q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import LoginService from 'src/pages/Autenticacao/Login/Service/LoginService'
import { clienteHeaderMiddleware } from 'src/config/service/standard'
export default {
  name: 'LoginForm',
  beforeCreate () {
    this.$store.dispatch('auth/actionLogout')
  },
  data: () => ({
    login: '',
    senha: '',
    data: [],
    clientes: false,
    pesquisa: '',
    columns: [
      {
        name: 'nome',
        label: 'Nome',
        align: 'left',
        field: 'nome'
      }
    ],
    pagination: {
      rowsNumber: 0
    },
    rows: [],
    rowAction: {
      enable: true,
      label: 'Acessar',
      actions: [
        {
          round: true,
          dense: true,
          flat: true,
          tooltip: 'Editar',
          icon: 'keyboard_arrow_right',
          name: 'edit',
          color: '',
          style: {}
        }
      ]
    }
  }),
  methods: {
    entrar () {
      LoginService.instance().login({ login: this.login, senha: this.senha })
        .then(this.buscarInfoUsuario)
    },
    buscarInfoUsuario (response) {
      LoginService.instance().buscarInformacaoUsuario(response.data.user)
        .then(this.salvarInformacaoUsuario)
    },
    salvarInformacaoUsuario (usuario) {
      this.$store.dispatch('auth/actionUsuario', usuario)
        .then(this.verificarCliente(usuario))
    },
    salvarInformacaoCliente (cliente) {
      this.$store.dispatch('auth/actionCliente', cliente)
        .then(this.abrirDashBoard())
    },
    verificarCliente (usuario) {
      if (usuario.clientes.length > 1) {
        this.clientes = true
        this.data = usuario.clientes
        return
      }
      this.abrirDashBoard()
    },
    selecionar (cliente) {
      clienteHeaderMiddleware(cliente.id)
      this.salvarInformacaoCliente(cliente)
    },
    abrirDashBoard () {
      this.$router.push('/dashboard')
    },
    voltar () {
      this.clientes = false
      this.$emit('back')
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
  cursor: pointer;
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
</style>
