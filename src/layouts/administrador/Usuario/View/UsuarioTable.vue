<template>
  <app-table-card
    :header-action="headerAction"
    :header-back-color="'#8e24aa'"
    :header-title="$t('domains.administrador.usuario.table.title')"
    @headerActionClick="navegarView('add', {})">
    <template v-slot:container>
      <app-table
        :columns="dataColumns"
        :pagination="pagination"
        :row-action="rowAction"
        :rows="dataRows"
        @row:edit="navegarView('edit', { id: $event.id })"
        @row:remove="destroy"
        @row:view="navegarView('view', { id: $event.id })"
        @update:pagination="buscarRegistros($event, [], searchable)"
        @update:searchable="buscarRegistros($event.pagination, [], $event.searchable)"
        @update:request="buscarRegistros($event.pagination)" />
    </template>
  </app-table-card>
</template>

<script>
import AppTableCard from 'components/AppTableCard'
import UsuarioService from 'layouts/administrador/Usuario/Service/UsuarioService'
import table from 'src/Mixins/table'
import AppTable from 'src/components/AppTable'

export default {
  name: 'UsuarioTable',
  components: { AppTable, AppTableCard },
  mixins: [table],
  data: () => ({
    service: UsuarioService.instance(),
    name: 'admin-usuario-view',
    searchable: {},
    pagination: {
      descending: false,
      pagesNumber: 1,
      page: 1,
      rowsPerPage: 30,
      rowsNumber: 30,
      sortBy: 'nome'
    },
    dataColumns: [
      {
        name: 'nome',
        label: 'Nome',
        align: 'left',
        field: 'nome',
        sortable: true
      },
      {
        name: 'email',
        label: 'Email',
        align: 'left',
        field: 'email',
        sortable: true,
        format: (value) => {
          return value || 'NÃO INFORMADO'
        }
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
        name: 'tipo',
        label: 'Tipo',
        align: 'left',
        field: 'tipo',
        format: (value) => {
          if (value === 1) {
            return 'PROFESSOR'
          }
          return 'ADMINISTRADOR'
        }
      }
    ],
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
    },
    headerAction: {
      label: 'Adicionar',
      icon: 'add',
      class: 'glossy',
      style: {
        background: 'white',
        color: 'black'
      }
    }
  })
}
</script>

<style scoped>

</style>
