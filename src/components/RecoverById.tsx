import React, { useEffect, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Chip, Paper } from '@material-ui/core'
import UndoIcon from '@material-ui/icons/Undo'

import { getExpiredAnime, recoverAnime } from '../firebase'
import { Anime } from '../interface'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      padding: theme.spacing(1),
      margin: theme.spacing(1)
    },
    chip: {
      margin: theme.spacing(1)
    }
  })
)

export default function RecoverById() {
  const classes = useStyles()
  const [expired, setExpired] = useState<Array<Anime>>([])

  useEffect(() => {
    async function getAnimeDocContent() {
      setExpired(await getExpiredAnime())
    }

    getAnimeDocContent()
  }, [])
  const handleRecover = (anime: Anime) => {
    const confirmRecover = confirm(`你確定要復原${anime.title}嗎`)

    if (confirmRecover) {
      recoverAnime({
        anime,
        nextStep: () => {
          window.location.reload()
        }
      })
    }
  }

  return (
    <Paper component='div' className={classes.root}>
      {expired.map((anime) => (
        <Chip
          className={classes.chip}
          label={anime.title}
          key={anime.id}
          onDelete={() => handleRecover(anime)}
          deleteIcon={<UndoIcon color='secondary' />}
          color='primary'
          variant='outlined'
        />
      ))}
    </Paper>
  )
}
