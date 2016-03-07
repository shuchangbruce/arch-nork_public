'use strict';
var net = require('net');
var readline = require('readline');
var client = new net.Socket();

//makes the command line interactive
var io = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//when the client closes, exit everything
client.on('close', function() {
    console.log('Connection closed');
    process.exit();
});


var HOST = '127.0.0.1';
var PORT = 8000;

//connects to the server
client.connect(PORT, HOST, function() {
    console.log('Connected to: ' + HOST + ':' + PORT + '\n');

    //if the server passes data in to show
    client.on("data", function(data){
        var output = data.toString();
        var result = output.charAt(0); //if the game has no result, or lose or win
        output = output.substring(1); //the description
        if(result == "l"){
            output += "\nYou lose. GAME OVER.";
            client.end();
        } else if(result == "w") {
            output += "\nYou win. GAME OVER";
            client.end();
        }
        console.log(output + "\n");
        if(result != "l" && result != "w") { //if there is no end
            io.question("What would you do?\n", function(answer){
                client.write(answer);
            });
        }
    });
});