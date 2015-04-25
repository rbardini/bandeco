import React from 'react'

class Menu extends React.Component {
  render () {
    var meals = []

    for (let meal in this.props.menu) {
      meals.push(<li key={meal} className='c-menu__item' data-meal={meal}>{this.props.menu[meal]}</li>)
    }

    if (!meals.length) {
      meals.push(<li key='empty' className='c-menu__item'>Nada :(</li>)
    }

    return (
      <div className='c-menu'>
        <h1 className='c-menu__title'>{this.props.title}</h1>
        <ul>{meals}</ul>
      </div>
    )
  }
}

Menu.propTypes = {
  title: React.PropTypes.string,
  menu: React.PropTypes.object
}

export default Menu
