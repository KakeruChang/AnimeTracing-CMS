import React, { FC, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

import { Anime } from '../interface'
import SimpleBreadcrumbs from './common/SimpleBreadcrumbs'
import SaveButton from './common/Button/SaveButton'
import Modal from './Modal'
import { addNewAnime } from '../firebase'
import { checkAnime, allCheckIsPassed } from '../functions/checkAnime'
import AnimeFormContent from './common/AnimeFormContent'

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

const AddNewAnime: FC = () => {
  const classes = useStyles()
  const history = useHistory()
  const [newAnime, setNewAnime] = useState<Anime>({
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

  const saveEditing = async () => {
    if (allCheckIsPassed(checkAnime(newAnime))) {
      addNewAnime({
        anime: newAnime,
        nextStep: () => {
          history.push('/')
          window.location.reload()
        }
      })
    } else {
      console.log('Adding is not complete')
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

      <AnimeFormContent
        anime={newAnime}
        setAnime={setNewAnime}
        isEditing={true}
      />

      <Modal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        activeAnime={newAnime}
      />
    </>
  )
}

export default AddNewAnime
