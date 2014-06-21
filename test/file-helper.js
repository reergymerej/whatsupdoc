'use strict';

// TODO: Break this out into its own module.

var path = require('path'),
    fs = require('fs'),
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

describe('reading files with buffers', function () {

    it('should get the contents of a file', function () {
        var filePath = path.join(__dirname, 'dummy-source/read.txt');
        var result = fileHelper.readFileSync(filePath);
        will(result).be('This is cool.');
    });

    it('should create the file if it does not exist', function () {
        var filePath = path.join(__dirname, 'dummy-source/ghost.txt');
        var result = fileHelper.readFileSync(filePath);
        var exists = fs.existsSync(filePath);

        if (exists) {
            fs.unlink(filePath);
        }

        will(exists).be(true);
    });
});