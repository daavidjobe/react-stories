import React from 'react'
import { storiesOf } from '@storybook/react'

import { Dropdown } from '../lib'

storiesOf('Dropdown', module)
  .add('basic', () =>
    <Dropdown title='DROPDOWN'>
      <div>one</div>
      <div>two</div>
    </Dropdown>
  )
  .add('keep open', () =>
    <Dropdown title='DROPDOWN' closeOnSelect={false}>
      <div>one</div>
      <div>two</div>
    </Dropdown>
  )
  .add('with labels', () =>
    <Dropdown title='DROPDOWN'>
      <div label="one">one</div>
      <div label="two">two</div>
    </Dropdown>
  )
  .add('custom animation', () =>
    <Dropdown title='DROPDOWN' springConfig={{
      stiffness: 500,
    }}>
      <div label="one">one</div>
      <div label="two">two</div>
    </Dropdown>
  )
  .add('multiple', () => (
    <div>
      <Dropdown title='DROPDOWN'>
        <div label="one">one</div>
        <div label="two">two</div>
      </Dropdown>
      <Dropdown title='DROPDOWN'>
        <div label="one">one</div>
        <div label="two">two</div>
      </Dropdown>
    </div>
  ))

