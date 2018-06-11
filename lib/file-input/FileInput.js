import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class FileInput extends Component {
  static propTypes = {
    handleFile: PropTypes.func.isRequired,
    fileTypes: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ]),
    disabled: PropTypes.bool
  }

  static defaultProps = {
    fileTypes: 'image/*',
    disabled: false
  }

  state = {
    id: this.props.id || Math.random() * 1000000
  }

  handleClick = () => {
    const element = document.getElementByID(this.state.id)
    element.value = ''
    element.click()
  }

  handleFile = ({ target: { files } }) => {
    const base64 = this.convertToBase64(files[0])
    this.setState({ base64 })
    this.props.handleFile(files[0])
  }

  convertToBase64 = (file) => {
    let reader = new FileReader()
    reader.onloadend = () => {
      this.setState({ base64: reader.result })
    } 
    reader.readAsDataURL(file)
  }

  render () {
    const hidden = {
      width: 0,
      opacity: 0,
      position: 'fixed'
    }

    const { fileTypes } = this.props

    return (
      <div className='file-input'>
        <input type='file'
          style={hidden}
          accept={Array.isArray(fileTypes) ? fileTypes.join(',') : fileTypes}
          onChange={this.handleFile}
          disabled={this.props.disabled}
          id={this.state.id}
        />
        <img src={this.state.base64} />
        <button
          className='file-input__button'
          onClick={this.handleClick}>
          choose file
        </button>
      </div>
    )
  }

}






