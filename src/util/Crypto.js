import * as CryptoJS from 'crypto-js/crypto-js'
// TODO: pegar do env
const ENCRYPT_KEY = 'TDRINFORMATICA27'
/**
 * @param {String} word
 * @return {string}
 */
export const encrypt = (word) => {
  const key = CryptoJS.enc.Utf8.parse(ENCRYPT_KEY)
  const input = CryptoJS.enc.Utf8.parse(word)
  const encrypted = CryptoJS.AES.encrypt(input, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
  return encrypted.toString()
}
