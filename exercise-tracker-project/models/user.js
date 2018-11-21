var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new Schema({
  username: {type: String, unique: true, required: [true, "can't be blank"], index: true},
  count: Number,
  exercise: [{description: String, duration: String, date: String}]
});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

module.exports = mongoose.model('User', UserSchema);