<template>
  <app-table-card
    :header-action="headerAction"
    :header-back-color="'#e53935'"
    :header-title="$t('domains.administrador.pessoa.table.title')"
    @headerActionClick="navegarView('add', {})">
    <template v-slot:container>
      <app-table
        :columns="columns"
        :pagination="pagination"
        :row-action="rowAction"
        :rows="dataRows"
        @row:edit="navegarView('edit', { id: $event.id })"
        @row:remove="destroy"
        @row:view="navegarView('view', { id: $event.id })"
        @update:pagination="buscarRegistros($event, [], searchable)"
        @update:request="buscarRegistros($event.pagination)"
        @update:searchable="buscarRegistros($event.pagination, [], $event.searchable)" />
    </template>
  </app-table-card>
</template>

<script>
import AppTableCard from 'components/AppTableCard'
import table from 'src/Mixins/table'
import AppTable from 'src/components/AppTable'
import $store from 'src/store'
import PessoaService from 'src/layouts/Administrador/Pessoa/Service/PessoaService'

export default {
  name: 'PessoaTable',
  components: {
    AppTable,
    AppTableCard
  },
  mixins: [table],
  data: () => ({
    service: PessoaService.instance(),
    name: 'admin-pessoa-view',
    searchable: {
      'usuario.clientes.id': $store.getters['auth/getCliente'].id
    },
    columns: [
      {
        name: 'nome',
        label: 'Nome',
        align: 'left',
        field: 'nome',
        sortable: true
      },
      {
        name: 'nascimento',
        label: 'Nascimento',
        align: 'left',
        field: 'nascimento',
        sortable: true
      },
      {
        name: 'cpf',
        label: 'CPF',
        align: 'left',
        field: 'cpf',
        sortable: true,
        format: (value) => {
          return value || 'NÃO INFORMADO'
        }
      },
      {
        name: 'usuario.email',
        label: 'E-mail',
        align: 'left',
        field: 'usuario.email',
        sortable: true,
        format: (value) => {
          return value || 'NÃO INFORMADO'
        }
      }
    ],
    headerAction: {
      label: 'Adicionar',
      icon: 'add',
      class: 'glossy',
      style: {
        background: 'white',
        color: 'black'
      }
    },
    pagination: {
      descending: false,
      pagesNumber: 1,
      page: 1,
      rowsPerPage: 30,
      rowsNumber: 30,
      sortBy: 'nome'
    },
    rowAction: {
      enable: true,
      label: 'Ações',
      actions: [
        {
          round: true,
          dense: true,
          flat: true,
          tooltip: 'Editar',
          icon: 'edit',
          name: 'edit',
          color: '',
          style: {}
        },
        {
          round: true,
          dense: true,
          flat: true,
          tooltip: 'Consultar',
          icon: 'visibility',
          name: 'view',
          color: '',
          style: {}
        },
        {
          round: true,
          dense: true,
          flat: true,
          tooltip: 'Excluir',
          icon: 'delete',
          name: 'remove',
          color: '',
          style: ''
        }
      ]
    }
  }),
  methods: {
    edit () {
    }
  }
}
</script>

<style scoped>

</style>
