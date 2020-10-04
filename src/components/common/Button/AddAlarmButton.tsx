import React from 'react'
import AddAlarmIcon from '@material-ui/icons/AddAlarm'
import IconButton from '@material-ui/core/IconButton'

import { ButtonProps } from '../../../interface'

export default function AddAlarmButton({ onClick }: ButtonProps) {
  return (
    <IconButton color='primary' onClick={onClick} component='span'>
      <AddAlarmIcon />
    </IconButton>
  )
}
