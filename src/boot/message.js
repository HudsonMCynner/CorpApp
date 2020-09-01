import Swal from 'sweetalert2'

/**
 * @param {string} title
 * @param {string} text
 * @param {string} customClass
 */
export const success = (title, text, customClass = '') => {
  return new Swal({
    icon: 'success',
    title: title,
    text: text,
    showCloseButton: true,
    customClass: customClass
  })
}
/**
 * @param {string} title
 * @param {string} text
 * @param {string} customClass
 */
export const info = (title, text, customClass = '') => {
  return new Swal({
    icon: 'info',
    title: title,
    text: text,
    showCloseButton: true,
    customClass: customClass
  })
}
/**
 * @param {string} title
 * @param {string} text
 * @param {string} customClass
 */
export const error = (title, text, customClass = '') => {
  return new Swal({
    icon: 'error',
    title: title,
    text: text,
    showCloseButton: true,
    customClass: customClass
  })
}
/**
 * @param {string} title
 * @param {string} text
 * @param {string} customClass
 */
export const warning = (title, text, customClass = '') => {
  return new Swal({
    icon: 'warning',
    title: title,
    text: text,
    showCloseButton: true,
    customClass: customClass
  })
}
/**
 * @param {string} title
 * @param {string} text
 * @param {string} customClass
 */
export const question = (title, text, customClass = '') => {
  return new Swal({
    icon: 'question',
    title: title,
    text: text,
    showCloseButton: true,
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: 'Sim',
    cancelButtonText: 'Não',
    customClass: customClass
  })
}

/**
 * @param {String} title
 * @param {String} type
 * @param {Number} timer
 * @returns {Promise}
 */
export const toast = (title, type = 'success', timer = 10000) => {
  // const toast = swal.mixin({
  //   toast: true,
  //   position: 'top-end',
  //   showConfirmButton: true,
  //   timer: timer
  // })
  //
  // return toast({
  //   type: type,
  //   title: title,
  //   background: '#EAEAEA'
  // })
}

/**
 * @param Vue
 * @returns {{success: success, info: info, error: error, warning: warning}}
 */
export default ({ Vue }) => {
  /**
   */
  Object.defineProperty(Vue.prototype, '$message', {
    get () {
      return {
        success, info, error, warning, question, toast
      }
    }
  })
}
