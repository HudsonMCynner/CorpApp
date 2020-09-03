import domains from './domains/index'
// import $store from 'src/store'
// import { empty } from 'src/util'

/**
 */
export const guardian = (to, from, next) => {
  // if (empty($store.getters['auth/getUsuario'])) {
  //   return next('/')
  // }
  next()
}

const routes = [
  {
    path: '/',
    component: () => import('layouts/Login.vue')
  },
  {
    path: '/auth/login',
    component: () => import('layouts/Login.vue')
  },
  {
    path: '/novo-cadastro',
    component: () => import('layouts/PerfilForm')
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue')
      },
      ...domains
    ],
    beforeEnter: guardian
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
