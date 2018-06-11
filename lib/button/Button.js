import React, { Component } from 'react'
import { TransitionMotion, spring } from 'react-motion'

export default class Button extends Component {

  state = {
    mouse: []
  }

  handleClick = ({ pageX, pageY }) => {
    this.setState(() => ({ 
      mouse: [pageX - 30, pageY - 30],
      key: 't' + Date.now(),
    }))
  }

  willLeave = (styleCell) => ({
    ...styleCell.style,
    opacity: spring(0),
    scale: spring(3)
  })

  render () {
    const { mouse: [x, y], key } = this.state

    const styles = x == null ? [] : [{
      key,
      style: {
        opacity: spring(1),
        scale: spring(0),
        x: spring(x),
        y: spring(y)
      }
    }]

    return (
      <button onClick={this.handleClick}
        className='button'>
        click me
        <TransitionMotion
          willLeave={this.willLeave}
          styles={styles}>
          { ripples => 
              <div>
                { 
                  ripples.map(({ key, style: { opacity, scale, x, y } }) => {
                    return <div key={key}
                      className='ripple'
                      style={{
                        opacity: opacity,
                        scale: scale,
                        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                      }} />
                  })
                }
              </div>
          }
        </TransitionMotion>
      </button>
    )
  }
}
