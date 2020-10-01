import React, { ChangeEvent, Dispatch, Fragment, SetStateAction } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import RenewIcon from '@material-ui/icons/Autorenew'
import { parseISO, compareAsc } from 'date-fns'

import { Anime } from '../../interface'
import countTime from '../../functions/countTime'
import DeleteButton from '../common/DeleteButton'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '250px !important'
    }
  })
)

interface DateAndTimePickersProps {
  isEditing: boolean
  tmpAnime: Anime
  setTmpAnime: Dispatch<SetStateAction<Anime>>
}

export default function DateAndTimePickers({
  isEditing,
  tmpAnime,
  setTmpAnime
}: DateAndTimePickersProps) {
  const classes = useStyles()

  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    let copy = { ...tmpAnime }
    copy.timeArray[index] = event.target.value
    copy.timeArray.sort((timeA, timeB) => {
      return compareAsc(parseISO(timeA), parseISO(timeB))
    })
    setTmpAnime(copy)
  }

  const countRemainEpisodeTime = () => {
    let copy = { ...tmpAnime }
    copy.timeArray = countTime({ ...tmpAnime })

    setTmpAnime(copy)
  }

  const deleteTimeItem = (index: number) => {
    let copy = { ...tmpAnime }
    copy.timeArray.splice(index, 1)

    setTmpAnime(copy)
  }

  return (
    <>
      {/* <form className={classes.container} noValidate> */}
      {tmpAnime.timeArray &&
        tmpAnime.timeArray.map((item: string, i: number) => (
          <Fragment key={`date&time${i}`}>
            <TextField
              id={`datetime-${i}`}
              label={`datetime-${i}`}
              type='datetime-local'
              value={item}
              onChange={(e) => onChangeHandler(e, i)}
              className={classes.textField}
              InputProps={{
                readOnly: !isEditing
              }}
              InputLabelProps={{
                shrink: true
              }}
            />
            <DeleteButton
              onClick={() => {
                deleteTimeItem(i)
              }}
            />
          </Fragment>
        ))}

      {isEditing && (
        <IconButton color='secondary' onClick={countRemainEpisodeTime}>
          <RenewIcon />
        </IconButton>
      )}

      {/* </form> */}
    </>
  )
}
