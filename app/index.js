var subdomain = require('express-subdomain');
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

var router = express.Router();
router.get('*', require('./local/router.js'))

app.use(subdomain('local', router));

app.get('/', function(req, res) {
    res.send('Homepage');
});

app.listen(port, function(){
    console.log('Listening on port: ' + port);
});