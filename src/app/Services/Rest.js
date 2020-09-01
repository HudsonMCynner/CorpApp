import API from 'src/Services/API'
import { prop } from 'src/util'
import $store from 'src/store'

/**
 * @type {Rest}
 * @link https://labs.omniti.com/labs/jsend
 */
export default class Rest extends API {
  /**
   * @type {String}
   */
  static resource = ''

  /**
   * @type {Rest}
   * @private
   */
  static __instance = undefined

  /**
   * @type {String}
   */
  id = 'id'

  /**
   * @type {Number}
   */
  size = 30

  /**
   * @type {string}
   */
  separator = '='

  /**
   * @type {string}
   */
  joiner = ','

  /**
   * @param {String} resource
   * @param {Object} http
   * @param {Object} options
   */
  constructor (resource, http = null, options = {}) {
    super(Rest.normalize(Rest.base, resource), http, options)
  }

  /**
   * @param {Object} options
   * @param {Object} http
   * @returns {this}
   */
  static build (options = {}, http = null) {
    return new this(this.resource, http, options)
  }

  /**
   * @param {Object} options
   * @param {Object} http
   * @returns {this}
   */
  static instance (options = {}, http = null) {
    if (!this.__instance) {
      this.__instance = this.build(options, http)
    }
    return this.__instance
  }

  /**
   * @param {Object} record
   * @returns {Promise}
   */
  create (record) {
    return this.post('', record)
  }

  /**
   * @param {Object} record
   * @returns {Promise}
   */
  update (record) {
    return this.put('', record)
  }

  /**
   * @param {object} record
   */
  save (record) {
    return record.id ? this.update(record) : this.create(record)
  }

  /**
   * @param {String|Object} record
   * @returns {Promise}
   */
  read (record) {
    return this.get(`/${this.__getId(record)}`)
  }

  /**
   * @param {Object} record
   * @returns {Promise}
   */
  destroy (record) {
    return this.delete(`/${this.__getId(record)}`)
  }

  /**
   * @param {Object} parameters
   * @param {Array} filters
   * @param {Object} searchable
   * @param {Boolean} distinct
   * @param {String} joinType
   * @param {Number} specification
   * @returns {Promise}
   */
  search (parameters = {}, filters = [], searchable = {}, distinct = null, joinType = null, specification = null) {
    if (parameters.auxFilter) {
      searchable = Object.assign({}, searchable, parameters.auxFilter)
    }
    const page = prop(parameters, 'pagination.page', 1)
    const size = this.parseSize(parameters)
    const sorter = prop(parameters, 'sorter', '')
    const descending = prop(parameters, 'pagination.descending', false)

    const then = (response) => {
      const rows = prop(response, 'content')
      const current = prop(response, 'currentPage')
      const pages = prop(response, 'totalPages')
      const totalElements = prop(response, 'totalElements')
      return {
        pagesNumber: pages,
        totalElements: totalElements,
        page: current,
        rows: rows,
        rowsPerPage: 30
      }
    }

    // noinspection SpellCheckingInspection
    const fragments = [
      `page=${page}`,
      `size=${size}`,
      `order=${this.parseOrder(sorter)}`,
      `direction=${this.parseDirection(descending)}`,
      `distinct=${this.parseDistinct(distinct)}`,
      `jointype=${this.parseJoinType(joinType)}`,
      `specification=${this.parseSpecification(specification)}`
    ]

    const filter = prop(parameters, 'filter')
    if (!Array.isArray(filters)) {
      filters = []
    }
    const search = this.parseSearch(filters, filter, searchable)
    if (search) {
      fragments.push(`search=${search}`)
    }

    const queryString = '?' + fragments.join('&')

    return this.read(queryString)
      .then(then)
  }

  /**
   * @param {*} sorter
   * @return {string}
   */
  parseOrder (sorter) {
    if (Array.isArray(sorter)) {
      return sorter.join(',')
    }
    return String(sorter)
  }

  /**
   * @param {Array} filters
   * @param {Object} filter
   * @param {Object} searchable
   * @returns {string}
   */
  parseSearch (filters, filter, searchable) {
    const query = []

    if (filters.length) {
      if (filter) {
        query.push(...filters.map((item) => `${item}${this.separator}${filter}`))
      }
    }

    if (typeof this.options.searchable !== 'object') {
      this.options.searchable = {}
    }

    if (typeof searchable !== 'object') {
      searchable = {}
    }

    searchable = {
      ...this.options.searchable,
      ...searchable
    }

    const keys = Object.keys(searchable)
    if (keys.length) {
      query.push(...keys.map((key) => {
        const value = this.parseSearchValue(String(searchable[key]))
        return `${key}${this.separator}${value}`
      }))
    }

    return query.join(this.joiner)
  }

  /**
   * @param {string} value
   * @returns {string}
   */
  parseSearchValue (value) {
    if (value.indexOf('$store') !== 0) {
      return value
    }
    const pieces = value.split('.')
    const getter = pieces[1]
    if (pieces.length === 2) {
      return $store.getters[getter]
    }
    pieces.shift()
    pieces.shift()
    return String(prop($store.getters[getter], pieces.join('.')))
  }

  /**
   * @param distinct
   * @returns {Boolean}
   */
  parseDistinct (distinct) {
    if (typeof distinct === 'boolean') {
      return distinct
    }

    if (typeof this.options.distinct === 'boolean') {
      return this.options.distinct
    }

    return true
  }

  /**
   * @param joinType
   * @returns {String}
   */
  parseJoinType (joinType) {
    if (typeof joinType === 'string') {
      return joinType
    }
    if (typeof this.options.joinType === 'string') {
      return this.options.joinType
    }
    return 'inner'
  }

  /**
   * @param {Number} specification
   * @returns {boolean|number|*}
   */
  parseSpecification (specification) {
    if (typeof specification === 'number') {
      return specification
    }

    if (typeof this.options.specification === 'number') {
      return this.options.specification
    }

    return 0
  }

  /**
   * @param {Boolean} direction
   * @returns {string}
   */
  parseDirection (direction) {
    if (typeof this.options.direction === 'boolean') {
      return 'DESC'
    }
    if (typeof direction === 'boolean' && !direction) {
      return 'ASC'
    }
    return 'DESC'
  }

  /**
   * @param {Object} parameters
   * @return {*}
   */
  parseSize (parameters) {
    if (this.size !== 30) {
      return this.size
    }
    return prop(parameters, 'pagination.rowsPerPage') || this.size
  }

  /**
   * @param {Object} options
   */
  setOptions (options = {}) {
    this.options = {
      ...this.options,
      ...options
    }
  }

  /**
   * @param {Number} size
   */
  setSize (size = 30) {
    this.size = size
  }

  /**
   * @param {String|Object} record
   * @returns {String}
   */
  __getId (record) {
    if (typeof record === 'object') {
      return record[this.id]
    }
    return String(record)
  }
}
