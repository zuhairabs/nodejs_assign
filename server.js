
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const mongoose = require('mongoose')
const dbConfig = require('./config/database.config.js');


mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database '))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json({limit: '10mb'}))

app.use(express.json())

const movieRouter = require('./routes/movies')
app.use('/movies', movieRouter)


app.listen(3000, () => console.log('Server Started'))