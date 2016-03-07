'use strict';
var stream = require('stream');
var outputFilter = new stream.Transform({
    transform(chunk, encoding, done){
        var output = chunk.toString();
        var result = output.charAt(0);
        output = output.substring(1);
        if(result == "l"){
            output += "\nYou lose. GAME OVER.";
        } else if(result == "w") {
            output += "\nYou win. GAME OVER";
        }else  {
            output += "\nWhat's next?";
        }
        this.push(output + "\n\n");
        done();
        if (result != "n") {
            process.exit();
        }
    },
    flush(done){
        done();
    }
});

module.exports = outputFilter;