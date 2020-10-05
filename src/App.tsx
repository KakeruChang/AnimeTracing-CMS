import React, { useState, useEffect } from 'react'
import { renderRoutes } from 'react-router-config'

import { getAllAnime } from './firebase'
import { Anime } from './interface'
import routes from './router/routes'

const App = () => {
  const [allAnime, setAllAnime] = useState<Array<Anime>>([])

  useEffect(() => {
    getAllAnime().then((result: Anime[]) => {
      setAllAnime(result)
    })
  }, [])

  return <>{renderRoutes(routes, { allAnime })}</>
}

export default App
