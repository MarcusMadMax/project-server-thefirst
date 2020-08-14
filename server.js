//this is a Node Express server
const express = require('express')
var bodyParser = require('body-parser')
var logger = require('morgan')
var cors = require('cors')
var mongoose = require('mongoose')

//setup express server
var app = express()
app.use(cors())
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(logger('dev'))

//setup routes
var router = express.Router();
 
router.get('/testing', (req, res) => {
  res.send('<h1>Old stuff</h1>')
})


//use server to serve up routes
app.use('/api', router);
 
// launch our backend into a port
const apiPort = 3001;
app.listen(apiPort, () => console.log('Listening on port '+apiPort));