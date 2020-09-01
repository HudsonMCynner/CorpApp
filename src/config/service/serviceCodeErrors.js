import { info } from 'boot/message'

export const resolveServerCodeError = (response) => {
  if (Array.isArray(JSON.parse(response.data))) {
    return resolveServerValidator(response)
  }
  const code = recuperarPropriedade(response, 'code')

  if (('showCatchMessage' in response.config) && !response.config.showCatchMessage) {
    return Promise.reject(response)
  }

  if (code === 1043) {
    return Promise.resolve(response)
  }

  if (code === 1008) {
    return showMessageResolveResponse(response)
  }

  if (code === 1039) {
    return Promise.reject(response)
  }

  return showMessageRejectResponse(response)
}

/**
 * Função para exibir mensagens de validação que vem do servidor
 * @param response
 * @returns {Promise}
 */
export const resolveServerValidator = (response) => {
  const data = JSON.parse(response.data)
  if (data.length > 0) {
    let message = ''

    for (let i = 0; i < data.length; i++) {
      const field = data[i].field !== undefined && data[i].field !== null ? 'O(a) ' + data[i].field + ' ' : ''
      message += field + data[i].message + '\n'
    }
    info(tituloMensagem, message)
  }
  return Promise.reject(response)
}

const tituloMensagem = 'Atenção'

/**
 * @param {*} response
 * @returns {Promise}
 */
export const showMessageResolveResponse = (response) => {
  return info(tituloMensagem, recuperarPropriedade(response, 'message'))
    .then(() => Promise.resolve(response))
}

/**
 * @param {*} response
 * @returns {Promise}
 */
export const showMessageRejectResponse = (response) => {
  return info(tituloMensagem, recuperarPropriedade(response, 'message'))
    .then(() => {
      return Promise.reject(response)
    })
}

/**
 * @param {*} response
 * @param {String} property
 * @returns {*}
 */
export const recuperarPropriedade = (response, property) => {
  let input = typeof response === 'string' ? response : '{}'
  if (typeof response === 'object' && response.data) {
    input = response.data
  }

  const value = JSON.parse(input)
  return typeof value === 'object' ? value[property] : undefined
}
