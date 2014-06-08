// TODO: This should be broken out into its own module.

'use strict';

var fs = require('fs');

/**
* @param {String} [path = process.cwd()]
* @param {String} [extension = 'js']
* @return {Object} return
* @return {String} return.path
* @return {String} return.extension
* @return {String[]} return.files
*/
var getFiles = function (path, extension) {

    var files;
    var result = [];
    var regex;
    var i = 0;
    var max;

    path = path || process.cwd();
    extension = extension || 'js';
    regex = new RegExp('\\.' + extension + '$', 'i');
    files = fs.readdirSync(path);

    for (max = files.length; i < max; i++) {
        if (regex.test(files[i])) {
            result.push(files[i]);
        }
    }

    return {
        path: path,
        extension: extension,
        files: result
    };
};

exports.getFiles = getFiles;