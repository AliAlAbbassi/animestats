const express = require('express')
const app = express()
const { PORT } = require('./env')
const cors = require('cors')
const malScraper = require('mal-scraper')

// middleware
app.use(express.json())
app.use(cors())

app.get('/watchlist/:username?/:after?/:type?', (req, res) => {
  const { username, after, type } = req.query
  try {
    malScraper
      .getWatchListFromUser(username, after, type)
      .then((data) => {
        res.send(data)
        console.log(data)
      })
      .catch((err) => {
        res.send(err)
      })
  } catch (error) {
    res.send({ error, msg: err })
    console.log(error)
  }
})

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
