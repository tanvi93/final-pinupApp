var express = require('express'),
    app = express(),
    router = express.Router(),
    UserList = require('../model/userregister'),
    SubDomain = require('../model/subdomain'),
        visit12 = require('../model/visitors'),
    visit = require('./visitors').visitor,
    user = new UserList();
   var subdomainData= [];


router.post('/register', function(req, res) {
    // console.log('inside save controller');


    var userData = {
        username: req.body.username,
        emailAddress: req.body.emailAddress
    }
    // display saved user
    user.save(userData, function(error, data) {
        if (error) {
            console.log('fgf');
            res.json(error)
        } else {
          // visit12.findId(function(err,data1){
            //  console.log('in register' , data1);
          // findId
          // res.setHeader('Set-Cookie',data1._id);
          res.json(data);
          // });
        }
    });

});

router.get('/register/getUserSubDomainList', function(req, res) {
    SubDomain.find({}, function(err, data) {
        if (err) {
            res.send(err)
        } else {
          console.log(data);
            for(var i =0;i<data.length;i++){
            subdomainData[i] = data[i].subDomain;
            }
            res.json(subdomainData);
        }
    });
});

router.post('/register/setUserSubDomain', function(req, res) {
    var domain;
    domain = {
        emailAddress: req.body.emailAddress,
        subDomain:  req.body.subDomain
    };
    user.domainName(domain, function(err, data) {
        if (err) {
            res.send(err)
        } else {
            res.json(data)
            console.log(data);
        }
    });
});

module.exports = router;
