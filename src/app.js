require('./config/config');

//express
const express = require('express');
const app = express();

// path
const path = require('path');

// bodyParser
const bodyParser = require('body-parser');

// mongoose
const mongoose = require('mongoose');

// paths
const dirPublic = path.join(__dirname, "../public")
const dirNode_modules = path.join(__dirname, '../node_modules')

// static
app.use(express.static(dirPublic));

// bodyParser
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use(require('./routes/index'));

// connection
mongoose.connect('mongodb://localhost:27017/inscriptions', { useNewUrlParser: true }, (err, resp) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connection successful")
    }
});

console.log(__dirname);

// port
app.listen(process.env.PORT, () => {
    console.log('Server on port ' + process.env.PORT)
});