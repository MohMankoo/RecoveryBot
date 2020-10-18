import mongoose, { Schema } from 'mongoose'

/**
 * A User has a `name`, which is a Discord user tag,
 * and a `streak` object, which tracks their recovery
 */
const userSchema = new Schema({
  name: { type: String, required: true, unique: true },
  streak: {
    days: { type: Number, min: 0, default: 0 },
    longest: { type: Number, min: 0, default: 0 },
    dateFirstSet: { type: Date, default: null },
    lastModified: { type: Date, default: Date.now }
  }
})

// Define methods for the User

/**
 * Set a new streak for the User
 * @param {Number} newStreak A number representing
 * the new streak
 */
userSchema.methods.setStreak = newStreak => {
  this.streak.days = newStreak
  this.streak.lastModified = Date.now()
  if (newStreak > this.streak.longest) this.streak.longest = newStreak
  if (!this.streak.dateFirstSet) this.streak.dateFirstSet = Date.now()
}

/**
 * A User resembles a Discord user.
 * It has a `username` and a `streak` object.
 */
export const User = mongoose.model('User', userSchema)
