import React from 'react'
import Fab from '@material-ui/core/Fab'
import CancelIcon from '@material-ui/icons/Close'

import { ButtonProps } from '../../../interface'

export default function CancelButton({ onClick }: ButtonProps) {
  return (
    <Fab color='secondary' aria-label='edit' onClick={onClick}>
      <CancelIcon />
    </Fab>
  )
}
