'use strict';
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const _config = require('./config');

module.exports.connect = (cb) => {
  return mongoose.connect(_config.mongo.uri, {useNewUrlParser: true}, cb);
};

module.exports.disconnect = () => {
  return mongoose.disconnect();
};

module.exports.getMongoose = () => {
  this.disconnect();
  this.connect(() => console.log('Db connected successfully'));
  return mongoose;
};
