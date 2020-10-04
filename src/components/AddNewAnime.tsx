import React, { ChangeEvent, FC, useState, KeyboardEvent } from 'react'
import TextField from '@material-ui/core/TextField'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import { useHistory } from 'react-router-dom'

import { Anime, AnimeDocProps } from '../interface'
import SimpleBreadcrumbs from './common/SimpleBreadcrumbs'
import SaveButton from './common/Button/SaveButton'
import DateAndTimePickers from './common/DateAndTimePickers'
import TypeChips from './common/TypeChips'
import Modal from './Modal'
import { db } from '../firebase'
import { checkAnime, allCheckIsPassed } from '../functions/checkAnime'
import { FormHelperText } from '@material-ui/core'

interface AddNewAnimeProps {
  allAnime: Array<Anime>
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

const AddNewAnime: FC<AddNewAnimeProps> = ({ allAnime }) => {
  const classes = useStyles()
  const history = useHistory()
  const [newAnime, setNewAnime] = useState<Anime>({
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
      baha: { link: '', episode: 0 }, //
      muse: { link: '', episode: 0 } //
    }
  })
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const isEditing = true

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
    let copy = { ...newAnime }

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

    setNewAnime(copy)
  }

  const saveEditing = async () => {
    if (allCheckIsPassed(checkAnime(newAnime))) {
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

      db.collection('Animes')
        .doc('allAnime')
        .set({ allAnime: [...allAnime, newAnime], expiration })
        .then(function () {
          console.log('Document successfully written!')
          history.push('/')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    } else {
      console.log('not complete')
    }
  }

  const generateId = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode == 13 && newAnime.id.length === 0) {
      let copy = { ...newAnime }

      copy.id = btoa(escape(newAnime.title))

      setNewAnime(copy)
    }
  }

  return (
    <>
      <SimpleBreadcrumbs
        title={newAnime.title}
        setModalIsOpen={setModalIsOpen}
      />
      <div className={classes.buttons}>
        <SaveButton onClick={saveEditing} />
      </div>

      <form className={classes.root} noValidate autoComplete='off'>
        <div>
          <TextField
            error={!checkAnime(newAnime).title.isPass}
            helperText={
              !checkAnime(newAnime).title.isPass
                ? checkAnime(newAnime).title.text
                : 'Required*'
            }
            required
            label='title'
            id='title'
            name='title'
            value={newAnime.title}
            onKeyDown={(e) => generateId(e)}
            onChange={(e) => onChangeHandler(e)}
            InputProps={{
              readOnly: !isEditing
            }}
          />
          <TextField
            error={!checkAnime(newAnime).imgLink.isPass}
            helperText={
              !checkAnime(newAnime).imgLink.isPass
                ? checkAnime(newAnime).imgLink.text
                : 'Required*'
            }
            required
            label='imgLink'
            id='imgLink'
            name='imgLink'
            value={newAnime.imgLink}
            onChange={(e) => onChangeHandler(e)}
            InputProps={{
              readOnly: !isEditing
            }}
          />
          <TextField
            required
            error={!checkAnime(newAnime).webLink.isPass}
            helperText={
              !checkAnime(newAnime).webLink.isPass
                ? checkAnime(newAnime).webLink.text
                : 'Required*'
            }
            label='webLink'
            id='webLink'
            name='webLink'
            value={newAnime.webLink}
            onChange={(e) => onChangeHandler(e)}
            InputProps={{
              readOnly: !isEditing
            }}
          />
          <TextField
            type='number'
            error={!checkAnime(newAnime).episode.isPass}
            helperText={
              !checkAnime(newAnime).episode.isPass
                ? checkAnime(newAnime).episode.text
                : 'Required*'
            }
            className={classes.contentNumber}
            required
            label='episode'
            id='episode'
            name='episode'
            value={newAnime.episode}
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
            error={!checkAnime(newAnime).id.isPass}
            helperText={
              !checkAnime(newAnime).id.isPass
                ? checkAnime(newAnime).id.text
                : 'Required*'
            }
            label='id'
            id='id'
            name='id'
            value={newAnime.id}
            onChange={(e) => onChangeHandler(e)}
            onKeyDown={(e) => generateId(e)}
            InputProps={{
              readOnly: !isEditing
            }}
          />
        </div>

        <TypeChips
          isEditing={isEditing}
          tmpAnime={newAnime}
          setTmpAnime={setNewAnime}
        />

        <div>
          <FormControl
            variant='outlined'
            className={classes.formControl}
            error={!checkAnime(newAnime).day.isPass}
          >
            <InputLabel htmlFor='day'>day</InputLabel>
            <Select
              value={newAnime.day}
              onChange={(e) => onChangeHandler(e)}
              label='day'
              name='day'
              id='day'
              inputProps={{
                readOnly: !isEditing
              }}
            >
              {/* <option aria-label='None' value='' /> */}
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
            </Select>
            <FormHelperText>
              {!checkAnime(newAnime).day.isPass
                ? checkAnime(newAnime).day.text
                : ''}
            </FormHelperText>
          </FormControl>

          <TextField
            className={classes.contentNumber}
            helperText='hh mm/ ex: 09 30'
            label='time'
            id='time'
            name='time'
            value={newAnime.time}
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
            value={newAnime.startingDate}
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
            tmpAnime={newAnime}
            setTmpAnime={setNewAnime}
          />
        </div>

        <div>
          <TextField
            required
            multiline
            error={!checkAnime(newAnime).introduction.isPass}
            helperText={
              !checkAnime(newAnime).introduction.isPass
                ? checkAnime(newAnime).introduction.text
                : 'Required*'
            }
            label='introduction'
            id='introduction'
            name='introduction'
            value={newAnime.introduction}
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
            value={newAnime.rate}
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
            defaultValue={newAnime.isFavorite}
            variant='outlined'
          />
          <TextField
            disabled
            className={classes.contentBoolean}
            helperText='Disabled*'
            label='isReminding'
            id='isReminding'
            defaultValue={newAnime.isReminding}
            variant='outlined'
          />
          <TextField
            label='baha-link'
            id='baha-link'
            name='video'
            error={!checkAnime(newAnime).baha.isPass}
            helperText={
              !checkAnime(newAnime).baha.isPass
                ? checkAnime(newAnime).baha.text
                : ''
            }
            value={newAnime.video!.baha!.link}
            onChange={(e) => onChangeHandler(e)}
            InputProps={{
              readOnly: !isEditing
            }}
            variant='outlined'
          />
          <TextField
            type='number'
            error={!checkAnime(newAnime).baha.isPass}
            helperText={
              !checkAnime(newAnime).baha.isPass
                ? checkAnime(newAnime).baha.text
                : ''
            }
            className={classes.contentNumber}
            label='baha-episode'
            id='baha-episode'
            name='video'
            value={newAnime.video!.baha!.episode}
            onChange={(e) => onChangeHandler(e)}
            InputProps={{
              readOnly: !isEditing
            }}
            variant='outlined'
          />
          <TextField
            label='muse-link'
            id='muse-link'
            error={!checkAnime(newAnime).muse.isPass}
            helperText={
              !checkAnime(newAnime).muse.isPass
                ? checkAnime(newAnime).muse.text
                : ''
            }
            name='video'
            value={newAnime.video?.muse?.link}
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
            error={!checkAnime(newAnime).muse.isPass}
            helperText={
              !checkAnime(newAnime).muse.isPass
                ? checkAnime(newAnime).muse.text
                : ''
            }
            name='video'
            value={newAnime.video?.muse?.episode}
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
        activeAnime={newAnime}
      />
    </>
  )
}

export default AddNewAnime
