import React from 'react'
import {connectToStores, provideContext} from 'fluxible/addons'
import {remove as removeDiacritics} from 'diacritics'
import {WEEKDAYS, RELATIVE_DAYS, MEALS, HOURS} from '../constants'
import ApplicationStore from '../stores/ApplicationStore'
import Menu from './Menu'

var normalizeString = str => removeDiacritics(str).toLowerCase()

class Application extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.state = context.getStore(ApplicationStore).getState()
    this.date = new Date()
  }

  isClosed () {
    return this.date.getHours() > HOURS.dinner.to
  }

  getMeal () {
    var hour = this.date.getHours()
    var isDinner = hour >= HOURS.lunch.to && hour <= HOURS.dinner.to

    return isDinner ? MEALS.dinner : MEALS.lunch
  }

  getRelativeDay () {
    return this.isClosed() ? RELATIVE_DAYS.tomorrow : RELATIVE_DAYS.today
  }

  getWeekday () {
    var today = this.date.getDay()
    var offset = +this.isClosed()

    return WEEKDAYS[(today + offset) % 7]
  }

  getMenu () {
    var weekday = normalizeString(this.getWeekday())
    var meal = normalizeString(this.getMeal())

    return this.state.menu[weekday][meal]
  }

  render () {
    this.date = new Date()

    var meal = this.getMeal()
    var day = this.getRelativeDay()
    var menu = this.getMenu()
    var props = {
      title: `${meal} de ${day}`,
      menu
    }

    return <Menu {...props} />
  }
}

Application.contextTypes = {
  getStore: React.PropTypes.func,
  executeAction: React.PropTypes.func
}

Application = connectToStores(Application, [ApplicationStore], function (stores, props) {
  return {
    ApplicationStore: stores.ApplicationStore.getState()
  }
})

Application = provideContext(Application)

export default Application
