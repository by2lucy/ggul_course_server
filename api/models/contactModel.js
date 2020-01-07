'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Contact_schema = new Schema({
    name: {
      type: String
    },
    phone_num: {
      type: String
    }
  });

module.exports = mongoose.model('Contacts', Contact_schema);