'use strict';

var path = require('path'),
    fs = require('fs');

var defaultConfig = {
    default: true
};

var FILENAME = '.whatsupdocrc';

/**
* @name getConfig
* @description Get the config object, either from
* .whatsupdocrc or the default.
* @param {String} directory Where to look for config file.
* @return {Object}
*/
var getConfig = function (directory) {
    var config = defaultConfig;

    var file = path.join(directory, FILENAME);
    var text;

    try {
        text = fs.readFileSync(file, 'utf-8');
    } catch (e) {
        // no config file found, use default
    }

    if (text) {
        config = JSON.parse(text);
    }

    return config;
};

exports.getConfig = getConfig;
