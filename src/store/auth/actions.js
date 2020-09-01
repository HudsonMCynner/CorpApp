
/**
   * @param context
   * @param usuario
   */
export const actionUsuario = (context, usuario) => {
  context.commit('mutateUsuario', usuario)
}
/**
   * @param context
   * @param cliente
   */
export const actionCliente = (context, cliente) => {
  context.commit('mutateCliente', cliente)
}

/**
 * @ref auth/logout
 * @param context
 */
export const actionLogout = (context) => {
  context.commit('mutateClear', '')
  context.commit('mutateAuthToken', '')
}
