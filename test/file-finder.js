'use strict';

// TODO: Break this out into its own module.

var path = require('path'),
    fs = require('fs'),
    mocha = require('mocha'),
    willy = require('willy'),
    fileFinder = require('../file-finder');

var searchPath = path.join(__dirname, 'dummy-source'),
    will = willy.will;

describe('finding files', function () {
    var g = fileFinder.getFiles;

    it('should return an Array', function () {
        will(g(searchPath, 'potato')).beAn(Array);
    });

    it('should throw when args are missing', function () {
        will(function () {
            g();
        }).throw();
    });

    it('should find only files with extension', function () {
        var result = g(searchPath, 'js');
        will(result.length).beGreaterThan(0);
    });

    it('should work recursively', function () {
        var result = g(searchPath, 'js');
        will(result.length).be(3);
    });

    it('should not look in ignored directories', function () {
        var dir = path.join(__dirname, '..');
        var result = g(dir, 'js', ['node_modules']);

        will(result).not.haveAnItemLike('node_modules');
    });
});
