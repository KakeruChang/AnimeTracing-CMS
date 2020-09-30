import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import { Anime } from '../interface'
import SimpleBreadcrumbs from './common/SimpleBreadcrumbs'
import EditButton from './common/EditButton'
import SaveButton from './common/SaveButton'
import CancelButton from './common/CancelButton'
import Modal from './Modal'

interface AnimeDetailProps {
  allAnime: Array<Anime>
  animeId: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '50ch'
      }
    },
    buttons: {
      display: 'flex',
      justifyContent: 'space-around',
      '& > *': {
        margin: theme.spacing(1)
      }
    }
  })
)

const AnimeDetail: FC<AnimeDetailProps> = ({ allAnime, animeId }) => {
  const classes = useStyles()
  const history = useHistory()
  const [activeAnime, setActiveAnime] = useState<Anime>({
    title: '',
    imgLink: '',
    webLink: '',
    day: '',
    time: '',
    episode: 0,
    startingDate: '',
    id: '',
    type: [],
    introduction: '',
    isFavorite: false,
    isReminding: false,
    rate: 0,
    video: {
      baha: { link: '', episode: 12 },
      muse: { link: '', episode: 12 }
    }
  })
  const [tmpAnime, setTmpAnime] = useState<Anime>({
    title: '',
    imgLink: '',
    webLink: '',
    day: '',
    time: '',
    episode: 0,
    startingDate: '',
    id: '',
    type: [],
    introduction: '',
    isFavorite: false,
    isReminding: false,
    rate: 0,
    video: {
      baha: { link: '', episode: 12 },
      muse: { link: '', episode: 12 }
    }
  })
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (allAnime.length > 0) {
      let trigger = false
      for (let i = 0; i < allAnime.length; i += 1) {
        if (allAnime[i].id === animeId) {
          trigger = true
          setActiveAnime({ ...allAnime[i] })
          setTmpAnime({ ...allAnime[i] })
        }
      }
      if (!trigger) {
        history.push('/')
      }
    }
  }, [allAnime])

  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let copy = { ...activeAnime }

    copy[event.target.name] = event.target.value
    setTmpAnime(copy)
  }

  const saveEditing = () => {
    setActiveAnime({ ...tmpAnime })
    setIsEditing(false)
  }

  const cancelEditing = () => {
    setTmpAnime({ ...activeAnime })
    setIsEditing(false)
  }

  return (
    <>
      <SimpleBreadcrumbs
        title={activeAnime?.title}
        setModalIsOpen={setModalIsOpen}
      />
      <div className={classes.buttons}>
        {!isEditing && <EditButton onClick={() => setIsEditing(true)} />}
        {isEditing && (
          <>
            <SaveButton onClick={saveEditing} />
            <CancelButton onClick={cancelEditing} />
          </>
        )}
      </div>

      <form className={classes.root} noValidate autoComplete='off'>
        <div>
          <TextField
            required
            label='title / Required'
            name='title'
            value={tmpAnime?.title}
            onChange={(e) => onChangeHandler(e)}
            InputProps={{
              readOnly: !isEditing
            }}
          />
          <TextField
            required
            label='imgLink / Required'
            name='imgLink'
            value={tmpAnime?.imgLink}
            onChange={(e) => onChangeHandler(e)}
            InputProps={{
              readOnly: !isEditing
            }}
          />
          <TextField
            id='standard-read-only-input'
            label='Read Only'
            defaultValue='Hello World'
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            id='standard-number'
            label='Number'
            type='number'
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField id='standard-search' label='Search field' type='search' />
          <TextField
            id='standard-helperText'
            label='Helper text'
            defaultValue='Default Value'
            helperText='Some important text'
          />
        </div>
        <div>
          <TextField
            required
            id='outlined-required'
            label='Required'
            defaultValue='Hello World'
            variant='outlined'
          />
          <TextField
            disabled
            id='outlined-disabled'
            label='Disabled'
            defaultValue='Hello World'
            variant='outlined'
          />
          <TextField
            id='outlined-password-input'
            label='Password'
            type='password'
            autoComplete='current-password'
            variant='outlined'
          />
          <TextField
            id='outlined-read-only-input'
            label='Read Only'
            defaultValue='Hello World'
            InputProps={{
              readOnly: true
            }}
            variant='outlined'
          />
          <TextField
            id='outlined-number'
            label='Number'
            type='number'
            InputLabelProps={{
              shrink: true
            }}
            variant='outlined'
          />
          <TextField
            id='outlined-search'
            label='Search field'
            type='search'
            variant='outlined'
          />
          <TextField
            id='outlined-helperText'
            label='Helper text'
            defaultValue='Default Value'
            helperText='Some important text'
            variant='outlined'
          />
        </div>
      </form>

      <Modal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        activeAnime={activeAnime}
      />
    </>
  )
}

export default AnimeDetail
