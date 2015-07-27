import React from 'react'
import {connectToStores} from 'fluxible-addons-react'
import getBalance from '../actions/getBalance'
import BalanceStore, {STATUS} from '../stores/BalanceStore'

class Balance extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      username: null,
      password: null
    }
  }

  handleUsernameChange (e) {
    var {value: username} = e.target
    this.setState({username})
  }

  handlePasswordChange (e) {
    var {value: password} = e.target
    this.setState({password})
  }

  handleSubmit (e) {
    e.preventDefault()

    var {username, password} = this.state
    this.context.executeAction(getBalance, {username, password})
  }

  getForm () {
    var {username, password} = this.state
    var {message} = this.props

    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type='text' className='balance__form-field' placeholder='Número USP'
          value={username} onChange={this.handleUsernameChange.bind(this)} required />
        <input type='password' className='balance__form-field' placeholder='Senha Rucard'
          value={password} onChange={this.handlePasswordChange.bind(this)} required />
        <button type='submit' className='balance__form-button'>Entrar</button>
        <a href='https://sistemas.usp.br/rucard/esqueciSenha' className='balance__forgot-pw'>Esqueci a senha</a>
        {message && <span className='balance__error'>{message}</span>}
      </form>
    )
  }

  render () {
    var {status, balance} = this.props
    var content

    switch (status) {
      case STATUS.UNCHECKED:
        content = this.getForm()
        break

      case STATUS.CHECKING:
        content = <span>Perguntando pro tiozinho...</span>
        break

      case STATUS.CHECKED:
        content = <span>{balance} créditos</span>
        break
    }

    return (
      <div className='c-balance'>
        <h2 className='c-sidebar__title'>Extrato do cartão</h2>
        {content}
      </div>
    )
  }
}

Balance.propTypes = {
  balance: React.PropTypes.number,
  status: React.PropTypes.string,
  message: React.PropTypes.string
}

Balance.contextTypes = {
  getStore: React.PropTypes.func,
  executeAction: React.PropTypes.func
}

export default connectToStores(Balance, [BalanceStore], (context, props) => context.getStore(BalanceStore).getState())
