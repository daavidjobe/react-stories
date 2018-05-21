import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'
import PropTypes from 'prop-types'

export default class Dropdown extends Component {
  static propTypes = {
    children: PropTypes.array,
    onSelect: PropTypes.func,
    closeOnSelect: PropTypes.bool,
    springConfig: PropTypes.object
  }

  static defaultProps = {
    children: [],
    closeOnSelect: true,
    springConfig: {
      stiffness: 300
    }
  }

  state = {
    open: false,
    height: 0,
  }

  toggle = () => {
    const { open } = this.state
    this.setState({
      open: !open,
      height: !open ? this._getHeight() : 0
    })
  } 

  _getHeight = () =>
    Array.from(this.list.children)
     .reduce((a, b) => a.clientHeight + b.clientHeight)

  handleSelect = (item) => {
    const { state } = this
    if (item.props.label) {
      state.title = item.props.label
    }
    if (this.props.closeOnSelect) {
      state.open = false
      state.height = 0
    }
    this.setState(state)
  }


  render () {
    const { children, title, onSelect, springConfig } = this.props
    return (
      <div className='dropdown'>
        <button className='dropdown__trigger'
          onClick={this.toggle}>
          { this.state.title || title }
        </button>
        <Motion defaultStyle={{ height: 0 }}
          style={{
            height: spring(this.state.height, springConfig)
          }}>
          {
            styles => (
              <ul className='dropdown__list'
                ref={list => this.list = list}
                style={{ height: styles.height }}>
                {
                  children.map((item, index) => {
                    return (
                      <li className='dropdown__item'
                        onClick={this.handleSelect.bind(null, item)}
                        key={index}>
                        { item }
                      </li>
                    )
                  })
                }
              </ul>
            )
          }
        </Motion>
      </div>
    )
  }
}
