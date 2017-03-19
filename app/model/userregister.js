var express = require('express'),
    app = express(),
    expressJwt = require('express-jwt'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    util = require("util"),
    EventEmitter = require("events").EventEmitter,
    config = require('../config');

app.set('superSecret', config.secret);


var userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, '{PATH} is required.'], //match: /^[\w][\w\-\.]*[\w]$/i,
        match: [
            new RegExp('^[a-z0-9_.-]+$', 'i'),
            '{PATH} \'{VALUE}\' is not valid. Use only letters, numbers, underscore or dot.'
        ],
        minlength: 5,
        maxlength: 60
    },

    emailAddress: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        match: new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
    }
});

var user = mongoose.model('user', userSchema);

function UserList() {
    EventEmitter.call(this);
}

util.inherits(UserList, EventEmitter);

// UserList.prototype.all = function (cb) {
//     return user.find({}, function (err, data) {
//
//         return cb(data);
//     });
// };

UserList.prototype.save = function(userData, cb) {
    var userDetails = new user(userData);
    userDetails.save(function(error, data) {
        if (error) {
            return cb({
                success: false,
                message: 'User registerated failed'
            }, null)
        } else if (data) {
            return cb(null, {
                success: true,
                message: 'User registerated successful'
            });
        }
    });

};

UserList.prototype.domainName = function(domain, cb) {
    console.log(cb);

    user.findOne({
        emailAddress: domain.emailAddress
    }, function(err, user) {

        if (!user) {

            return cb(null, {
                authsuccess: false,
                description: 'User Authentication failed because user not found'
            });
        } else if (user) {
            if (domain.subDomain == "") {
                return cb({
                    "success": false,
                    "message": "Domain name registerated failed"
                }, null)
            } else {
                var subdomainName = domain.subDomain;
                var resSubdomain = {
                    "success": true,
                    "domainRedirection": subdomainName,
                    "message": "Domain name registerated successful"

                }
                return cb(null, resSubdomain);
            }
        }
    });
};


UserList.prototype.userLogin = function(login, cb) {

    user.findOne({
        emailAddress: login.emailAddress
    }, function(err, user) {

        if (!user) {

            return cb(null, {
                authsuccess: false,
                description: 'User Authentication failed because user not found'
            });
        } else if (user) {
            console.log(user);
            var token = jwt.sign(user, app.get('superSecret'), {
                expiresIn: 86400 // expires in 24 hours
            });
            return cb({
                authsuccess: true,
                description: 'User logging in Successfully',
                token: token
            });
        }
    });
};





module.exports = UserList;
