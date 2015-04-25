import React from 'react'
import Fluxible from 'fluxible'
import fetchrPlugin from 'fluxible-plugin-fetchr'
import Application from './components/Application'
import ApplicationStore from './stores/ApplicationStore'

const app = new Fluxible({
  component: Application,
  stores: [ApplicationStore]
})
app.plug(fetchrPlugin({ xhrPath: '/api' }))

export default app
