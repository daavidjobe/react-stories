import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'
import PropTypes from 'prop-types'

const WAITING = 'WAITING'
const RESIZING = 'RESIZING'
const IDLE = 'IDLE'

const css = {
  wrapper: 'dropdown',
  trigger: 'dropdown__trigger',
  content: 'dropdown__content',
  list: 'dropdown__list',
  item: 'dropdown__list-item'
}

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
    onSelect: () => {},
    springConfig: {
      stiffness: 250,
    }
  }

  state = {
    open: false,
    currentState: IDLE,
    from: 0,
    to: 0
  }

  getMotionProps = () => {
    const { springConfig } = this.props
    return this.state.currentState === IDLE ? {
      defaultStyle: { height: this.state.to },
      style: { height: this.state.to }
    } : {
      defaultStyle: { height: this.state.from },
      style: { height: spring(this.state.to, springConfig) }
    }
  }

  toggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const { open } = this.state
    const to = open ? 0 : this.list.clientHeight
    this.setState({
      open: !open,
      to,
      currentState: RESIZING
    })
  }

  handleSelect = (item, e) => {
    e.preventDefault()
    const { state } = this
    if (item.props.label) {
      state.title = item.props.label
    }
    if (this.props.closeOnSelect) {
      state.open = false
      state.from = this.list.clientHeight
      state.to = 0
      state.currentState = RESIZING
    }
    this.setState(state)
    this.props.onSelect(item.props.data)
  }

  wrapperStyle = (height) => {
    const { currentState, to } = this.state
    if (currentState === IDLE && to) {
      return { height: 'auto' }
    }

    if (currentState === WAITING && !to) {
      return { overflow: 'hidden', height: 0 }
    }

    return { overflow: 'hidden', height: Math.max(0, height) }
  }

  wrapperClass = (height) => {
    return height > 1 ? `${css.content} ${css.content}--expanded` : css.content
  }

  content = ({ height }) => {
    const { children, title } = this.props
    return (
      <div className={css.wrapper}>
        <button className={css.trigger}
          type='button' role='button'
          onClick={this.toggle}>
          { this.state.title || title }
        </button>
        <div className={this.wrapperClass(height)}
          style={{ ...this.wrapperStyle(height) }}>
          <ul className={css.list} ref={(list) => { this.list = list }}>
            {
              children.map((item, index) => {
                return (
                  <li className={css.item}
                    onClick={this.handleSelect.bind(null, item)}
                    key={index}>
                    { item }
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }

  render () {
    return (
      <Motion {...this.getMotionProps()}>
        {this.content}
      </Motion>
    )
  }
}
