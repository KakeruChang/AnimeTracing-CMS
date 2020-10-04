import React from 'react'
import Fab from '@material-ui/core/Fab'
import EditIcon from '@material-ui/icons/Edit'

import { ButtonProps } from '../../../interface'

export default function EditButton({ onClick }: ButtonProps) {
  return (
    <Fab color='primary' aria-label='add' onClick={onClick}>
      <EditIcon />
    </Fab>
  )
}
