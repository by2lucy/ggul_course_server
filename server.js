// protocols to create server 

var express = require('express'),
  app = express(),
  port = process.env.PORT || 80,
  mongoose = require('mongoose'),
  contact_model = require('./api/models/contactModel'),
  score_model = require('./api/models/scoreModel'),
  bodyParser = require('body-parser');

// DB연결 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mc_week2',{ useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 라우팅
var contact_routes = require('./api/routes/contactRoutes'),
  score_routes =require('./api/routes/scoreRoutes');
  
contact_routes(app);
score_routes(app);

app.listen(port);

console.log('RESTful API server started on: ' + port);


