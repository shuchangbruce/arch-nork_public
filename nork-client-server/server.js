'use strict';
var net = require('net');
var server = net.createServer();
var gameLogic = require('../common/helper.js');
var game = new gameLogic();

//when the server is on,
//first show the start message
//then if there is data coming, processes it and outputs it
server.on('connection', function(socket) {
    socket.write(" " + game.startMessage());
    socket.on('data', function (data) {
        var answer = data.toString().replace(/\r?\n|\r/, '').toLowerCase().trim();
        var output = game.processAnswer(answer);
        socket.write(output);
        if(output.charAt(0) != 'n'){
            console.log("ha, close server");
            socket.end();
        }
    });

});

//when the server is on listing
//tell the client the listening is on
server.on('listening', function() {
    console.log('server listening on port ' + server.address().port);
});

server.listen(8000);