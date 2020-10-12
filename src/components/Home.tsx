import React, { FC, Fragment, useMemo } from 'react'
import { format, add } from 'date-fns'
import { zhTW } from 'date-fns/locale'
import Divider from '@material-ui/core/Divider'

import { Anime } from '../interface'
import TitlebarGridList from './TitlebarGridList'
import AddOne from './AddOne'
import RecoverById from './RecoverById'

interface HomeProps {
  allAnime: Array<Anime>
}
interface animeListWeekdaysContent {
  [key: string]: {
    title: string
    list: Array<Anime>
  }
}
const Home: FC<HomeProps> = ({ allAnime }) => {
  const animeListWeekdays = useMemo(() => {
    const result: animeListWeekdaysContent = {
      '1': { title: '', list: [] },
      '2': { title: '', list: [] },
      '3': { title: '', list: [] },
      '4': { title: '', list: [] },
      '5': { title: '', list: [] },
      '6': { title: '', list: [] },
      '7': { title: '', list: [] }
    }

    for (let i = 1; i < 8; i += 1) {
      result[`${i}`].title = format(add(new Date(), { days: i }), 'iiii', {
        locale: zhTW
      })
    }

    allAnime.forEach((anime) => {
      result[anime.day].list.push(anime)
    })

    Object.keys(result).forEach((key) => {
      result[key].list.sort((a, b) => b.rate - a.rate)
    })

    return result
  }, [allAnime])

  return (
    <>
      <AddOne />
      <Divider />
      <h1>共{allAnime.length}部</h1>
      {Object.keys(animeListWeekdays).map((key) => (
        <Fragment key={key}>
          <Divider />
          <h2 style={{ textAlign: 'center' }}>
            {animeListWeekdays[key].title}
          </h2>
          <Divider />
          <TitlebarGridList animeList={animeListWeekdays[key].list} />
        </Fragment>
      ))}
      {/* <TitlebarGridList animeList={allAnime} /> */}
      <RecoverById />
    </>
  )
}

export default Home
