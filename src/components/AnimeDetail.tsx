import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import { Anime } from '../interface'
import SimpleBreadcrumbs from './common/SimpleBreadcrumbs'
import EditButton from './common/Button/EditButton'
import SaveButton from './common/Button/SaveButton'
import CancelButton from './common/Button/CancelButton'
import DeleteButton from './common/Button/DeleteButton'
import Modal from './Modal'
import { checkAnime, allCheckIsPassed } from '../functions/checkAnime'
import { saveEditedAnime, softDeleteAnime } from '../firebase'
import AnimeFormContent from './common/AnimeFormContent'

interface AnimeDetailProps {
  allAnime: Array<Anime>
  setAllAnime: Dispatch<SetStateAction<Array<Anime>>>
  animeId: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttons: {
      display: 'flex',
      justifyContent: 'space-around',
      '& > *': {
        margin: theme.spacing(1)
      }
    }
  })
)

const AnimeDetail: FC<AnimeDetailProps> = ({
  allAnime,
  setAllAnime,
  animeId
}) => {
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

  const saveEditing = async () => {
    if (allCheckIsPassed(checkAnime(tmpAnime))) {
      setActiveAnime(JSON.parse(JSON.stringify(tmpAnime)))
      setIsEditing(false)

      saveEditedAnime({ anime: tmpAnime })
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
      // let index = null
      // for (let i = 0; i < allAnime.length; i += 1) {
      //   if (target.id === allAnime[i].id) {
      //     index = i
      //     break
      //   }
      // }
      // if (typeof index === 'number') {
      //   const copy = JSON.parse(JSON.stringify(allAnime))
      //   copy.splice(index, 1)
      //   setAllAnime(copy)
      // }

      softDeleteAnime({
        anime: activeAnime,
        nextStep: () => {
          // history.push('/')
          window.location.reload()
        }
      })
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

      <AnimeFormContent
        anime={tmpAnime}
        setAnime={setTmpAnime}
        isEditing={isEditing}
      />

      <Modal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        activeAnime={activeAnime}
      />
    </>
  )
}

export default AnimeDetail
