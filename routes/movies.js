const express = require('express')
const router = express.Router()
const Movie = require('../models/movie')

// Getting all
router.get('/get-all/', async (req, res) => {
  try {
    const movies = await Movie.find()
    res.json(movies)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/get-by-id/:id', getMovie, (req, res) => {
  res.json(res.movie)
})

// Creating one
router.post('/add-movie/', async (req, res) => {
  const movie = new Movie({
    name: req.body.name,
    img: req.body.img,
    summary: req.body.summary
  })
  try {
    const newMovie = await movie.save()
    res.status(201).json(newMovie)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

async function getMovie(req, res, next) {
  let movie
  try {
    movie = await Movie.findById(req.params.id)
    if (movie == null) {
      return res.status(404).json({ message: 'Cannot find movie' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.movie = movie
  next()
}

module.exports = router