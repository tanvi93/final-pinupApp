var express = require('express'),
    app = express(),
    router = express.Router(),
    UserList = require('../model/userregister'),
    user = new UserList();


router.post('/signin', function(req, res) {
    var login = {
        emailAddress: req.body.emailAddress
    };
    user.userLogin(login, function(err, data) {
        if (err) {
            res.send(err)
        } else {
            console.log(data);
            res.json(data)
        }
    });
});

module.exports = router;
