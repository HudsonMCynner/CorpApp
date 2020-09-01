import axios from 'axios'
// import $store from 'src/store'
/*
 * noinspection NpmUsedModulesInstalled
 */
import { Loading } from 'quasar'
import { clone, empty } from '../../util'
import { erase, read, write } from 'src/util/Storage'
import { resolveServerCodeError } from 'src/config/service/serviceCodeErrors'
import { info } from 'boot/message'

// noinspection ES6ModulesDependencies
const standard = axios.create({
  // baseURL: 'http://srv-db1.ddns.net:8095/tagnos-ead',
  baseURL: process.env.api.BASE_URL,
  timeout: 100000,
  transformResponse: [
    function (data) {
      return data
    }
  ]
})

/**
 * Função responsavel por receber os dados de autenticação, fazer o set de tempo de inatividade, tempo do token, e inicializar seus timers
 * @param {Object} response
 */
export const authorizationMiddleware = (response) => {
  if (!empty(response.data)) {
    setToken(response.data.token)
    setUsuarioHeader(response.data.user)
  }
  return response
}
/**
 * @param {Number} idCliente
 */
export const clienteHeaderMiddleware = (idCliente) => {
  setClienteHeader(idCliente)
}
/**
 */
export const clearTokenMiddleware = () => {
  updateToken('')
}

/**
 * @param {Number} idSistema
 */
export const sistemaHeaderMiddleware = (idSistema) => {
  setVersaoSistemaHeader(idSistema)
}

/**
 * @param {String} token
 */
/**
 * @param {String} token
 */
export const setToken = (token) => {
  if (token) {
    write('authToken', token)
    updateToken(token)
    return
  }
  updateToken('')
  erase('authToken')
}
/**
 * @returns {Object}
 */
export const getHeaders = () => {
  return clone(standard.defaults.headers.common)
}
/**
 * @param {String} token
 */
export const updateToken = (token) => {
  if (!token) {
    delete standard.defaults.headers.common.Authorization
    return
  }
  standard.defaults.headers.common.Authorization = token
}

standard.interceptors.request.use(function (config) {
  return config
})

/**
 */
export const setVersaoSistemaHeader = (versao) => {
  standard.defaults.headers.common.VERSAO_SISTEMA = versao
}

/**
 * @param {Number} idCliente
 */
export const setClienteHeader = (idCliente) => {
  standard.defaults.headers.common.CLIENTE = idCliente
}
/**
 * @param {Number} idSistema
 */
export const setSistemaHeader = (idSistema) => {
  standard.defaults.headers.common.SISTEMA = idSistema
}
/**
 * @param {Number} idUsuario
 */
export const setUsuarioHeader = (idUsuario) => {
  standard.defaults.headers.common.USUARIO = idUsuario
}
/**
 * @param response
 * @returns {*}
 */
const responseSuccess = function (response) {
  if (Loading.isActive) {
    Loading.hide()
  }
  if (response.headers && response.headers.authorization) {
    setToken(response.headers.authorization)
  }
  return response
}

/**
 * @param error
 * @returns {Promise}
 */
const responseError = function (error) {
  if (Loading.isActive) {
    Loading.hide()
  }
  if (!error.response) {
    return Promise.reject(error)
  }

  // if (error.response.status === 500) {
  //   let responseData = JSON.parse(error.response.data)
  //   errorMessage(lang('prototype.request.serverError.title'), lang('prototype.request.serverError.message'))
  //     .then(() => {
  //       if (responseData.idExcecao) {
  //         getScreenShot(responseData.idExcecao)
  //       }
  //     })
  //   return Promise.reject(error)
  // }

  if (error.response.status === 400) {
    return resolveServerCodeError(error.response)
  }
  //
  // if (error.response.status === 423) {
  //   let data = JSON.parse(error.response.data)
  //   info('', data.message)
  //   $router.push('/auth/login')
  //   return Promise.reject(error)
  // }
  //
  // if (error.response.status === 426) {
  //   let data = JSON.parse(error.response.data)
  //   info('', data.message)
  //     .then(() => {
  //       window.location.reload(true)
  //     })
  //   return Promise.reject(error)
  // }
  //
  // if (error.response.status === 401) {
  //   let data = JSON.parse(error.response.data)
  //   info('', data.message)
  //   $router.push('/auth/login')
  // }
  //
  if (error.response.status === 403) {
    info('', this.$t('domains.dashboard.request.forbidden'))
    return Promise.reject(JSON.parse(error.response.data))
  }

  return Promise.reject(error)
}

// noinspection JSCheckFunctionSignatures
standard.interceptors.response.use(responseSuccess, responseError)

const requestseSuccess = function (request) {
  Loading.show()
  return request
}
const requestError = function (request) {
  Loading.hide()
  return request
}
const token = read('authToken')
if (token) {
  setToken(token)
}
standard.interceptors.request.use(requestseSuccess, requestError)
setSistemaHeader(21)
setVersaoSistemaHeader('1.0.0')
export default standard
