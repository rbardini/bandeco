import Fluxible from 'fluxible'
import fetchrPlugin from 'fluxible-plugin-fetchr'
import Application from './components/Application'
import ApplicationStore from './stores/ApplicationStore'
import BalanceStore from './stores/BalanceStore'

const app = new Fluxible({
  component: Application,
  stores: [ApplicationStore, BalanceStore]
})
app.plug(fetchrPlugin({ xhrPath: '/api' }))

export default app
