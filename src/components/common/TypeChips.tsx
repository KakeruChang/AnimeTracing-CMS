import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  KeyboardEvent
} from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import CancelIcon from '@material-ui/icons/Cancel'
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined'
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft'
import { Chip, TextField, IconButton, Button } from '@material-ui/core'

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
    },
    button: {
      margin: theme.spacing(1)
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
  const exampleTagsData = [
    '少年',
    '青年',
    '少女',
    '幽默搞笑',
    '奇幻冒險',
    '運動競技',
    '科幻未來',
    '青春校園',
    '戀愛'
  ]
  const [exampleTags, setExampleTags] = useState<Array<string>>(exampleTagsData)

  useEffect(() => {
    // check wheather tag is existong
    let copy = [...exampleTags]
    tmpAnime.type.forEach((item) => {
      for (let j = 0; j < copy.length; j += 1) {
        if (item === copy[j]) {
          copy.splice(j, 1)
          break
        }
      }
    })
    setExampleTags(copy)
  }, [tmpAnime])

  const deleteType = (index: number) => {
    if (isEditing) {
      let copy = { ...tmpAnime }

      for (let i = 0; i < exampleTagsData.length; i += 1) {
        if (copy.type[index] === exampleTagsData[i]) {
          setExampleTags([...exampleTags, exampleTagsData[i]])
          break
        }
      }

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

  const addTagByClicking = (tag: string, index: number) => {
    let isExist = false
    let copy = { ...tmpAnime }
    const copyExamples = [...exampleTags]

    copy.type.forEach((item) => {
      if (item === tag) {
        isExist = true
      }
    })
    if (!isExist) {
      copy.type.push(tag)
      copyExamples.splice(index, 1)
      setExampleTags(copyExamples)
      setTmpAnime(copy)
    }
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
      <div>
        {exampleTags.map((tag, i) => (
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            endIcon={<SubdirectoryArrowLeftIcon />}
            onClick={() => addTagByClicking(tag, i)}
            key={tag}
          >
            {tag}
          </Button>
        ))}
      </div>
    </div>
  )
}
