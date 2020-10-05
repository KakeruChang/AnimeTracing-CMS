// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app'
import 'firebase/firestore'
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

import KEY from './key'
import { Anime } from '../interface'

const firebaseConfig = {
  apiKey: KEY.apiKey,
  authDomain: KEY.authDomain,
  databaseURL: KEY.databaseURL,
  projectId: KEY.projectId,
  storageBucket: KEY.storageBucket,
  messagingSenderId: KEY.messagingSenderId,
  appId: KEY.appId,
  measurementId: KEY.measurementId
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

const allAnimeDocRef = db.collection('Animes').doc('allAnime')

const getAnimeDoc = async () => {
  const animeDoc = await allAnimeDocRef
    .get()
    .then(function (doc) {
      if (doc.exists) {
        return doc.data()
      } else {
        console.log('No allAnime!')
        return { allAnime: [], expiration: [] }
      }
    })
    .catch((err) => {
      console.log('Get anime fail!', err)
      return { allAnime: [], expiration: [] }
    })

  return animeDoc
}

const getAllAnime = async () => {
  const allAnimeDoc = await getAnimeDoc()

  return allAnimeDoc?.allAnime
}

const getExpiredAnime = async () => {
  const allAnimeDoc = await getAnimeDoc()

  return allAnimeDoc?.expiration
}

interface animeActionParam {
  anime: Anime
  nextStep?: () => void
}

const addNewAnime = async ({ anime, nextStep }: animeActionParam) => {
  const allAnimeDoc = await getAnimeDoc()
  const expiration = allAnimeDoc?.expiration
  const allAnime = allAnimeDoc?.allAnime

  allAnimeDocRef
    .set({ allAnime: [...allAnime, anime], expiration })
    .then(function () {
      console.log('Add new anime successfully!')
      if (nextStep) nextStep()
    })
    .catch(function (error) {
      console.error('Error adding new anime: ', error)
    })
}

const saveEditedAnime = async ({ anime, nextStep }: animeActionParam) => {
  const allAnimeDoc = await getAnimeDoc()
  const expiration = allAnimeDoc?.expiration
  const allAnime = allAnimeDoc?.allAnime

  for (let i = 0; i < allAnime.length; i += 1) {
    if (anime.id === allAnime[i].id) {
      allAnime[i] = anime
      break
    }
  }

  allAnimeDocRef
    .set({ allAnime: allAnime, expiration })
    .then(function () {
      console.log('Anime successfully saved!')
      if (nextStep) nextStep()
    })
    .catch(function (error) {
      console.error('Error saving anime: ', error)
    })
}

const softDeleteAnime = async ({ anime, nextStep }: animeActionParam) => {
  const allAnimeDoc = await getAnimeDoc()
  const expiration = allAnimeDoc?.expiration
  const allAnime = allAnimeDoc?.allAnime

  let index = null
  for (let i = 0; i < allAnime.length; i += 1) {
    if (anime.id === allAnime[i].id) {
      index = i
      break
    }
  }

  if (typeof index === 'number') {
    allAnime.splice(index, 1)

    allAnimeDocRef
      .set({
        expiration: [...expiration, anime],
        allAnime
      })
      .then(function () {
        console.log('Delete successfully!')
        if (nextStep) nextStep()
      })
      .catch(function (error) {
        console.error('Error as deleting: ', error)
      })
  }
}

const recoverAnime = async ({ anime, nextStep }: animeActionParam) => {
  const allAnimeDoc = await getAnimeDoc()
  const expiration = allAnimeDoc?.expiration
  const allAnime = allAnimeDoc?.allAnime

  let index = null
  for (let i = 0; i < expiration.length; i += 1) {
    if (anime.id === expiration[i].id) {
      index = i
      break
    }
  }

  if (typeof index === 'number') {
    expiration.splice(index, 1)

    allAnimeDocRef
      .set({
        expiration,
        allAnime: [...allAnime, anime]
      })
      .then(function () {
        console.log('Recover successfully!')
        if (nextStep) nextStep()
      })
      .catch(function (error) {
        console.error('Error as recovering: ', error)
      })
  }
}

export {
  getAllAnime,
  getExpiredAnime,
  addNewAnime,
  saveEditedAnime,
  softDeleteAnime,
  recoverAnime
}
