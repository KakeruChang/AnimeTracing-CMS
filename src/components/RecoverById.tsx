import React, { useEffect, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Chip, Paper } from '@material-ui/core'
import UndoIcon from '@material-ui/icons/Undo'

import { db } from '../firebase'
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
  const [active, setActive] = useState<Array<Anime>>([])

  useEffect(() => {
    db.collection('Animes')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const result = doc.data()
          setExpired(result.expiration)
          setActive(result.allAnime)
        })
      })
  }, [])
  const handleRecover = (anime: Anime) => {
    const confirmRecover = confirm(`你確定要復原${anime.title}嗎`)

    if (confirmRecover) {
      let index = null
      for (let i = 0; i < expired.length; i += 1) {
        if (anime.id === expired[i].id) {
          index = i
          break
        }
      }

      if (typeof index === 'number') {
        expired.splice(index, 1)

        const newAnimeDoc = {
          expiration: expired,
          allAnime: [...active, anime]
        }
        console.log(newAnimeDoc)
        db.collection('Animes')
          .doc('allAnime')
          .set(newAnimeDoc)
          .then(function () {
            console.log('recover successfully!')
            window.location.reload()
          })
          .catch(function (error) {
            console.error('Error recover: ', error)
          })
      }
    }
  }

  return (
    <Paper component='div' className={classes.root}>
      {expired.map((anime) => (
        <Chip
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
