const User = require('../models/User')

const addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body

    const user = await User.findOne({ email })

    if (user) {
      const { likedMovies } = user

      const movieAlreadyLiked = likedMovies.find((m) => data.id === m.id)

      if (!movieAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        )
      } else {
        res.json({ msg: 'Movie already added to the liked list.' })
        return
      }
    } else {
      await User.create({ email, likedMovies: [data] })
    }
    res.json({ msg: 'Movie added successfully!' })
    return
  } catch (error) {
    return res.json({ msg: 'Error in adding movie' })
  }
}

const getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params

    const user = await User.findOne({ email })

    if (user) {
      res.json({ msg: 'success', movies: user.likedMovies })
      return
    } else {
      return res.json({ msg: 'User with given email not found.' })
    }
  } catch (error) {
    return res.json({ msg: 'Error in getting movies' })
  }
}

const removeMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body

    const user = await User.findOne({ email })

    //console.log(user)

    if (user) {
      const { likedMovies } = user

      const movieIndex = likedMovies.findIndex((l) => l.id === movieId)

      if (!movieIndex) {
        res.status(400).json({ msg: 'Movie not found' })
      }

      likedMovies.splice(movieIndex, 1)

      await User.findByIdAndUpdate(
        user._id,
        {
          likedMovies: likedMovies,
        },
        { new: true }
      )
      res.json({
        msg: 'Movie successfully removed.',
        movies: user.likedMovies,
      })
      return
    } else return res.json({ msg: 'User with given email not found.' })
  } catch (error) {
    console.log(error)
    return res.json({ msg: 'Error in deleting movies' })
  }
}

module.exports = { addToLikedMovies, getLikedMovies, removeMovies }
