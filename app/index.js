var subdomain = require('express-subdomain');
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

var localIP = '187.65.237.56',
    localPort = 8000,
    request = require('request'),
    proxy = require('express-http-proxy');
    localURL = localIP + ':' + localPort;

function log(req, res, next) {
    console.log('Requesting to: ' + localURL);
    next();
}

function catchConnectionError(err, req, res, next) {
    if (err) {
        console.log(err);
        res.status(500).send();
    } else {
        next();
    }
}

app.use(log, subdomain('local', proxy(localURL)), catchConnectionError);

app.get('/', function(req, res) {
    res.send('Homepage');
});

app.listen(port, function(){
    console.log('Listening on port: ' + port);
});