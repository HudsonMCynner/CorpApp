<template>
  <app-form-card
    :color="'#8e24aa'"
    :sub-title="$t('domains.administrador.usuario.card.subtitle')"
    :title="$t('domains.administrador.usuario.card.title')">
    <template v-slot:form>
      <div class="row" style="margin-right: 16px;">
        <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 q-pa-sm">
          <app-input
            :autofocus="true"
            :label="$t('domains.administrador.usuario.fields.nome')"
            :rules="[
              val => !!val || $t('domains.validations.required'),
              val => val.length <= 70 || $t('domains.validations.maxLength', { field: 'nome', length: '70' })
              ]"
            ref="nome"
            v-model="record.nome"
          />
        </div>
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 q-pa-sm">
          <q-select :emit-value="true"
                    :label="$t('domains.administrador.usuario.fields.tipo')"
                    :map-options="true"
                    :option-label="'label'"
                    :option-value="'value'"
                    :options="tipoOptions"
                    :options-dense="true"
                    :separator="true"
                    class="select-years"
                    outlined
                    v-model="record.tipo"
          />
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
          <app-input
            :label="$t('domains.administrador.usuario.fields.email')"
            :rules="[
              val => !!val || $t('domains.validations.required'),
              val => val.length <= 100 || $t('domains.validations.maxLength', { field: 'e-mail', length: '100' })
              ]"
            :uppercase="false"
            ref="email"
            type="email"
            v-model="record.email"
          />
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
          <app-input
            :label="$t('domains.administrador.usuario.fields.cpf')"
            :rules="[val => !!val || $t('domains.validations.required')]"
            mask="###.###.###-##"
            placeholder="000.000.000-00"
            ref="cpf"
            v-model="record.cpf"
          />
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm"
             v-if="scope === 'add'">
          <app-input
            :label="$t('domains.administrador.usuario.fields.senha')"
            :rules="[
              val => !!val || $t('domains.validations.required'),
              val => val.length <= 30 || $t('domains.validations.maxLength', { field: 'senha', length: '30' })
              ]"
            :uppercase="false"
            ref="senha"
            type="password"
            v-model="record.senha"
          />
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm"
             v-if="scope === 'add'">
          <app-input
            :label="$t('domains.administrador.usuario.fields.confirmarSenha')"
            :rules="[
              val => !!val || $t('domains.validations.required'),
              val => val.length <= 30 || $t('domains.validations.maxLength', { field: 'confirmar senha', length: '30' }),
              val => (val && (val === record.senha)) || $t('domains.administrador.usuario.validations.senhasDiferentes')
              ]"
            :uppercase="false"
            ref="confirmarSenha"
            type="password"
            v-model="record.confirmarSenha"
          />
        </div>
      </div>
    </template>
    <template v-slot:actions>
      <q-btn :label="$t('domains.administrador.usuario.actions.salvar')"
             @click="save"
             icon="save" v-if="scope !== 'view'"
             style="background: #8e24aa; color: white"
      />
      <q-btn :label="$t('domains.administrador.usuario.actions.cancelar')"
             @click="cancel"
             icon="cancel"
      />
    </template>
  </app-form-card>
</template>

<script>
import AppFormCard from 'src/components/AppFormCard'
import UsuarioService from 'layouts/administrador/Usuario/Service/UsuarioService'
import form from 'src/Mixins/form'
import AppInput from 'components/AppInput'

export default {
  name: 'UsuarioForm',
  components: {
    AppInput,
    AppFormCard
  },
  mixins: [form],
  data: () => ({
    scope: 'add',
    name: 'admin-usuario-index',
    service: UsuarioService.instance(),
    record: {
      tipo: 1,
      nome: null,
      nomeSocial: null,
      senha: null,
      confirmarSenha: null,
      email: null,
      cpf: null,
      clientes: []
    },
    tipoOptions: [
      {
        label: 'PROFESSOR',
        value: 1
      },
      {
        label: 'ADMINISTRADOR',
        value: 0
      }
    ]
  })
}
</script>

<style scoped>

</style>
