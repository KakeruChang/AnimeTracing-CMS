import React from 'react'
import Fab from '@material-ui/core/Fab'
import CancelIcon from '@material-ui/icons/Save'

import { ButtonProps } from '../../../interface'

export default function SaveButton({ onClick }: ButtonProps) {
  return (
    <Fab color='primary' aria-label='edit' onClick={onClick}>
      <CancelIcon />
    </Fab>
  )
}
