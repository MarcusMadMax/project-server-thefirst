//this is a Node Express server
const express = require('express')
var bodyParser = require('body-parser')
var logger = require('morgan')
var cors = require('cors')
var mongoose = require('mongoose')

var Project = require('./project-model')

//setup express server
var app = express()
app.use(cors())
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(logger('dev'))

//setup database connection
var connectionString = 'mongodb://madmax:Zephyr01@cluster0-shard-00-00.m0spy.mongodb.net:27017,cluster0-shard-00-01.m0spy.mongodb.net:27017,cluster0-shard-00-02.m0spy.mongodb.net:27017/demo?ssl=true&replicaSet=atlas-ymcujz-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(connectionString, { useNewUrlParser: true });
var db = mongoose.connection;
db.once('open', () => console.log('Database connected'));
db.on('error', () => console.log('Database error'));

//setup routes
var router = express.Router();

router.get('/testing', (req, res) => {
    res.send('<h1>Old stuff</h1>')
})

router.get('/projects', (req, res) => {
    Project.find()
        .then((projects) => {
            res.json(projects);
        })
})

router.get('/projects/:id', (req, res) => {
    Project.findOne({ id: req.params.id })
        .then((project) => {
            res.json(project)
        })
})

router.post('/projects', (req, res) => {
 
    var project = new Project()
    project.id = Date.now()
    
    var data = req.body
    console.log(data)
    Object.assign(project,data)
    project.save()
    .then((project) => {
        res.json(project)
    })
    
  })
  



//use server to serve up routes
app.use('/api', router);

// launch our backend into a port
const apiPort = 3001;
app.listen(apiPort, () => console.log('Listening on port ' + apiPort));