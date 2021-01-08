const express = require('express');
const app = express();
require('dotenv').config()
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const bodyParser = require('body-parser');

var port = process.env.PORT || 3000;

var models = require('./api/models/models');
var collectVideos = require('./api/datafetch');

var routes = require('./api/routes/routes');

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://db/fampay', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to the database!");
})
.catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});
collectVideos();
//setInterval(collectVideos, 10000);

routes(app);

app.listen(port);
console.log("Server is running on port "+port);