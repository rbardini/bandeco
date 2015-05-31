import React from 'react'
import classNames from 'classnames'

class Menu extends React.Component {
  render () {
    var {menu} = this.props
    var meals = Object.keys(menu).map(meal => (
      <li key={meal} className='c-menu__item' data-meal={meal}>{menu[meal]}</li>
    ))

    if (meals.length === 0) {
      meals.push(<li key='empty' className='c-menu__item'>Nada :(</li>)
    }

    var className = classNames('c-menu', {'c-menu--large': this.props.large})

    return (
      <div className={className}>
        {this.props.title != null && <h1 className='c-menu__title'>{this.props.title}</h1>}
        <ul className='c-menu__list'>
          {meals}
        </ul>
      </div>
    )
  }
}

Menu.propTypes = {
  title: React.PropTypes.string,
  menu: React.PropTypes.object,
  large: React.PropTypes.bool
}

Menu.defaultProps = {
  menu: {}
}

export default Menu
