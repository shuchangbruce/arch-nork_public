'use strict';
var stream = require('stream');
var inputFilter = new stream.Transform({
    transform(chunk, encoding, done){
        var answer = chunk.toString().replace(/\r?\n|\r/, '').toLowerCase().trim();
        this.push(answer);
        done();
    },
    flush(done){
        done();
    }
});

module.exports = inputFilter;

