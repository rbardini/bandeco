import {BaseStore} from 'fluxible/addons'
import keyMirror from 'keymirror'

const STATUS = keyMirror({
  UNCHECKED: null,
  CHECKING: null,
  CHECKED: null
})

class BalanceStore extends BaseStore {
  constructor (dispatcher) {
    super(dispatcher)

    this.balance = -1
    this.status = STATUS.UNCHECKED
    this.message = null
  }

  getState () {
    return {
      balance: this.balance,
      status: this.status,
      message: this.message
    }
  }

  setState (state) {
    this.balance = state.balance
    this.status = state.status
  }

  getBalance () {
    return this.balance
  }

  getStatus () {
    return this.status
  }

  getMessage () {
    return this.message
  }

  handleBalanceStart () {
    this.status = STATUS.CHECKING
    this.emitChange()
  }

  handleBalanceSuccess (balance) {
    this.balance = balance
    this.status = STATUS.CHECKED
    this.emitChange()
  }

  handleBalanceFail (err) {
    this.status = STATUS.UNCHECKED
    this.message = err.message
    this.emitChange()
  }

  dehydrate () {
    return this.getState()
  }

  rehydrate (state) {
    this.setState(state)
  }
}

BalanceStore.storeName = 'BalanceStore'
BalanceStore.handlers = {
  'RECEIVE_BALANCE_START': 'handleBalanceStart',
  'RECEIVE_BALANCE_SUCCESS': 'handleBalanceSuccess',
  'RECEIVE_BALANCE_FAILURE': 'handleBalanceFail'
}

export default BalanceStore
export {STATUS}
