'use strict';

var fs = require('fs'),
    path = require('path');

var ignore = ['node_modules', 'test'];

/**
* @name getFiles
* @description get an Array of file paths
* @param {String} [directory = process.cwd()] the directory to search in
* @param {String} [extension = 'js'] the extension to search for
* @param {Boolean} [recursive] search for files recursively
* @return {Object} return contains path, extension, and an Array of files
* @public
*/
var getFiles = function (directory, extension, recursive) {

    var files;
    var result = [];
    var regex;
    var i = 0;
    var max;
    var filePath;
    var stats;

    directory = directory || process.cwd();
    extension = extension || 'js';
    regex = new RegExp('\\.' + extension + '$', 'i');
    files = fs.readdirSync(directory);

    for (max = files.length; i < max; i++) {

        filePath = path.join(directory, files[i]);

        stats = fs.statSync(filePath);
        if (recursive && !isIgnore(files[i]) && stats.isDirectory()) {
                result = result.concat(
                    getFiles(filePath, extension, recursive).files);
        } else {
            if (regex.test(files[i])) {
                result.push(filePath);
            }
        }        
    }

    return {
        path: directory,
        extension: extension,
        files: result
    };
};

/**
* @name isIgnore
* @description check to see if a file or directory should be ignored
* @param {String} file path to file/dir
* @return {Boolean} ignored should this be ignored
* @private
*/
var isIgnore = function (file) {
    var ignored = false;
    ignore.forEach(function (item) {
        if (!ignored) {
            ignored = item.indexOf(file) > -1;
        }
    });
    return ignored;
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