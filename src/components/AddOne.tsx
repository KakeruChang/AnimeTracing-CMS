import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import PlusOneIcon from '@material-ui/icons/PlusOne'
import Tooltip from '@material-ui/core/Tooltip'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
      margin: theme.spacing(1)
    }
  })
)

export default function AddOne() {
  const classes = useStyles()
  const history = useHistory()

  return (
    <div className={classes.container}>
      <Tooltip
        arrow
        title='Add a new anime'
        placement='right'
        aria-label='Add a new anime'
      >
        <IconButton
          onClick={() => {
            history.push('/add')
          }}
          color='primary'
          component='span'
        >
          <PlusOneIcon fontSize='large' />
        </IconButton>
      </Tooltip>
    </div>
  )
}
