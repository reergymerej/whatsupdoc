'use strict';

// TODO: Break this out into its own module.

var path = require('path'),
    mocha = require('mocha'),
    willy = require('willy'),
    fileHelper = require('../file-helper');

var searchPath = path.join(__dirname, 'dummy-source'),
    will = willy.will;

willy.addTest(function beGreaterThan(expectedValue) {
    return this.if(

        // a function passed the value being tested
        function (actualValue) {

            // return the result of your test
            return actualValue > expectedValue;
        },

        // a string explaining what you were testing
        'be greater than',

        // the value tested (optional)
        expectedValue
    );
});

willy.addTest(function haveAnItemLike(expectedValue) {
    return this.if(

        function (actualValue) {
            var foundMatch = false;
            actualValue.forEach(function (item) {
                if (!foundMatch) {
                    foundMatch = item.indexOf(expectedValue) > -1;
                }
            });

            return foundMatch;
        },

        'have an item like',

        expectedValue
    );
});

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

    it('should work recursively', function () {
        var result = g(searchPath, 'js', true);
        will(result.files.length).be(3);
    });

    it('should not look in "node_modules"', function () {
        var dir = path.join(__dirname, '..');
        var result = g(dir, null, true);

        will(result.files).not.haveAnItemLike('node_modules');
    });

    it('should not look in "test"', function () {
        var dir = path.join(__dirname, '..');
        var result = g(dir, null, true);

        will(result.files).not.haveAnItemLike('test');
    });
});

describe('finding pattern in files', function () {
    var file = path.join(__dirname, 'dummy-source/foo.txt');

    it('should return matches in a file', function () {
        var regex = /foo bar.*/g;
        var matches = fileHelper.getMatches(file, regex);

        will(matches.length).be(2);
    });

    it('should return an empty Array if none are found', function () {
        var regex = /asdf/;
        var matches = fileHelper.getMatches(file, regex);

        will(matches).beAn(Array);
    });
});