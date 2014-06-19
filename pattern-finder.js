'use strict';

var fs = require('fs');

/**
* @name findPattern
* @description Find matches of a pattern in a file.
* @param {RegExp} pattern
* @param {String} file path to file
* @return {String[]}
*/
var findPattern = function (pattern, file) {
    var text = fs.readFileSync(file, 'utf-8');
    var matches = text.match(pattern);

    return matches || [];
};

exports.findPattern = findPattern;