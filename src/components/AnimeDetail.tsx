import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'

import { Anime, AnimeDocProps } from '../interface'
import SimpleBreadcrumbs from './common/SimpleBreadcrumbs'
import EditButton from './common/Button/EditButton'
import SaveButton from './common/Button/SaveButton'
import CancelButton from './common/Button/CancelButton'
import DeleteButton from './common/Button/DeleteButton'
import DateAndTimePickers from './common/DateAndTimePickers'
import TypeChips from './common/TypeChips'
import Modal from './Modal'
import { checkAnime, allCheckIsPassed } from '../functions/checkAnime'
import { db } from '../firebase'
import { FormHelperText } from '@material-ui/core'

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
      baha: { link: '', episode: 0 },
      muse: { link: '', episode: 0 }
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
      baha: { link: '', episode: 0 },
      muse: { link: '', episode: 0 }
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
    if (!anime.timeArray) {
      anime.timeArray = []
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

  const saveEditing = async () => {
    if (allCheckIsPassed(checkAnime(tmpAnime))) {
      setActiveAnime(JSON.parse(JSON.stringify(tmpAnime)))
      setIsEditing(false)

      let copyAllAnime = JSON.parse(JSON.stringify(allAnime))
      for (let i = 0; i < copyAllAnime.length; i += 1) {
        if (tmpAnime.id === copyAllAnime[i].id) {
          copyAllAnime[i] = tmpAnime
          break
        }
      }
      const expiration: AnimeDocProps | undefined = await db
        .collection('Animes')
        .get()
        .then((querySnapshot) => {
          let result
          querySnapshot.forEach((doc) => {
            result = doc.data().expiration
          })
          return result
        })

      console.log(copyAllAnime)
      db.collection('Animes')
        .doc('allAnime')
        .set({ allAnime: copyAllAnime, expiration })
        .then(function () {
          console.log('Document successfully written!')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    }
  }

  const cancelEditing = () => {
    setTmpAnime(JSON.parse(JSON.stringify(activeAnime)))
    setIsEditing(false)
  }

  const deleteAnime = async () => {
    const target = JSON.parse(JSON.stringify(activeAnime))
    const doubleCheck = confirm(`你確定要刪除${target.title}嗎`)

    if (doubleCheck) {
      const target = JSON.parse(JSON.stringify(activeAnime))

      const allAnimeDoc: AnimeDocProps | undefined = await db
        .collection('Animes')
        .get()
        .then((querySnapshot) => {
          let result
          querySnapshot.forEach((doc) => {
            result = doc.data()
          })
          return result
        })
      const active = JSON.parse(JSON.stringify(allAnimeDoc!.allAnime))
      const expired = JSON.parse(JSON.stringify(allAnimeDoc!.expiration))

      let index = null
      for (let i = 0; i < active.length; i += 1) {
        if (target.id === active[i].id) {
          index = i
          break
        }
      }

      if (typeof index === 'number') {
        active.splice(index, 1)

        const newAnimeDoc = {
          expiration: [...expired, target],
          allAnime: active
        }
        console.log(newAnimeDoc)

        db.collection('Animes')
          .doc('allAnime')
          .set(newAnimeDoc)
          .then(function () {
            console.log('delete successfully!')
            window.location.reload()
          })
          .catch(function (error) {
            console.error('Error delete: ', error)
          })
      }
    }
  }

  return (
    <>
      <SimpleBreadcrumbs
        title={activeAnime?.title}
        setModalIsOpen={setModalIsOpen}
      />
      <div className={classes.buttons}>
        {!isEditing && (
          <>
            <EditButton onClick={() => setIsEditing(true)} />
            <DeleteButton onClick={deleteAnime} />
          </>
        )}
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
            error={!checkAnime(tmpAnime).title.isPass}
            helperText={
              !checkAnime(tmpAnime).title.isPass
                ? checkAnime(tmpAnime).title.text
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
            error={!checkAnime(tmpAnime).imgLink.isPass}
            helperText={
              !checkAnime(tmpAnime).imgLink.isPass
                ? checkAnime(tmpAnime).imgLink.text
                : 'Required*'
            }
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
            error={!checkAnime(tmpAnime).webLink.isPass}
            helperText={
              !checkAnime(tmpAnime).webLink.isPass
                ? checkAnime(tmpAnime).webLink.text
                : 'Required*'
            }
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
            error={!checkAnime(tmpAnime).episode.isPass}
            helperText={
              !checkAnime(tmpAnime).episode.isPass
                ? checkAnime(tmpAnime).episode.text
                : 'Required*'
            }
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
          <TextField
            required
            error={!checkAnime(tmpAnime).id.isPass}
            helperText={
              !checkAnime(tmpAnime).id.isPass
                ? checkAnime(tmpAnime).id.text
                : 'Required*'
            }
            label='id'
            id='id'
            name='id'
            value={tmpAnime?.id}
            onChange={(e) => onChangeHandler(e)}
            InputProps={{
              readOnly: !isEditing
            }}
          />
        </div>

        <TypeChips
          isEditing={isEditing}
          tmpAnime={tmpAnime}
          setTmpAnime={setTmpAnime}
        />

        <div>
          <FormControl
            variant='outlined'
            className={classes.formControl}
            error={!checkAnime(tmpAnime).day.isPass}
          >
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
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
            </Select>
            <FormHelperText>
              {!checkAnime(tmpAnime).day.isPass
                ? checkAnime(tmpAnime).day.text
                : ''}
            </FormHelperText>
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
            multiline
            error={!checkAnime(tmpAnime).introduction.isPass}
            helperText={
              !checkAnime(tmpAnime).introduction.isPass
                ? checkAnime(tmpAnime).introduction.text
                : 'Required*'
            }
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
            error={!checkAnime(tmpAnime).baha.isPass}
            helperText={
              !checkAnime(tmpAnime).baha.isPass
                ? checkAnime(tmpAnime).baha.text
                : ''
            }
            value={tmpAnime.video!.baha!.link}
            onChange={(e) => onChangeHandler(e)}
            InputProps={{
              readOnly: !isEditing
            }}
            variant='outlined'
          />
          <TextField
            type='number'
            error={!checkAnime(tmpAnime).baha.isPass}
            helperText={
              !checkAnime(tmpAnime).baha.isPass
                ? checkAnime(tmpAnime).baha.text
                : ''
            }
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
            error={!checkAnime(tmpAnime).muse.isPass}
            helperText={
              !checkAnime(tmpAnime).muse.isPass
                ? checkAnime(tmpAnime).muse.text
                : ''
            }
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
            error={!checkAnime(tmpAnime).muse.isPass}
            helperText={
              !checkAnime(tmpAnime).muse.isPass
                ? checkAnime(tmpAnime).muse.text
                : ''
            }
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
