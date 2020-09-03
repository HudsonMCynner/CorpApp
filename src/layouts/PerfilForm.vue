<template>
  <div style="padding: 25px; height: 100%;">
    <q-card style="    border: 1px solid rgb(189, 189, 189);
    border-radius: 15px;">
        <q-card-section>
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-10 col-lg-10 q-pa-sm">
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
                  <q-input
                    ref="nome"
                    :readonly="readonly"
                    :disable="disable"
                    :placeholder="$t('domains.dashboard.pessoa.nome')"
                    v-model="pessoa.nome"
                    outlined
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </q-input>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
                  <q-input
                    :readonly="readonly"
                    :disable="disable"
                    ref="cpf"
                    :placeholder="$t('domains.dashboard.pessoa.cpf')"
                    v-model="pessoa.cpf"
                    mask="###.###.###-##"
                    outlined
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </q-input>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
                  <app-date
                    :readonly="readonly"
                    :disable="disable"
                    :label="$t('domains.dashboard.pessoa.nascimento')"
                    :rules="getRules"
                    ref="nascimento"
                    v-model="pessoa.nascimento"
                  />
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
                  <q-input
                    :readonly="readonly"
                    :disable="disable"
                    ref="email"
                    :placeholder="$t('domains.dashboard.pessoa.email')"
                    v-model="pessoa.email"
                    outlined
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </q-input>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2 q-pa-sm" style="display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 15px;">
              <div style="width: 100%; height: 100%; border: 1px solid;">
                Foto
              </div>
            </div>
          </div>
          <div class="row q-pa-sm">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-sm">
              <q-input
                :readonly="readonly"
                :disable="disable"
                ref="nick"
                :placeholder="$t('domains.dashboard.perfil.nick')"
                v-model="pessoa.perfil.nick"
                outlined
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-sm">
              <q-input
                :readonly="readonly"
                :disable="disable"
                ref="steamId"
                :placeholder="$t('domains.dashboard.perfil.steamId')"
                v-model="pessoa.perfil.steamId"
                outlined
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 q-pa-sm">
             <app-upload
               :readonly="readonly"
               :disable="disable"
               label="Config 1"
               v-model="pessoa.perfil.cfg1"
             ></app-upload>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 q-pa-sm">
             <app-upload
               :readonly="readonly"
               :disable="disable"
               label="Config 2"
               v-model="pessoa.perfil.cfg2"
             ></app-upload>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 q-pa-sm">
             <app-upload
               :readonly="readonly"
               :disable="disable"
               label="Config 3"
               v-model="pessoa.perfil.cfg3"
             ></app-upload>
            </div>
          </div>
          <div class="row q-pa-sm">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-sm">
              <q-btn color="primary" label="Salvar"/>
            </div>
          </div>
        </q-card-section>
      </q-card>
  </div>
</template>

<script>

import AppUpload from 'src/components/Upload/AppUpload'
import { date } from 'quasar'
export default {
  name: 'PerfilForm',
  components: { AppUpload },
  created () {
    const usuario = this.$store.getters['auth/getUsuario']
    if (usuario) {
      debugger
      this.pessoa = usuario
      this.readonly = true
      this.disable = true
    }
  },
  data: () => ({
    readonly: false,
    disable: false,
    pessoa: {
      nome: '',
      email: '',
      nascimento: '',
      telefone: '',
      cpf: '',
      perfil: {
        nick: '',
        senha: '',
        steamId: '',
        cfg1: '',
        cfg2: '',
        cfg3: ''
      }
    }
  }),
  methods: {
    salvar () {
      this.service.save(this.usuario)
    },
    voltar () {
      this.$emit('back')
    }
  },
  computed: {
    getRules () {
      return [
        (nascimento) => !!nascimento || this.$t('domains.validations.required'),
        (nascimento) => date.isValid(nascimento.split('/').reverse().join('-')) || this.$t('domains.validations.dataInvalida')
      ]
    }
  }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  scoped
>
</style>
