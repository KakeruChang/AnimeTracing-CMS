export interface Anime {
  [key: string]: any
  title: string // SAO GBF ...etc
  imgLink: string // https://......
  webLink: string
  day: string // 1:Mon 2:Tue 3:Wed 4:Thu 5:Fri 6:Sat 7:Sun
  time: string // 24 00 (hh/mm)
  episode: number // default 12
  startingDate: string // YYYY DD MM ex.2020 07 01
  id: string // for key
  type: string[] // yy haremu ...etc
  introduction: string // ex: do not save the blue hair girl
  isFavorite: boolean
  isReminding: boolean
  rate: number // min:0.0 max:10.0
  video?: {
    baha?: { link: string; episode: number }
    muse?: { link: string; episode: number }
  }
}

export interface ButtonProps {
  onClick: () => void
}
