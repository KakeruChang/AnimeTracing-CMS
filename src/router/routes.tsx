import React from 'react'
import { RouteConfig } from 'react-router-config'
import { Redirect } from 'react-router'

import Home from '../components/Home'
import AnimeDetail from '../components/AnimeDetail'
import AddNewAnime from '../components/AddNewAnime'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: (route: RouteConfig) => <Home allAnime={route.allAnime} />,
    exact: true
  },
  {
    path: '/detail/:id',
    component: (route: RouteConfig) => (
      <AnimeDetail
        allAnime={route.allAnime}
        setAllAnime={route.setAllAnime}
        animeId={route.match.params.id}
      />
    )
  },
  {
    path: '/add',
    component: (route: RouteConfig) => (
      <AddNewAnime allAnime={route.allAnime} setAllAnime={route.setAllAnime} />
    )
  },
  {
    path: '*',
    exact: true,
    component: () => {
      return <Redirect to='/' />
    }
  }
]

export default routes
