import { erase, write, clearSession } from '../../util/Storage'
import { state as initial } from './state'
import { clearTokenMiddleware } from 'src/config/service/standard'
/**
 * @param state
 * @param usuario
 */
export const mutateUsuario = (state, usuario) => {
  write('auth/usuario', usuario)
  state.usuario = usuario
}
/**
 * @param state
 * @param cliente
 */
export const mutateCliente = (state, cliente) => {
  write('auth/cliente', cliente)
  state.cliente = cliente
}

export const mutateClear = (state) => {
  const states = initial(false)
  clearSession()
  Object.keys(states)
    .forEach((key) => {
      state[key] = states[key]
    })
}

/**
 * @param state
 * @param authToken
 */
export const mutateAuthToken = (state, authToken) => {
  state.authToken = authToken
  if (authToken) {
    write('authToken', state.authToken)
    return
  }
  clearTokenMiddleware()
  erase('authToken')
}
