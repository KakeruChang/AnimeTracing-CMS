import {
  format,
  formatISO,
  add,
  sub,
  parseISO,
  parse,
  differenceInSeconds
} from 'date-fns'

import { Anime } from '../interface'

const countTime = (anime: Anime) => {
  const result: Array<string> = []

  // count the days between next displaying date
  let dayDiff = parseInt(anime.day, 10) - parseInt(format(new Date(), 'i'), 10)
  dayDiff = dayDiff < 0 ? dayDiff + 7 : dayDiff

  // deal with time over 24:00
  let displayingTimeISO
  if (parseInt(anime.time.replace(' ', ''), 10) > 2400) {
    displayingTimeISO = anime.time.replace(' ', '')
    dayDiff += 1
    const timeToNextDay = parseInt(displayingTimeISO, 10) % 2400
    const hourTimeToNextDay = Math.floor(timeToNextDay / 100)
    const minuteTimeToNextDay = timeToNextDay % 100
    displayingTimeISO = `${hourTimeToNextDay}:${minuteTimeToNextDay}`
  } else {
    // format to ISO
    displayingTimeISO = anime.time.replace(' ', '')
    const hourTime = Math.floor(parseInt(displayingTimeISO, 10) / 100)
    const minuteTime = parseInt(displayingTimeISO, 10) % 100
    displayingTimeISO = `${hourTime}:${minuteTime}`
  }

  // get the next displaying date
  const targetDayISO = format(add(new Date(), { days: dayDiff }), 'yyyy-MM-dd')
  const targetTimeISO = `${targetDayISO}T${displayingTimeISO}`
  const targetDateISO = parseISO(targetTimeISO)

  // substract 10 minutes from displaying time
  const beforeTenMinutes = sub(targetDateISO, { minutes: 10 })

  // count the remain of episode
  const startingDate = parse(anime.startingDate, 'yyyy MM d', new Date())
  const diffSecondsFromStarting = differenceInSeconds(new Date(), startingDate)
  const episodeNow = Math.ceil(diffSecondsFromStarting / (60 * 60 * 24 * 7))
  const episodeRemain = anime.episode - episodeNow

  // push the target date into result
  if (episodeRemain > 0) {
    for (let i = 0; i < episodeRemain; i += 1) {
      result.push(
        formatISO(add(beforeTenMinutes, { weeks: i })).replace(':00+08:00', '')
      )
    }
  }

  return result
}

export default countTime
