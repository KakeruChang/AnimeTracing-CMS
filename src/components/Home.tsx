import React, { FC } from 'react'

import { Anime } from '../interface'
import TitlebarGridList from '../components/TitlebarGridList'

interface HomeProps {
  allAnime: Array<Anime>
}

const Home: FC<HomeProps> = ({ allAnime }) => (
  <TitlebarGridList animeList={allAnime} />
)

export default Home
