var express = require("express")
var app = express()
var path = require('path')



app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/:param', function (req, res) {
  
  var date_unix = null;
  var date_natural = null;
  var date_options = { year: 'numeric', month: 'long', day: 'numeric' };

  if (/^\d{13}$/.test(req.params.param)) {
    date_unix = req.params.param
    date_natural = new Date(parseInt(req.params.param)).toLocaleDateString('en-US', date_options)
  } else {
    date_unix = Date.parse(req.params.param)
    if (date_unix) {
      date_natural = new Date(Date.parse(req.params.param)).toLocaleDateString('en-US', date_options)
    } 
  } 
  
  const date_json = {
    "unix": date_unix,
    "natural": date_natural
  }
  
  res.json(date_json)
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})