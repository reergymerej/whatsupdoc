'use strict';

// TODO: Break this out into its own module.

var path = require('path'),
    mocha = require('mocha'),
    willy = require('willy'),
    will = willy.will,
    fileHelper = require('../file-helper');

var searchPath = path.join(__dirname, 'dummy-source');

describe('finding files', function () {
    var g = fileHelper.getFiles;

    it('should return an object', function () {
        will(g(searchPath, 'js')).have(['path', 'extension', 'files']);
    });

    it('should use cwd if no path is provided', function () {
        will(g(null, 'js').path).be(process.cwd());
    });

    it('should use \'js\' if no extension is provided', function () {
        will(g(searchPath).extension).be('js');
    });

    it('should find only files with extension', function () {
        var result = g(searchPath);
        will(result.files.length).beGreaterThan(0);
    });
});