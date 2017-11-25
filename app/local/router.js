var express = require('express')
    , router = express.Router()
    , localIP = '187.65.237.56'
    , localPort = 8000
    , request = require('request')
    , localURL = 'http://' + localIP + ':' + localPort;

function get(path, callback) {
    path = path || '';
    console.log(request.get(localURL+path, {timeout: 1000}, callback));
    
}

router.get('/', function(req, res) {
    console.log('Requesting ' + localURL);
    get('/', function(error, response){
        res.send(response.body);
    });
})

module.exports = router
