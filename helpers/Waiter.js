import request from 'request'
import xml2js from 'xml2js'
import async from 'async'
import traverse from 'traverse'
import moment from 'moment'
import {MENU_ENDPOINT as ENDPOINT, REFRESH_INTERVAL} from '../constants'
import {log} from '../utils/Logger'

class Waiter {
  constructor () {
    this.updateMenu(this.scheduleUpdate.bind(this))
  }

  requestMenu (callback) {
    request.get({
      url: ENDPOINT,
      encoding: 'iso-8859-1'
    }, callback)
  }

  convertMenu (response, menu, callback) {
    xml2js.parseString(menu, {
      explicitArray: false,
      explicitRoot: false,
      normalize: true,
      normalizeTags: true,
      strict: false,
      trim: true
    }, callback)
  }

  normalizeMenu (menu, callback) {
    traverse(menu).forEach(function (value) {
      switch (this.key) {
        case 'data':
          this.update(+moment(value, 'DD/MM/YYYY'))
          break

        case 'vazio':
          this.delete()
          break
      }
    })

    if (menu.sabado && menu.sabado.data && !menu.domingo) {
      menu.domingo = {
        data: +moment(menu.sabado.data).add(1, 'days'),
        almoco: {},
        jantar: {}
      }
    }

    callback(null, menu)
  }

  updateMenu (callback) {
    this.updatingMenu = new Promise((resolve, reject) => {
      async.waterfall(
        [this.requestMenu, this.convertMenu, this.normalizeMenu],
        (err, result) => {
          log('menu updated', err || result)
          err ? reject(err) : resolve(result)
          callback(err, result)
        }
      )
    })
  }

  scheduleUpdate () {
    setTimeout(this.updateMenu.bind(this, this.scheduleUpdate.bind(this)), REFRESH_INTERVAL)
  }

  bringMenu (callback) {
    this.updatingMenu.then(callback.bind(null, null), callback)
  }
}

export default Waiter
