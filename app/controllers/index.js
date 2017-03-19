var express = require('express'),
    app = express(),
    router = express.Router(),
    visitors = require('./visitors').visitor;



router.use(visitors({}));
// router.use('/user', require('./visitors'));
router.use('/admin', require('./adminregister'));
router.use('/admin', require('./signin'));
// router.use('/admin', require('./demo'));
router.use('/user', require('./userregister'));
router.use('/user', require('./userlogin'));


// router.get('/', function(req, res) {
//     res.send('This is main controller');
// });


module.exports = router;
