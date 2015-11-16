import React from 'react'
import ReactDOM from 'react-dom/server'
import express from 'express'
import favicon from 'serve-favicon'
import serialize from 'serialize-javascript'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import csrf from 'csurf'
import {createElementWithContext} from 'fluxible-addons-react'
import app from './app'
import menu from './services/menu'
import balance from './services/balance'
import Html from './components/Html'
import getMenu from './actions/getMenu'
import {log} from './utils/Logger'

const HtmlComponent = React.createFactory(Html)

const server = express()
server.use(favicon(__dirname + '/favicon.png'))
server.use('/public', express.static(__dirname + '/dist'))

server.use(cookieParser())
server.use(bodyParser.json())
server.use(csrf({ cookie: true }))

let fetchrPlugin = app.getPlugin('FetchrPlugin')
fetchrPlugin.registerService(menu)
fetchrPlugin.registerService(balance)
server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware())

server.get('/', (req, res, next) => {
  var context = app.createContext({
    req,
    xhrContext: { _csrf: req.csrfToken() }
  })

  context.executeAction(getMenu, {}, (err) => {
    if (err) return next(err)

    log('exposing context state')
    var dehydratedState = app.dehydrate(context)
    var exposedState = `window.App=${serialize(dehydratedState)};`

    log('rendering application into markup')
    var html = '<!doctype html>' + ReactDOM.renderToStaticMarkup(HtmlComponent({
      markup: ReactDOM.renderToString(createElementWithContext(context)),
      context: context.getComponentContext(),
      state: exposedState
    }))

    log('sending markup')
    res.send(html)
  })
})

let port = process.env.PORT || 3000
server.listen(port)
console.log(`Listening on port ${port}`)
