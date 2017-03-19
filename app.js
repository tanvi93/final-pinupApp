var express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    db = require('./app/model/db'),
    cookie = require('cookie-parser');



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));



app.use(require('./app/controllers'));
// clear cookie  using nodejs

var port = 3030;

app.listen(port, function() {
    db.connect();
    console.log('listening on port 3030');
});
