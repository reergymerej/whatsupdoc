'use strict';

var fs = require('fs'),
    path = require('path');

/**
* @name getMatches
* @description Get matches for regex found in a file.
* @param {String} filePath
* @param {RegExp} regex
* @return {String[]}
* @public
*/
var getMatches = function (filePath, regex) {
    var matches = [];

    var file = fs.readFileSync(filePath, 'utf-8');

    if (file) {
        matches = file.match(regex) || [];
    }

    return matches;
};

/**
* @name readFileSync
* @description Reads a file's contents and creates it if it
* doesn't exist yet.
* @param {String} filePath
* @return {String}
* @public
*/
var readFileSync = function (filePath) {
    // open the file
    var fd = fs.openSync(filePath, 'a+');

    // create a buffer
    var fileSize = fs.fstatSync(fd).size;
    var buffer = new Buffer(fileSize + 1);

    // write to buffer
    var writtenBytes = fs.readSync(fd, buffer, 0, fileSize, 0);

    // get text
    var text = buffer.toString('utf-8', 0, writtenBytes);

    fs.closeSync(fd);

    return text;
};

exports.getMatches = getMatches;
exports.readFileSync = readFileSync;