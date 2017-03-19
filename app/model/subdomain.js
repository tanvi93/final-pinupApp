var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SubDomainSchema = new Schema({
    subDomain: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    }
});

var SubDomain = mongoose.model('SubDomain', SubDomainSchema);
module.exports = SubDomain;
