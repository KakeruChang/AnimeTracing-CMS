import { Anime } from '../interface'

interface CheckContentItem {
  isPass: boolean
  text: string
}
interface CheckContent {
  [key: string]: CheckContentItem
  id: CheckContentItem
  title: CheckContentItem
  imgLink: CheckContentItem
  webLink: CheckContentItem
  day: CheckContentItem
  episode: CheckContentItem
  introduction: CheckContentItem
  baha: CheckContentItem
  muse: CheckContentItem
}

export function checkAnime(anime: Anime) {
  const result: CheckContent = {
    id: { isPass: false, text: '' },
    title: { isPass: false, text: '' },
    imgLink: { isPass: false, text: '' },
    webLink: { isPass: false, text: '' },
    day: { isPass: false, text: '' },
    episode: { isPass: false, text: '' },
    introduction: { isPass: false, text: '' },
    baha: { isPass: false, text: '' },
    muse: { isPass: false, text: '' }
  }

  if (!anime.id || anime.id.length === 0) {
    result.id.text = 'id should be generated'
  } else {
    result.id.isPass = true
  }

  if (!anime.title || anime.title.length === 0) {
    result.title.text = 'Title can not be empty'
  } else {
    result.title.isPass = true
  }

  if (!anime.imgLink || anime.imgLink.length === 0) {
    result.imgLink.text = 'image link can not be empty'
  } else if (anime.imgLink.indexOf('http') === -1) {
    result.imgLink.text = 'image link should be a url'
  } else {
    result.imgLink.isPass = true
  }

  if (!anime.webLink || anime.webLink.length === 0) {
    result.webLink.text = 'web link can not be empty'
  } else if (anime.webLink.indexOf('http') === -1) {
    result.webLink.text = 'web link should be a url'
  } else {
    result.webLink.isPass = true
  }

  if (!anime.day || anime.day === '') {
    result.day.text = 'day should be chosen'
  } else {
    result.day.isPass = true
  }

  if (!anime.episode || anime.episode <= 0) {
    result.episode.text = 'episode should be inputted'
  } else {
    result.episode.isPass = true
  }

  if (!anime.introduction || anime.introduction.length === 0) {
    result.introduction.text = 'introduction should be inputted'
  } else {
    result.introduction.isPass = true
  }

  if (
    (anime.video?.baha?.episode! <= 0 && anime.video?.baha?.link.length! > 0) ||
    (anime.video?.baha?.episode! > 0 && anime.video?.baha?.link.length === 0)
  ) {
    result.baha.text = 'baha should both be inputted or empty'
  } else {
    result.baha.isPass = true
  }

  if (
    (anime.video?.muse?.episode! <= 0 && anime.video?.muse?.link.length! > 0) ||
    (anime.video?.muse?.episode! > 0 && anime.video?.muse?.link.length === 0)
  ) {
    result.muse.text = 'muse should both be inputted or empty'
  } else {
    result.muse.isPass = true
  }

  return result
}

export function allCheckIsPassed(content: CheckContent) {
  let result = true

  Object.keys(content).forEach((item) => {
    if (!content[item].isPass) {
      result = false
    }
  })

  return result
}
