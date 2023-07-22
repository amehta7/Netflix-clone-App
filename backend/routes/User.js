const express = require('express')
const {
  addToLikedMovies,
  getLikedMovies,
  removeMovies,
} = require('../controllers/User')

const router = express.Router()

router.post('/add', addToLikedMovies)
router.get('/liked/:email', getLikedMovies)
router.put('/remove', removeMovies)

module.exports = router
