import {BaseStore} from 'fluxible/addons'

class ApplicationStore extends BaseStore {
  constructor (dispatcher) {
    super(dispatcher)

    this.pageTitle = 'O que tem no bandejão hoje?'
    this.menu = {}
  }

  getState () {
    return {
      pageTitle: this.pageTitle,
      menu: this.menu
    }
  }

  setState (state) {
    this.pageTitle = state.pageTitle
    this.menu = state.menu
  }

  getPageTitle () {
    return this.pageTitle
  }

  getMenu () {
    return this.menu
  }

  updateMenu (menu) {
    this.menu = menu
    this.emitChange()
  }

  dehydrate () {
    return this.getState()
  }

  rehydrate (state) {
    this.setState(state)
  }
}

ApplicationStore.storeName = 'ApplicationStore'
ApplicationStore.handlers = {
  'RECEIVE_MENU_SUCCESS': 'updateMenu'
}

export default ApplicationStore
