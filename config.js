'use strict';

var path = require('path'),
    fs = require('fs');

var defaultConfig = {
    default: true,
    docBlockRegex: /\/\*{2,}(.|[\r\n])+?\*\//g,
    extensions: ['js'],
    include: [],
    exclude: ['node_modules', 'test'],
    outputFile: 'README.md',
    template: 'template.txt',
    blockTemplate: 'block-template.txt'
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
    var config = {};
    var loadedConfig;
    var file = path.join(directory, FILENAME);
    var text;
    var keys;

    keys = Object.keys(defaultConfig);
    keys.forEach(function (key) {
        config[key] = defaultConfig[key];
    });

    try {
        text = fs.readFileSync(file, 'utf-8');
    } catch (e) {
        // no config file found, use default
    }

    if (text) {

        // Merge runtime config with settings.
        loadedConfig = JSON.parse(text);

        keys = Object.keys(loadedConfig);
        keys.forEach(function (key) {
            config[key] = loadedConfig[key];
        });
        delete config.default;
    }

    return config;
};

exports.getConfig = getConfig;
