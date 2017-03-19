var express = require('express'),
    app = express(),
    router = express.Router(),
    adminData = require('../model/adminregister'),
    SubDomain = require('../model/subdomain'),
    admin = new adminData();

router.post('/register', function(req, res) {
    console.log('inside save controller');
    var adminDetails = {
        username: req.body.username,
        password: req.body.password,
        emailAddress: req.body.emailAddress
    }
    console.log(adminDetails);
    // display saved user
    admin.save(adminDetails, function(error, data) {
        if (error) {
            res.send(error)
        } else {
            res.json(data)
        }
    });
});

router.post('/register/domain', function(req, res) {
    console.log('inside save controller');
    var domain;
    domain = {
        emailAddress: req.body.emailAddress,
        subDomain: req.body.subDomain
    };
    console.log(domain);
    admin.adminSetDomain(domain, function(err, data) {
        if (err) {
            res.send(err)
        } else {
            console.log(data);
            res.json(data)
        }
    });
});


module.exports = router;
