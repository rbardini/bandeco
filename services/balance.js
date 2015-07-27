import {requestBalance} from '../utils/Rucard'

export default {
  name: 'balance',
  read (req, res, params, config, callback) {
    requestBalance(params, callback)
  }
}
