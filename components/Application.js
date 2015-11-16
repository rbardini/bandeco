import React from 'react'
import {connectToStores, provideContext} from 'fluxible-addons-react'
import {WEEKDAYS, RELATIVE_DAYS, MEALS, HOURS} from '../constants'
import {normalizeString} from '../utils/StringUtils'
import ApplicationStore from '../stores/ApplicationStore'
import Menu from './Menu'
import WeekMenu from './WeekMenu'
import Sidebar from './Sidebar'

class Application extends React.Component {
  constructor (props, context) {
    super(props, context)

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
    return WEEKDAYS[this.date.getDay() % 7]
  }

  getOffsetWeekday () {
    var today = this.date.getDay()
    var offset = +this.isClosed()

    return WEEKDAYS[(today + offset) % 7]
  }

  getMenu () {
    var weekday = normalizeString(this.getOffsetWeekday())
    var meal = normalizeString(this.getMeal())

    return this.props.menu[weekday][meal]
  }

  render () {
    this.date = new Date()

    var meal = this.getMeal()
    var relativeDay = this.getRelativeDay()
    var title = `${meal} de ${relativeDay}`

    return (
      <div>
        <Sidebar />
        <Menu
          title={title}
          menu={this.getMenu()}
          large />
        <WeekMenu
          menu={this.props.menu}
          today={this.getWeekday()} />
      </div>
    )
  }
}

Application.contextTypes = {
  getStore: React.PropTypes.func,
  executeAction: React.PropTypes.func
}

Application.propTypes = {
  menu: React.PropTypes.object
}

export default provideContext(connectToStores(Application, [ApplicationStore], (context, props) => ({
  menu: context.getStore(ApplicationStore).getMenu()
})))
