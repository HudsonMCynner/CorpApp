export default [
  {
    path: '/admin/dashboard',
    component: () => import('layouts/administrador/Dashboard/Dashboard')
  },
  {
    name: 'admin-aluno-index',
    path: '/admin/aluno/index',
    component: () => import('layouts/administrador/Aluno/View/AlunoTable')
  },
  {
    name: 'admin-aluno-view',
    path: '/admin/aluno/view',
    component: () => import('layouts/administrador/Aluno/View/AlunoForm')
  }
]
