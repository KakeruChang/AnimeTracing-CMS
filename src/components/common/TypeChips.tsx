import React, {
  useState,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  KeyboardEvent
} from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import CancelIcon from '@material-ui/icons/Cancel'
import TextField from '@material-ui/core/TextField'
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined'
import IconButton from '@material-ui/core/IconButton'

import { Anime } from '../../interface'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(2)
      }
    },
    tagInput: {
      '&.MuiTextField-root': {
        width: '250px !important'
      }
    }
  })
)

interface TypeChipsProps {
  isEditing: boolean
  tmpAnime: Anime
  setTmpAnime: Dispatch<SetStateAction<Anime>>
}

export default function TypeChips({
  isEditing,
  tmpAnime,
  setTmpAnime
}: TypeChipsProps) {
  const classes = useStyles()
  const [tagInput, setTagInput] = useState('')
  const [editContent, setEditContent] = useState<string | null>(null)

  const deleteType = (index: number) => {
    if (isEditing) {
      let copy = { ...tmpAnime }
      copy.type.splice(index, 1)

      setTmpAnime(copy)
    }
  }

  const editType = (tag: string) => {
    if (isEditing) {
      setEditContent(tag)
      setTagInput(tag)
    }
  }

  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTagInput(event.target.value)
  }

  const onKeyDownHandler = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode == 13) {
      addType()
    }
  }

  const addType = () => {
    const newType = tagInput
    let isExist = false
    let editIndex: number | null = null
    let copy = { ...tmpAnime }

    copy.type.forEach((item, j) => {
      if (item === newType) {
        isExist = true
      }
      if (item === editContent) {
        editIndex = j
      }
    })
    if (!isExist) {
      if (typeof editIndex === 'number') {
        copy.type.splice(editIndex, 1, newType)
      } else {
        copy.type.push(newType)
      }
      setTmpAnime(copy)
    }

    setEditContent(null)
    setTagInput('')
  }

  return (
    <div className={classes.root}>
      {tmpAnime.type.map((item, i) => (
        <Chip
          key={item}
          label={item}
          id={item}
          clickable
          color='primary'
          onClick={() => editType(item)}
          onDelete={() => deleteType(i)}
          deleteIcon={<CancelIcon color='secondary' />}
          variant={item !== editContent ? 'outlined' : 'default'}
        />
      ))}

      <TextField
        className={classes.tagInput}
        id='tagInput'
        label='tagInput'
        variant='outlined'
        value={tagInput}
        onChange={(e) => onChangeHandler(e)}
        onKeyDown={(e) => onKeyDownHandler(e)}
        InputProps={{
          readOnly: !isEditing
        }}
      />
      {isEditing && (
        <IconButton color='primary' onClick={addType} component='span'>
          <ArrowForwardOutlinedIcon />
        </IconButton>
      )}
    </div>
  )
}
