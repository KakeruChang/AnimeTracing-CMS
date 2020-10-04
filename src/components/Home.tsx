import React, { FC } from 'react'

import { Anime } from '../interface'
import TitlebarGridList from './TitlebarGridList'
import PushOne from './PushOne'
import RecoverById from './RecoverById'

interface HomeProps {
  allAnime: Array<Anime>
}

const Home: FC<HomeProps> = ({ allAnime }) => (
  <>
    <PushOne />
    <TitlebarGridList animeList={allAnime} />
    <RecoverById />
  </>
)

export default Home
