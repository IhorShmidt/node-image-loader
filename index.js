'use strict';

const express = require('express');
const app = express();
// const config2 = require('./config/config2');
const request = require('request');

// Routing
app.use('/api', require('./src/api'));


// db connection and settings
const connection = require('./src/util/connection');
connection.getMongoose();



// create server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('listening at:', port);
});