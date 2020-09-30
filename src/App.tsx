import React, { useState, useEffect } from 'react'
import { renderRoutes } from 'react-router-config'

import { db } from './firebase'
import { Anime } from './interface'
import routes from './router/routes'

const App = () => {
  const [allAnime, setAllAnime] = useState<Array<Anime>>([])

  useEffect(() => {
    db.collection('Animes')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setAllAnime(doc.data().allAnime)
        })
      })
  }, [])

  return <>{renderRoutes(routes, { allAnime })}</>
}

export default App
