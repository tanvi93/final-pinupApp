var mongoose = require('mongoose'),
express = require('express'),
    app = express(),
    cookieParser = require('cookie-parser'),
    cookie = require('cookie'),
    Schema = mongoose.Schema,
    util = require("util"),
    EventEmitter = require("events").EventEmitter,
    abstractSchema = require('./abstract').BaseSchema;

app.use(cookieParser("hello"));
var visitorSchema = new abstractSchema({
    device: String,
    browser: String,
    date: Date,
    flag : Number
    // visitorID
        // reocuuringCount : Number
});
//
// if (!visitorSchema.options.toObject) visitorSchema.options.toObject = {};
// visitorSchema.options.toObject.transform = function(doc, ret, options) {
//     // remove the _id of every document before returning the result
//     ret.visitorID = ret._id;
//     delete ret._id;
//     delete ret.__v;
//     return ret;
// };

var visit = mongoose.model('visit', visitorSchema);

function Details() {
    EventEmitter.call(this);
}

util.inherits(Details, EventEmitter);

Details.prototype.savenow = function(data, cb) {
  console.log('in savenoew funct : '+ data );
    var visitors = new visit(data);
    console.log(visitors);
    visitors.save(function(error, result) {
        if (error) {
            return cb(error, null);
        }
        else {
          console.log('res' + result);
            return cb(null, result);
        }
    });
};

Details.prototype.findId = function(cb) {
visit.findOne({}).sort({_id : -1}).exec(function(error, result) {
      if (error) {
          return cb(error, null);
      }
      else {
        console.log('res' + result);
          return cb(null, result);
      }
  });

};



module.exports = new Details;
