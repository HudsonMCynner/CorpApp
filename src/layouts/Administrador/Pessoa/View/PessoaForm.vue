<template>
  <app-form-card
    :color="'#e53935'"
    :sub-title="$t('domains.administrador.pessoa.card.subtitle')"
    :title="$t('domains.administrador.pessoa.card.title')">
    <template v-slot:form>
      <div class="column" style="margin-right: 16px">
        <app-section :title="$t('domains.administrador.pessoa.sections.informacoes')">
          <template v-slot:form>
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-sm">
                <app-input
                  :disable="disable"
                  :readonly="readonly"
                  :autofocus="true"
                  :label="$t('domains.administrador.pessoa.fields.nome')"
                  :rules="[
                    val => !!val || $t('domains.validations.required'),
                    val => val.length <= 70 || $t('domains.validations.maxLength', { field: 'nome', length: '70' })
                  ]"
                  ref="nome"
                  v-model="record.nome"
                />
              </div>
              <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
                <app-date
                  :disable="disable"
                  :readonly="readonly"
                  :label="$t('domains.administrador.pessoa.fields.nascimento')"
                  :rules="getRules"
                  ref="nascimento"
                  v-model="record.nascimento"
                />
              </div>
              <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
                <app-input
                  :disable="disable"
                  :readonly="readonly"
                  :label="$t('domains.administrador.pessoa.fields.telefone')"
                  :rules="[val => !!val || $t('domains.validations.required')]"
                  mask="(##)#####-####"
                  placeholder="(00)00000-0000"
                  ref="telefone"
                  v-model="record.telefone"
                />
              </div>
              <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
                <app-input
                  :disable="disable"
                  :readonly="readonly"
                  :label="$t('domains.administrador.pessoa.fields.email')"
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
                  :disable="disable"
                  :readonly="readonly"
                  :label="$t('domains.administrador.pessoa.fields.cpf')"
                  mask="###.###.###-##"
                  placeholder="000.000.000-00"
                  ref="cpf"
                  v-model="record.cpf"
                />
              </div>
              <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
                <q-select
                  :disable="disable"
                  :readonly="readonly"
                  :label="$t('domains.administrador.pessoa.fields.tipoAcesso')"
                  :options-dense="true"
                  :separator="true"
                  :option-value="'value'"
                  :option-label="'label'"
                  :emit-value="true"
                  :map-options="true"
                  class="select-years"
                  v-model="record.tipoAcesso"
                  :options="tiposAcessos"
                />
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
import AppFormCard from 'components/AppFormCard'
import form from 'src/Mixins/form'
import AppInput from 'components/AppInput'
import AppSection from 'components/AppSection'
import AppDate from 'components/AppDate'
import { date } from 'quasar'
import PessoaService from 'src/layouts/Administrador/Pessoa/Service/PessoaService'

export default {
  name: 'PessoaForm',
  mixins: [form],
  components: {
    AppDate,
    AppSection,
    AppInput,
    AppFormCard
  },
  data: () => ({
    scope: 'add',
    name: 'admin-pessoa-index',
    service: PessoaService.instance(),
    excludeValidation: ['qDateProxy'],
    record: {
      nome: null,
      nascimento: null,
      cpf: null,
      telefone: null
    },
    tiposAcessos: [
      {
        label: 'Usuário',
        value: 0
      },
      {
        label: 'ADM',
        value: 1
      }
    ]
  }),
  methods: {
    save () {
      this.validateForm().then(() => {
        if (this.record.cpf === '') {
          this.record.cpf = null
        }
        this.service.save(this.record)
          .then(() => (this.$router.push({ name: this.name })))
      })
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

<style scoped>

</style>
