/*
 ***********************************************
 * CorpApp
 * TDR Informática Ltda
 * Todos os direitos reservados ©
 ***********************************************
 * Nome do arquivo: PerfilService.js
 * Criado por: Hudson
 * Data da criação: 11/09/2020
 * Observação:
 ***********************************************
 */
import Rest from 'src/app/Services/Rest'

/**
 * @type {PerfilService}
 */
export default class PerfilService extends Rest {
  /**
   * @type {string}
   */
  static resource = '/perfis'

  /**
   * @returns {Promise}
   */
  downloadAvatar (id, fileName) {
    fileName = fileName.split('\\')[3]
    return this.get('/avatar/download', {
      params: { id, fileName }
    })
  }

  /**
   * @returns {Promise}
   */
  salvarAvatar (idPessoa, file) {
    const formData = new FormData()
    formData.append('file', file)
    return this.post(`/${idPessoa}/avatar/upload`, formData)
  }
}
