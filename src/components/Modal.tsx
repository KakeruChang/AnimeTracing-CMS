import React, { Dispatch, SetStateAction } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'

import { Anime } from '../interface'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    },
    img: {
      maxWidth: 500
    }
  })
)

export default function TransitionsModal({
  modalIsOpen,
  activeAnime,
  setModalIsOpen
}: {
  modalIsOpen: boolean
  activeAnime: Anime | null
  setModalIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  const classes = useStyles()

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      className={classes.modal}
      open={modalIsOpen}
      onClose={() => setModalIsOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={modalIsOpen}>
        <div className={classes.paper}>
          <img
            className={classes.img}
            src={activeAnime?.imgLink}
            alt={activeAnime?.title}
          />
        </div>
      </Fade>
    </Modal>
  )
}
