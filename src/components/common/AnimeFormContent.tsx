import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  KeyboardEvent
} from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormHelperText
} from '@material-ui/core'

import DateAndTimePickers from './DateAndTimePickers'
import TypeChips from './TypeChips'
import { checkAnime } from '../../functions/checkAnime'
import { Anime } from '../../interface'

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

interface AnimeFormContentProps {
  anime: Anime
  setAnime: Dispatch<SetStateAction<Anime>>
  isEditing: boolean
}

export default function AnimeFormContent({
  anime,
  setAnime,
  isEditing
}: AnimeFormContentProps) {
  const classes = useStyles()

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
    let copy = { ...anime }

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

    setAnime(copy)
  }

  const generateId = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode == 13 && anime.id.length === 0) {
      let copy = { ...anime }

      copy.id = btoa(escape(anime.title))

      setAnime(copy)
    }
  }

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <div>
        <TextField
          error={!checkAnime(anime).title.isPass}
          helperText={
            !checkAnime(anime).title.isPass
              ? checkAnime(anime).title.text
              : 'Required*'
          }
          required
          label='title'
          id='title'
          name='title'
          value={anime.title}
          onKeyDown={(e) => generateId(e)}
          onChange={(e) => onChangeHandler(e)}
          InputProps={{
            readOnly: !isEditing
          }}
        />
        <TextField
          error={!checkAnime(anime).imgLink.isPass}
          helperText={
            !checkAnime(anime).imgLink.isPass
              ? checkAnime(anime).imgLink.text
              : 'Required*'
          }
          required
          label='imgLink'
          id='imgLink'
          name='imgLink'
          value={anime.imgLink}
          onChange={(e) => onChangeHandler(e)}
          InputProps={{
            readOnly: !isEditing
          }}
        />
        <TextField
          required
          error={!checkAnime(anime).webLink.isPass}
          helperText={
            !checkAnime(anime).webLink.isPass
              ? checkAnime(anime).webLink.text
              : 'Required*'
          }
          label='webLink'
          id='webLink'
          name='webLink'
          value={anime.webLink}
          onChange={(e) => onChangeHandler(e)}
          InputProps={{
            readOnly: !isEditing
          }}
        />
        <TextField
          type='number'
          error={!checkAnime(anime).episode.isPass}
          helperText={
            !checkAnime(anime).episode.isPass
              ? checkAnime(anime).episode.text
              : 'Required*'
          }
          className={classes.contentNumber}
          required
          label='episode'
          id='episode'
          name='episode'
          value={anime.episode}
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
          error={!checkAnime(anime).id.isPass}
          helperText={
            !checkAnime(anime).id.isPass
              ? checkAnime(anime).id.text
              : 'Required*'
          }
          label='id'
          id='id'
          name='id'
          value={anime.id}
          onChange={(e) => onChangeHandler(e)}
          onKeyDown={(e) => generateId(e)}
          InputProps={{
            readOnly: !isEditing
          }}
        />
      </div>

      <TypeChips
        isEditing={isEditing}
        tmpAnime={anime}
        setTmpAnime={setAnime}
      />

      <div>
        <FormControl
          variant='outlined'
          className={classes.formControl}
          error={!checkAnime(anime).day.isPass}
        >
          <InputLabel htmlFor='day'>day</InputLabel>
          <Select
            value={anime.day}
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
            {!checkAnime(anime).day.isPass ? checkAnime(anime).day.text : ''}
          </FormHelperText>
        </FormControl>

        <TextField
          className={classes.contentNumber}
          error={!checkAnime(anime).time.isPass}
          helperText={
            !checkAnime(anime).time.isPass
              ? checkAnime(anime).time.text
              : 'hh mm/ ex: 09 30'
          }
          label='time'
          id='time'
          name='time'
          value={anime.time}
          onChange={(e) => onChangeHandler(e)}
          InputProps={{
            readOnly: !isEditing
          }}
          variant='outlined'
        />
        <TextField
          className={classes.contentNumber}
          error={!checkAnime(anime).startingDate.isPass}
          helperText={
            !checkAnime(anime).startingDate.isPass
              ? checkAnime(anime).startingDate.text
              : 'YYYY MM DD'
          }
          label='startingDate'
          id='startingDate'
          name='startingDate'
          value={anime.startingDate}
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
          tmpAnime={anime}
          setTmpAnime={setAnime}
        />
      </div>

      <div>
        <TextField
          required
          multiline
          error={!checkAnime(anime).introduction.isPass}
          helperText={
            !checkAnime(anime).introduction.isPass
              ? checkAnime(anime).introduction.text
              : 'Required*'
          }
          label='introduction'
          id='introduction'
          name='introduction'
          value={anime.introduction}
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
          value={anime.rate}
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
          defaultValue={anime.isFavorite}
          variant='outlined'
        />
        <TextField
          disabled
          className={classes.contentBoolean}
          helperText='Disabled*'
          label='isReminding'
          id='isReminding'
          defaultValue={anime.isReminding}
          variant='outlined'
        />
        <TextField
          label='baha-link'
          id='baha-link'
          name='video'
          error={!checkAnime(anime).baha.isPass}
          helperText={
            !checkAnime(anime).baha.isPass ? checkAnime(anime).baha.text : ''
          }
          value={anime.video!.baha!.link}
          onChange={(e) => onChangeHandler(e)}
          InputProps={{
            readOnly: !isEditing
          }}
          variant='outlined'
        />
        <TextField
          type='number'
          error={!checkAnime(anime).baha.isPass}
          helperText={
            !checkAnime(anime).baha.isPass ? checkAnime(anime).baha.text : ''
          }
          className={classes.contentNumber}
          label='baha-episode'
          id='baha-episode'
          name='video'
          value={anime.video!.baha!.episode}
          onChange={(e) => onChangeHandler(e)}
          InputProps={{
            readOnly: !isEditing
          }}
          variant='outlined'
        />
        <TextField
          label='muse-link'
          id='muse-link'
          error={!checkAnime(anime).muse.isPass}
          helperText={
            !checkAnime(anime).muse.isPass ? checkAnime(anime).muse.text : ''
          }
          name='video'
          value={anime.video?.muse?.link}
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
          error={!checkAnime(anime).muse.isPass}
          helperText={
            !checkAnime(anime).muse.isPass ? checkAnime(anime).muse.text : ''
          }
          name='video'
          value={anime.video?.muse?.episode}
          onChange={(e) => onChangeHandler(e)}
          InputProps={{
            readOnly: !isEditing
          }}
          variant='outlined'
        />
      </div>
    </form>
  )
}
