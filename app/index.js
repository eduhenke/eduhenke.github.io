var subdomain = require('express-subdomain');
var express = require('express');
var app = express();
var router = express.Router();
var path    = require("path");
var port = process.env.PORT || 8080;
var series = require('middleware-flow').series;
var assetsPath = '/home/eduardo/projects/eduardohenke.com';
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

router.get('/shell', function(req, res){
    res.sendFile(path.join(__dirname, '/shell/index.html'));
});

app.use(express.static(assetsPath) ,subdomain('local', series(router, log, proxy(localURL), catchConnectionError)));

app.get('/', function(req, res) {
    res.send('Homepage');
});

app.listen(port, function(){
    console.log('Listening on port: ' + port);
});