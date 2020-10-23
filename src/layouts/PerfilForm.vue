<template>
  <app-form-card
  :color="'#e53935'"
  :sub-title="$t('domains.administrador.pessoa.card.subtitle')"
  :title="$t('domains.administrador.pessoa.card.title')">
  <template v-slot:form>
    <div class="column" style="margin-right: 16px">
      <app-section :title="$t('domains.administrador.pessoa.sections.informacoes')">
        <template v-slot:form>
          <ajax-bar size="50px" />
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-10 col-lg-10 q-pa-sm">
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
                  <app-input
                    ref="nome"
                    :readonly="readonly"
                    :disable="disable"
                    :label="$t('domains.dashboard.pessoa.nome')"
                    v-model="pessoa.nome"
                    :rules="[
                      val => !!val || $t('domains.validations.required'),
                      val => val.length <= 70 || $t('domains.validations.maxLength', { field: 'nome', length: '70' })
                    ]"
                    outlined
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </app-input>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
                  <app-input
                    :readonly="readonly"
                    :disable="disable"
                    ref="cpf"
                    :label="$t('domains.dashboard.pessoa.cpf')"
                    v-model="pessoa.cpf"
                    mask="###.###.###-##"
                    :rules="[
                      val => !!val || $t('domains.validations.required')
                    ]"
                    outlined
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </app-input>
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
                  <app-input
                    :readonly="readonly"
                    :disable="disable"
                    ref="email"
                    :label="$t('domains.dashboard.pessoa.email')"
                    v-model="pessoa.email"
                    :rules="[
                      val => !!val || $t('domains.validations.required')
                    ]"
                    outlined
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </app-input>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2 q-pa-sm" style="display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 15px;">
              <app-camera
                v-model="avatar"
                :roudend="false"
                @capture="salvarAvatar"
              ></app-camera>
            </div>
          </div>
          <div class="row q-pa-sm">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-sm">
              <app-input
                :readonly="readonly"
                :disable="disable"
                ref="nick"
                :label="$t('domains.dashboard.perfil.nick')"
                v-model="pessoa.perfil.nick"
                :rules="[
                  val => !!val || $t('domains.validations.required')
                ]"
                outlined
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </app-input>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-sm">
              <app-input
                :readonly="readonly"
                :disable="disable"
                ref="steamId"
                :label="$t('domains.dashboard.perfil.steamId')"
                v-model="pessoa.perfil.steamId"
                :rules="[
                  val => !!val || $t('domains.validations.required')
                ]"
                outlined
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </app-input>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 q-pa-sm">
              <app-upload
                :readonly="readonly"
                :disable="disable"
                label="Config 1"
                :ignore-extension="true"
                @input="salvarCfg($event, 1)"
                v-model="pessoa.perfil.cfg1"
              ></app-upload>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 q-pa-sm">
              <app-upload
                :readonly="readonly"
                :disable="disable"
                label="Config 2"
                :ignore-extension="true"
                @input="salvarCfg($event, 2)"
                v-model="pessoa.perfil.cfg2"
              ></app-upload>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 q-pa-sm">
              <app-upload
                :readonly="readonly"
                :disable="disable"
                :ignore-extension="true"
                @input="salvarCfg($event, 3)"
                label="Config 3"
                v-model="pessoa.perfil.cfg3"
              ></app-upload>
            </div>
          </div>
        </template>
      </app-section>
    </div>
  </template>
  <template v-slot:actions>
    <q-btn
      :label="$t('domains.administrador.pessoa.actions.salvar')"
      @click="save"
      icon="save"
      v-if="scope !== 'view'"
      style="background: #e53935; color: white"
    />
    <q-btn
      :label="$t('domains.administrador.pessoa.actions.cancelar')"
      @click="cancel"
      icon="cancel" />
  </template>
</app-form-card>
</template>

<script>

import AppUpload from 'src/components/Upload/AppUpload'
import { date } from 'quasar'
import AppCamera from 'src/components/AppCamera'
import AppFormCard from 'src/components/AppFormCard'
import AppSection from 'src/components/AppSection'
import PessoaService from 'src/layouts/Administrador/Pessoa/Service/PessoaService'
import form from 'src/Mixins/form'
import AppInput from 'src/components/AppInput'
import PerfilService from 'src/layouts/Perfil/Service/PerfilService'
import AjaxBar from 'components/AjaxBar/AjaxBar'
export default {
  name: 'PerfilForm',
  components: { AjaxBar, AppInput, AppSection, AppFormCard, AppCamera, AppUpload },
  mixins: [form],
  created () {
    const usuario = this.$store.getters['auth/getUsuario']
    if (usuario) {
      this.service.read(`/${usuario.id}`)
        .then((response) => {
          this.pessoa = response
          // this.readonly = true
          // this.disable = true
          if (response.perfil.avatar) {
            PerfilService.instance().downloadAvatar(response.perfil.id, response.perfil.avatar)
              .then((avatar) => {
                this.avatar = `data:image/jpeg;base64,${avatar.file}`
              })
          }
        })
    }
  },
  data: () => ({
    scope: 'add',
    name: 'admin-perfil-view',
    readonly: false,
    disable: false,
    avatar: null,
    service: PessoaService.instance(),
    excludeValidation: ['qDateProxy'],
    record: {},
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
    salvarAvatar ($event) {
      PerfilService.instance().salvarAvatar(this.pessoa.perfil.id, $event)
        .then((response) => {
          console.log('~> ', response)
        })
    },
    salvarCfg ($event, numeroCfg) {
      PerfilService.instance().salvarCfg(this.pessoa.perfil.id, numeroCfg, $event)
        .then((response) => {
          console.log('~> ', response)
        })
    },
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
