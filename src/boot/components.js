// eslint-disable-next-line import/namespace
import * as components from '../components'

/**
 * @param Vue
 * @returns {Vue}
 */
export default ({ Vue }) => {
  /**
   */
  Object.keys(components).forEach((key) => {
    // eslint-disable-next-line import/namespace
    Vue.component(key, components[key])
  })
}
