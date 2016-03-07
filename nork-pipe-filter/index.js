'use strict';
var inputFilter = require('./inputFilter.js');
var computeFilter = require('./computeFilter.js').computeFilter;
var start = require('./computeFilter.js').start;
var outputFilter = require('./outputFilter.js');


console.log("NORK\n" + start + "\nWhat's next?");
process.stdin.pipe(inputFilter)
    .pipe(computeFilter)
    .pipe(outputFilter)
    .pipe(process.stdout);