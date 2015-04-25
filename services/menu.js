import Waiter from '../helpers/Waiter'

var waiter = new Waiter()

export default {
  name: 'menu',
  read (req, res, params, config, callback) {
    waiter.bringMenu(callback)
  }
}
