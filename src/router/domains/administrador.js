export default [
  {
    path: '/admin/dashboard',
    component: () => import('layouts/Administrador/Dashboard/Dashboard')
  },
  {
    name: 'admin-pessoa-index',
    path: '/admin/pessoa/index',
    component: () => import('layouts/Administrador/Pessoa/View/PessoaTable')
  },
  {
    name: 'admin-pessoa-view',
    path: '/admin/pessoa/view',
    component: () => import('layouts/administrador/Pessoa/View/PessoaForm')
  }
]
