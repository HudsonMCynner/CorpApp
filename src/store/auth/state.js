/**
 * @type {Object}
 */
import { read } from '../../util/Storage'

export const state = (recover = true) => ({

  usuario: (recover ? read('auth/usuario') : undefined) || {},
  cliente: (recover ? read('auth/cliente') : undefined) || {}

})
export default state()
