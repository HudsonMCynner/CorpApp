import Http from './Http'

/**
 * @type API
 */
export default class API extends Http {
  /**
   * @type {String}
   */
  static base = ''

  /**
   * @param {String} path
   * @param {Object} http
   * @param {Object} options
   * @return {this}
   */
  static build (path = '', http = null, options = {}) {
    return new this(Http.normalize(API.base, path), http, options)
  }
}
