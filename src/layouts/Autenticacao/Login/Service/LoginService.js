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
// import { encrypt } from 'src/util/Crypto'

/**
 * @type {LoginService}
 */
export default class LoginService extends Rest {
  /**
   * @param {Object} login (Login e Senha)
   * @returns (*)
   *
   */
  login (login) {
    return this.post('/pessoas/auth', login)
  }

  /**
   * @param idUsuario
   * @returns {Promise}
   */
  buscarInformacaoUsuario (idUsuario) {
    return this.get(`/usuarios_ead/${idUsuario}`)
  }
}
