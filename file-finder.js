'use strict';

var fs = require('fs'),
    path = require('path');

/**
* @name getFiles
* @description get an Array of file paths
* @param {String} directory the directory to search in
* @param {String} extension the extension to search for
* @param {String[]} [ignore] directories to ignore
* @return {String[]} return an Array of files
* @public
*/
var getFiles = function (directory, extension, ignore) {

    var result = [];
    var files;
    var regex;

    if (!directory || !extension) {
        throw new Error('missing arguments');
    }

    ignore = ignore || [];

    regex = new RegExp('\\.' + extension + '$', 'i');
    files = fs.readdirSync(directory);

    files.forEach(function (file) {
        var filePath = path.join(directory, file);
        var stats = fs.statSync(filePath);

        if (stats.isDirectory() && !isInList(file, ignore)) {
                result = result.concat(
                    getFiles(filePath, extension));
        } else {
            if (regex.test(file)) {
                result.push(filePath);
            }
        }
    });

    return result;
};

/**
* @name isInList
* @description see if a string is included in the items in a list
* @param {String} needle
* @param {String[]} haystack
* @return {Boolean}
*/
var isInList = function (needle, haystack) {
    return haystack.some(function (hay) {
        return hay.indexOf(needle) > -1;
    });
};

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

exports.getFiles = getFiles;
exports.getMatches = getMatches;
exports.readFileSync = readFileSync;