var express = require('express'),
    app = express(),
    expressJwt = require('express-jwt'),
    jwt = require('jsonwebtoken'),
    util = require('util'),
    EventEmitter = require('events').EventEmitter,
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    AbstractSchema = require('./abstract').BaseSchema,
    config = require('../config');

app.set('superSecret', config.secret);

var adminSchema = new AbstractSchema({
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
    password: {
        type: String,
        required: false, // Only required if local
        trim: true,
        match: new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/)
    },
    emailAddress: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        match: new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
    }
});

var admin = mongoose.model('admin', adminSchema);

function adminData() {
    EventEmitter.call(this);
}

util.inherits(adminData, EventEmitter);

adminData.prototype.save = function(adminDetails, cb) {
    var adm = new admin(adminDetails);
    adm.save(function(error, data) {
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

adminData.prototype.adminSetDomain = function(domain, cb) {
    console.log(cb);
    admin.findOne({
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

adminData.prototype.adminLogin = function(login, cb) {
    console.log(cb);
    admin.findOne({
        emailAddress: login.emailAddress
    }, function(err, user) {

        if (!user) {

            return cb(null, {
                authsuccess: false,
                description: 'User Authentication failed because user not found'
            });
        } else if (user) {
            if (user.password != login.password) {
                return cb({
                    authsuccess: false,
                    description: 'User Authentication failed because provided password is wrong.'
                });
            } else {
                var token = jwt.sign(user, app.get('superSecret'), {
                    expiresIn: 86400 // expires in 24 hours
                });

                //send the response to the caller with the accesstoken and data
                console.log('Authentication is done successfully.....');

                return cb({
                    authsuccess: true,
                    description: 'Admin logging in Successfully',
                    token: token
                });
            }
        }
    });
};



module.exports = adminData;
