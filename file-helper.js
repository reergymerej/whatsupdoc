// TODO: This should be broken out into its own module.

'use strict';

var fs = require('fs'),
    path = require('path');

/**
* @param {String} [directory = process.cwd()]
* @param {String} [extension = 'js']
* @param {Boolean} [recursive]
* @return {Object} return
* @return {String} return.path
* @return {String} return.extension
* @return {String[]} return.files
*/
var getFilesSync = function (directory, extension, recursive) {

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
        if (recursive && stats.isDirectory()) {
            result = result.concat(
                getFilesSync(filePath, extension, recursive).files);
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
* @function getMatches
* @description Get matches for regex found in a file.
* @param {String} filePath
* @param {RegExp} regex
* @return {String[]}
*/
var getMatches = function (filePath, regex) {
    var matches = [];

    var file = fs.readFileSync(filePath, 'utf-8');

    if (file) {
        matches = file.match(regex) || [];
    }

    return matches;
};

exports.getFiles = getFilesSync;
exports.getMatches = getMatches;