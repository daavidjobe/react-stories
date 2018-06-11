import React from 'react'
import { storiesOf } from '@storybook/react'

import { FileInput } from '../lib'


storiesOf('FileInput', module)
  .add('default', () => 
    <FileInput
      handleFile={(file, base64) => { console.log(file, base64) }} />
  )

