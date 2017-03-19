//
// Pipup Schema Base
//
var bcrypt = require('bcryptjs'),
    crypto = require('crypto'),
    mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator'),
    validate = require('mongoose-validate'),
    util = require('util');

require('mongoose-schema-jsonschema')(mongoose);

var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var AbstractSchema = function() {
    Schema.apply(this, arguments);
    this.add({
        createdAt: {
            type: Date
          //  default: Date.now
        },
        createdBy: {
            type: ObjectId,
            ref: 'admin'
        },
        updatedAt: {
            type: Date
            //  default : Date.now
        },
        updatedBy: {
            type: ObjectId,
            ref: 'admin'
        }

    });
};
// AbstractSchema.pre('save', function(next) {
//            if (this.isNew) {
//                var newDate = new Date;
//                if (createdAt) this[createdAt] = newDate;
//                if (updatedAt) this[updatedAt] = newDate;
//            } else if (this.isModified() && updatedAt) {
//                this[updatedAt] = new Date;
//            }
//            next();
//        });
util.inherits(AbstractSchema, Schema);

module.exports = {
    BaseSchema: AbstractSchema
};
