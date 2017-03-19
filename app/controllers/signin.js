var express = require('express'),
    app = express(),
    router = express.Router(),
    adminData = require('../model/adminregister'),
    admin = new adminData();


router.post('/signin', function(req, res) {
    var login = {
        emailAddress: req.body.emailAddress,
        password: req.body.password
    };
    admin.adminLogin(login, function(err, data) {
        if (err) {
            res.send(err)
        } else {
            res.json(data)
        }
    });
});

module.exports = router;
