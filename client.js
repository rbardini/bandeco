import React from 'react'
import Logger, {log} from './utils/Logger';
import app from './app'

const exposedState = window.App

window.React = React
Logger.enable('*')

log('rehydrating application...')
app.rehydrate(exposedState, function (err, context) {
  if (err) throw err
  log('application rehydrated')

  window.context = context
  const mountNode = document.getElementById('app')

  log('rendering application...')
  React.render(context.createElement(), mountNode, () => log('application rendered'))
})
