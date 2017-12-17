'use strict';

const mongoose = require('mongoose');

// this is our schema to represent a post
const blogPostSchema = mongoose.Schema({
  title: {type: String, required: true},
  author: {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
  },
  content: {type: String, required: true},
  created: Date
});

// *virtuals*
// allow us to define properties on our object that manipulate
// properties that are stored in the database. Here we use it
// to generate a human readable string based on the name object
// we're storing in Mongo.
blogPostSchema.virtual('nameString').get(function() {
  return `${this.author.firtName} ${this.author.lastName}`.trim()});

  // this is an *instance method* which will be available on all instances
  // of the model. This method will be used to return an object that only
  // exposes *some* of the fields we want from the underlying data

blogPostSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
    name: this.nameString,
    content: this.content,
    crea
  };
}

// note that all instance methods and virtual properties on our
// schema must be defined *before* we make the call to `.model`.
const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = {BlogPost};
