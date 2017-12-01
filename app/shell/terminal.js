var _ = require('lodash');
var $ = jQuery = require('jquery');
jQuery.support.cors = true;

hterm.defaultStorage = new lib.Storage.Local();
var t = new hterm.Terminal();
var command = '';
var inputLineMarker = function(path) {
    return '(' + path + ') $ ';
};
var outputLineMarker = '>>> ';
var data = {
    'stdout': '',
    'stderr': '',
    'path': ''
};
String.prototype.fixNewline = function() {
    return this.replace(/\n/gm, '\n\r');
}

String.prototype.addLineMarker = function(marker) {
    return this.replace(/^(.+)$/gm, marker + ' $1');
}

String.prototype.pop = function() {
    return this.slice(0, -1);
}

function beautify(str) {
    return str.addLineMarker(outputLineMarker).fixNewline();
}
function toServer(str) {
    return str.replace('\r', '\n');
}
function backspace() {
    if (command.length > 0) {
        t.io.print('\b \b');            // writes space over the last character
        command = command.pop();        // removes the last written character
    }
}

function sendCommand(com) {
    t.io.println('');
    $.post(window.location.href, {'command': com+'\n'}, function(res){
        if(res.path) res.path = res.path.pop();
        data = res;
        console.log(data);
        t.io.print(beautify(data.stdout));
    }).then(function(){
        t.io.print(inputLineMarker(data.path));
    });
}

function newline() {
    if (command) {
        sendCommand(command);
        command = '';
    } else {
        t.io.println('');
        t.io.print(inputLineMarker(data.path));
    }
}

function log(str) {
    console.log(str.charCodeAt(0), str.charCodeAt(1));
}

var keys = {
    '\b': backspace,
    '\r': newline
}

t.onTerminalReady = function() {
    sendCommand('');
    const io = t.io.push();
    t.io.print(inputLineMarker(''));
    io.onVTKeystroke = (str) => {
        log(str);
        var fn = keys[str];
        if (fn)
            fn()
        else {
            command += str;
            t.io.print(str);
        }
    };
    io.sendString = io.onVTKeystroke;
};
t.decorate(document.querySelector('#terminal'));
t.installKeyboard();
t.io.println('Welcome to Eduardo Henke\'s Linux Machine!');
t.prefs_.set('cursor-blink', true);
t.prefs_.set('backspace-sends-backspace', true);
window.t = t;
