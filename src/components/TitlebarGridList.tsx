import React from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
// import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
// import InfoIcon from '@material-ui/icons/Info'
import EditIcon from '@material-ui/icons/Edit'
import { useHistory } from 'react-router-dom'

import { Anime } from '../interface'
// import FloatingActionEditButton from './FloatingActionEditButton'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper
    },
    gridList: {
      width: '100vw'
      // height: 450
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)'
    }
  })
)

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function TitlebarGridList({
  animeList
}: {
  animeList: Array<Anime>
}) {
  const classes = useStyles()
  const history = useHistory()

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        {/* <GridListTile key='Subheader' cols={2} style={{ height: 'auto' }}>
          <ListSubheader component='div'>December</ListSubheader>
        </GridListTile> */}
        {animeList.map((anime) => (
          <GridListTile key={anime.id} cols={0.4}>
            <img src={anime.imgLink} alt={anime.title} />
            <GridListTileBar
              title={`(${anime.rate})${anime.title}`}
              // subtitle={<span>by: {tile.author}</span>}
              actionIcon={
                <IconButton
                  aria-label={`info about ${anime.title}`}
                  className={classes.icon}
                  onClick={() => {
                    history.push(`/detail/${anime.id}`)
                  }}
                >
                  <EditIcon />
                </IconButton>
              }
            />
            {/* <GridListTileBar
              title={anime.title}
              // subtitle={<span>by: {tile.author}</span>}
              actionIcon={<FloatingActionEditButton />}
            /> */}
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}
