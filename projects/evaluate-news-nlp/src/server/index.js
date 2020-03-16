/*dotenv*/
const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')
//const mockAPIResponse = require('./mockAPI.js')
var aylien = require("aylien_textapi");

// set aylien API credentias
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
  });

/*Dependency body parser*/
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/*cors*/
const cors = require('cors');
app.use(cors());
app.use(express.static('dist'))

projectData = {};

const app = express()

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})


//GET request 
app.get('/all', (req, res)=>{
    res.send(projectData)
});

// app.get('/test', function (req, res) {
//     res.send(mockAPIResponse)
// })

//POST request
app.post('/aylien',(req, res)=>{
    textapi.sentiment({
        url: req.body.url,
        mode: 'document'
      }, function(error, response) {
        if (error === null) {
          projectData["url"] = req.body.url;
          projectData["polarity"] = response.polarity;
          projectData["polarity_confidence"] = response.polarity_confidence;
          response.send(projectData);
        } else {
              console.log(error);
        }
          });
    });