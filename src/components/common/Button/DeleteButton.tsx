import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'

import { ButtonProps } from '../../../interface'

export default function DeleteButton({ onClick }: ButtonProps) {
  return (
    <IconButton color='secondary' onClick={onClick} component='span'>
      <DeleteIcon />
    </IconButton>
  )
}
