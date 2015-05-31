import React from 'react'
import classNames from 'classnames'
import {WEEKDAYS, MEALS} from '../constants'
import {normalizeString} from '../utils/StringUtils'
import Menu from './Menu'

class WeekMenu extends React.Component {
  mapMenu (iteratee) {
    return WEEKDAYS.map(weekday => {
      var normalizedWeekday = normalizeString(weekday)

      return iteratee(this.props.menu[normalizedWeekday], weekday)
    })
  }

  buildCol (day) {
    var isToday = day === this.props.today
    var className = classNames('c-week-menu__column', {'is-today': isToday})

    return <col key={day} className={className} />
  }

  buildCols () {
    return this.mapMenu((menu, day) => this.buildCol(day))
  }

  buildHeader (day) {
    return <th key={day} className='c-week-menu__header'>{day}</th>
  }

  buildHeaders () {
    return this.mapMenu((menu, day) => this.buildHeader(day))
  }

  buildCells (meal) {
    var normalizedMeal = normalizeString(meal)

    return this.mapMenu((menu, day) => (
      <td key={day} className='c-week-menu__cell'>
        <Menu menu={menu[normalizedMeal]} />
      </td>
    ))
  }

  render () {
    return (
      <table className='c-week-menu'>
        <colgroup>
          {this.buildCol()}
          {this.buildCols()}
        </colgroup>
        <thead>
          <tr>
            {this.buildHeader()}
            {this.buildHeaders()}
          </tr>
        </thead>
        <tbody>
          <tr className='c-week-menu__row'>
            {this.buildHeader(MEALS.lunch)}
            {this.buildCells(MEALS.lunch)}
          </tr>
          <tr className='c-week-menu__row'>
            {this.buildHeader(MEALS.dinner)}
            {this.buildCells(MEALS.dinner)}
          </tr>
        </tbody>
      </table>
    )
  }
}

WeekMenu.propTypes = {
  menu: React.PropTypes.object,
  today: React.PropTypes.string
}

WeekMenu.defaultProps = {
  menu: {}
}

export default WeekMenu
