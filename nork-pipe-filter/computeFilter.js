'use strict';
var stream = require('stream');
var gameLogic = require('../common/helper.js');

var game = new gameLogic();
var computeFilter = new stream.Transform({
    transform(chunk, encoding, done){
        var answer = chunk.toString();
        this.push(game.processAnswer(answer));
        done();
    },
    flush(done) {
        done();
    }
});


module.exports.computeFilter = computeFilter;
module.exports.start = game.startMessage();