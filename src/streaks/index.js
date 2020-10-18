import moment from 'moment'
import { User } from '../db/models/user'
import { handleStreakChange, createUserNotFound } from './helpers'

export const incrementStreak = message =>
	handleStreakChange(message, user => user.streak.days + 1)

export const decrementStreak = message =>
	handleStreakChange(message, user => Math.max(0, user.streak.days - 1))

export const setStreak = (message, streak) =>
	handleStreakChange(message, () => streak)

export const resetStreak = message => handleStreakChange(message, () => 0)

export const printStats = message =>
{
	const query = { name: message.author.tag }

	User.findOne(query, async function (error, user)
	{
		if(error || !user)
		{
			createUserNotFound(message, error)
		} else
		{
			// Collect user statistics
			// Calculate current streak
			const streak = `${user.streak.days} day${user.streak.days === 1 ? '' : 's'
				}`

			// Calculate date of last streak-setting command
			const lastModified = moment(user.streak.lastModified).format(
				'h:mm A MMMM Do, YYYY'
			)

			// Calculate longest streak
			const longestStreak = `${user.streak.longest} day${user.streak.longest === 1 ? '' : 's'
				}`

			// Calculate num of days since first streak-setting command
			const daysSinceFirstStreak = moment(user.streak.dateFirstSet).fromNow()

			await message.channel.send(
				createUserStatsMsg({
					user: message.author.tag,
					streak,
					lastModified,
					longestStreak,
					daysSinceFirstStreak
				}),
				{ code: true }
			)
		}
	})
}
