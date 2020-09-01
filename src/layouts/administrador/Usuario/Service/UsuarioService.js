/*
 ***********************************************
 * tagnos-ead
 * TDR Informática Ltda
 * Todos os direitos reservados ©
 ***********************************************
 * Nome do arquivo: CadastroAdministradorService.js
 * Criado por: Hudson
 * Data da criação: 29/06/2020
 * Observação:
 ***********************************************
 */
import Rest from 'src/app/Services/Rest'

/**
 * @type {UsuarioService}
 */
export default class UsuarioService extends Rest {
  /**
   * @type {string}
   */
  static resource = '/usuarios_ead'
}
