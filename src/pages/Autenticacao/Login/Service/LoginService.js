/*
 ***********************************************
 * tagnos-ead
 * TDR Informática Ltda
 * Todos os direitos reservados ©
 ***********************************************
 * Nome do arquivo: LoginService.js
 * Criado por: Hudson
 * Data da criação: 26/06/2020
 * Observação:
 ***********************************************
 */
import Rest from 'src/app/Services/Rest'
import { authorizationMiddleware } from 'src/config/service/standard'
// import { encrypt } from 'src/util/Crypto'

/**
 * @type {LoginService}
 */
export default class LoginService extends Rest {
  /**
   * @param {Object} credentials (Login e Senha)
   * @returns (*)
   *
   */
  login ({ login, senha }) {
    // return this.post('/auth', { login, senha: encrypt(senha) })
    return this.post('/auth', { login, senha })
      .then(authorizationMiddleware)
  }

  /**
   * @param idUsuario
   * @returns {Promise}
   */
  buscarInformacaoUsuario (idUsuario) {
    return this.get(`/usuarios_ead/${idUsuario}`)
  }
}
