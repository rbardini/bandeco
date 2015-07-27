import async from 'async'
import request from 'request'
import cheerio from 'cheerio'
import {CREDITS_ENDPOINT as ENDPOINT} from '../constants'
import {log} from '../utils/Logger'

const req = request.defaults({
  encoding: 'iso-8859-1',
  jar: true
})

var authenticateUser = (credentials, callback) => {
  var {username, password} = credentials
  req.post(`${ENDPOINT}/autenticar`, callback).form({codpes: username, senusu: password})
}

var navigateToCredits = (res, body, callback) => {
  var $ = cheerio.load(body)
  var error = $('#layout_conteudo').children('div').first()

  if (error.length) return callback(new Error(error.text().trim()))

  req.get(`${ENDPOINT}/extratoListar`, callback)
}

var extractBalance = (res, body, callback) => {
  var $ = cheerio.load(body)
  var balance = $('.table_list td').last().text()

  callback(null, +balance)
}

export const requestBalance = (credentials, callback) => {
  return new Promise((resolve, reject) => {
    async.waterfall(
      [authenticateUser.bind(null, credentials), navigateToCredits, extractBalance],
      (err, result) => {
        log('balance requested', err || result)
        err ? reject(err) : resolve(result)
        callback(err, result)
      }
    )
  })
}
