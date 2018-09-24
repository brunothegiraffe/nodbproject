const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const cors = require('cors')
const apiController = require('./Controllers/apiController')

const app = express();
require('dotenv').config();
app.use(bodyParser.json());
app.use(cors());

let owned = [];


app.get('/api/igdb/games/:id', apiController.getIgdbGame)
app.get('/api/gb/games/:id', apiController.getGbGame)
app.get('/api/gb/search', apiController.searchGb)
app.get('/api/ownedList', apiController.getOwned)
app.post('/api/ownedList', apiController.addOwned)
app.delete('/api/removeFromOnwed/:id', apiController.removeFromOwned)

const port = 4001;
app.listen(port, console.log(`listening on port: ${port}`))