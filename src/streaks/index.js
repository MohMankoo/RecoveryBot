const moment = require('moment')
const { User } = require('../db/models/user')
const { handleStreakChange, handleDBError } = require('./helpers')

const updateStreak = message =>
  handleStreakChange(message, user => user.streak.days + 1)

const setStreak = (message, streak) =>
  handleStreakChange(message, user => streak)

const resetStreak = message => handleStreakChange(message, user => 0)

const showStreak = message => {
  const query = { name: message.author.tag }

  User.findOne(query, async function (error, user) {
    if (error || !user) {
      handleDBError(error)
    } else {
      const streak = user.streak.days
      const streakString = `${streak} day${streak === 1 ? '' : 's'}`
      const lastModified = moment(user.streak.lastModified).format(
        'MMMM Do YYYY, h:mm:ss a'
      )

      await message.channel.send(
        `${message.author.tag} is at \`${streakString}\`.` +
          ` Last updated ${lastModified} UTC`
      )
    }
  })
}

module.exports = {
  updateStreak,
  setStreak,
  resetStreak,
  showStreak
}
