import moment from 'moment'
import { User } from '../db/models/user'
import { handleStreakChange, createUserNotFound } from './helpers'

export const incrementStreak = message =>
  handleStreakChange(message, user => user.streak.days + 1)

export const setStreak = (message, streak) =>
  handleStreakChange(message, () => streak)

export const resetStreak = message => handleStreakChange(message, () => 0)

export const showStreak = message => {
  const query = { name: message.author.tag }

  User.findOne(query, async function (error, user) {
    if (error || !user) {
      createUserNotFound(message, error)
    } else {
      const streak = user.streak.days
      const streakString = `${streak} day${streak === 1 ? '' : 's'}`
      const lastModified =
        moment(user.streak.lastModified).format(
          'MMMM Do YYYY, h:mm:ss a ZZ'
        ) + ' offset from UTC'

      await message.reply(
        `you are at \`${streakString}\`. Last updated ${lastModified}`
      )
    }
  })
}
