import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'

import { Anime } from '../interface'
import SimpleBreadcrumbs from './common/SimpleBreadcrumbs'
import EditButton from './common/EditButton'
import SaveButton from './common/SaveButton'
import CancelButton from './common/CancelButton'
import DateAndTimePickers from './common/DateAndTimePickers'
import Modal from './Modal'

interface AnimeDetailProps {
  allAnime: Array<Anime>
  animeId: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(2),
        width: '45vw'
      }
    },
    formControl: {
      margin: theme.spacing(2),
      minWidth: 120
    },
    contentNumber: {
      '&.MuiTextField-root': {
        width: '150px'
      }
    },
    contentBoolean: {
      '&.MuiTextField-root': {
        width: '150px'
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
    title: '', //
    imgLink: '', //
    webLink: '', //
    day: '', //
    time: '', //
    timeArray: [],
    episode: 0, //
    startingDate: '', //
    id: '', //
    type: [],
    introduction: '', //
    isFavorite: false, //
    isReminding: false, //
    rate: 0, //
    video: {
      baha: { link: '', episode: 12 }, //
      muse: { link: '', episode: 12 } //
    }
  })
  const [tmpAnime, setTmpAnime] = useState<Anime>({
    title: '',
    imgLink: '',
    webLink: '',
    day: '',
    time: '',
    timeArray: [],
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
          initializeAnime(allAnime[i])
          setActiveAnime(JSON.parse(JSON.stringify(allAnime[i])))
          setTmpAnime(JSON.parse(JSON.stringify(allAnime[i])))
          // setActiveAnime({ ...allAnime[i] })
          // setTmpAnime({ ...allAnime[i] })
        }
      }
      if (!trigger) {
        history.push('/')
      }
    }
  }, [allAnime])

  const initializeAnime = (anime: Anime) => {
    if (!anime.video) {
      anime.video = {
        baha: { link: '', episode: 0 },
        muse: { link: '', episode: 0 }
      }
    } else {
      if (!anime.video.baha) {
        anime.video.baha = { link: '', episode: 0 }
      }
      if (!anime.video.muse) {
        anime.video.muse = { link: '', episode: 0 }
      }
    }
  }

  const onChangeHandler = (
    event: ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | {
          name?: string
          value: unknown
          id?: string
        }
    >
  ) => {
    let copy = { ...tmpAnime }

    if (event.target.name === 'video') {
      let site: string
      let type: string

      if (event.target.id!.indexOf('baha') !== -1) {
        site = 'baha'
      } else {
        site = 'muse'
      }

      if (event.target.id!.indexOf('link') !== -1) {
        type = 'link'
      } else {
        type = 'episode'
      }

      copy[event.target.name]![site][type] = event.target.value
    } else {
      copy[event.target.name!] = event.target.value
    }

    setTmpAnime(copy)
  }

  const saveEditing = () => {
    setActiveAnime(JSON.parse(JSON.stringify(tmpAnime)))
    setIsEditing(false)
  }

  const cancelEditing = () => {
    setTmpAnime(JSON.parse(JSON.stringify(activeAnime)))
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
            error={tmpAnime?.title.length === 0}
            required
            helperText={
              tmpAnime?.title.length === 0
                ? 'Title can not be empty'
                : 'Required*'
            }
            label='title'
            id='title'
            name='title'
            value={tmpAnime?.title}
            onChange={(e) => onChangeHandler(e)}
            InputProps={{
              readOnly: !isEditing
            }}
          />
          <TextField
            required
            helperText='Required*'
            label='imgLink'
            id='imgLink'
            name='imgLink'
            value={tmpAnime?.imgLink}
            onChange={(e) => onChangeHandler(e)}
            InputProps={{
              readOnly: !isEditing
            }}
          />
          <TextField
            required
            helperText='Required*'
            label='webLink'
            id='webLink'
            name='webLink'
            value={tmpAnime?.webLink}
            onChange={(e) => onChangeHandler(e)}
            InputProps={{
              readOnly: !isEditing
            }}
          />
          <TextField
            type='number'
            className={classes.contentNumber}
            required
            helperText='Required*'
            label='episode'
            id='episode'
            name='episode'
            value={tmpAnime?.episode}
            onChange={(e) => onChangeHandler(e)}
            InputProps={{
              readOnly: !isEditing
            }}
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField id='standard-search' label='Search field' type='search' />
          <TextField
            required
            helperText='Required*'
            label='id'
            id='id'
            name='id'
            value={tmpAnime?.id}
            onChange={(e) => onChangeHandler(e)}
            InputProps={{
              readOnly: !isEditing
            }}
          />

          <FormControl variant='outlined' className={classes.formControl}>
            <InputLabel htmlFor='day'>day</InputLabel>
            <Select
              value={tmpAnime.day}
              onChange={(e) => onChangeHandler(e)}
              label='day'
              name='day'
              id='day'
              inputProps={{
                readOnly: !isEditing
                //   name: 'day',
                //   id: 'day'
              }}
            >
              {/* <option aria-label='None' value='' /> */}
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
            </Select>
          </FormControl>

          <TextField
            className={classes.contentNumber}
            helperText='hh mm/ ex: 09 30'
            label='time'
            id='time'
            name='time'
            value={tmpAnime.time}
            onChange={(e) => onChangeHandler(e)}
            InputProps={{
              readOnly: !isEditing
            }}
            variant='outlined'
          />
          <TextField
            className={classes.contentNumber}
            helperText='YYYY MM DD'
            label='startingDate'
            id='startingDate'
            name='startingDate'
            value={tmpAnime.startingDate}
            onChange={(e) => onChangeHandler(e)}
            InputProps={{
              readOnly: !isEditing
            }}
            variant='outlined'
          />
        </div>

        <div>
          <DateAndTimePickers
            isEditing={isEditing}
            tmpAnime={tmpAnime}
            setTmpAnime={setTmpAnime}
          />
        </div>

        <div>
          <TextField
            required
            helperText='Required*'
            label='introduction'
            id='introduction'
            name='introduction'
            value={tmpAnime?.introduction}
            onChange={(e) => onChangeHandler(e)}
            InputProps={{
              readOnly: !isEditing
            }}
            variant='outlined'
          />
          <TextField
            type='number'
            className={classes.contentNumber}
            required
            helperText='Required*'
            label='rate'
            id='rate'
            name='rate'
            value={tmpAnime?.rate}
            onChange={(e) => onChangeHandler(e)}
            InputProps={{
              readOnly: !isEditing
            }}
            InputLabelProps={{
              shrink: true
            }}
            variant='outlined'
          />
          <TextField
            disabled
            className={classes.contentBoolean}
            helperText='Disabled*'
            label='isFavorite'
            id='isFavorite'
            defaultValue={tmpAnime?.isFavorite}
            variant='outlined'
          />
          <TextField
            disabled
            className={classes.contentBoolean}
            helperText='Disabled*'
            label='isReminding'
            id='isReminding'
            defaultValue={tmpAnime?.isReminding}
            variant='outlined'
          />
          <TextField
            label='baha-link'
            id='baha-link'
            name='video'
            value={tmpAnime.video!.baha!.link}
            onChange={(e) => onChangeHandler(e)}
            InputProps={{
              readOnly: !isEditing
            }}
            variant='outlined'
          />
          <TextField
            type='number'
            className={classes.contentNumber}
            label='baha-episode'
            id='baha-episode'
            name='video'
            value={tmpAnime.video!.baha!.episode}
            onChange={(e) => onChangeHandler(e)}
            InputProps={{
              readOnly: !isEditing
            }}
            variant='outlined'
          />
          <TextField
            label='muse-link'
            id='muse-link'
            name='video'
            value={tmpAnime.video?.muse?.link}
            onChange={(e) => onChangeHandler(e)}
            InputProps={{
              readOnly: !isEditing
            }}
            variant='outlined'
          />
          <TextField
            type='number'
            className={classes.contentNumber}
            label='muse-episode'
            id='muse-episode'
            name='video'
            value={tmpAnime.video?.muse?.episode}
            onChange={(e) => onChangeHandler(e)}
            InputProps={{
              readOnly: !isEditing
            }}
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
