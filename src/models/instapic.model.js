'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    mongoose.Promise = require('bluebird');
    const AuthorSchema = new Schema({
      userName: {
          type: String
      },
      fullName: {
          type: String
      }
})

const InstaPic = new Schema({
  instaCode: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  author: AuthorSchema,
  likeCount: {
      type: Number
  } 
}, {
  timestamps: true
});

module.exports = mongoose.model('InstaPic', InstaPic);
