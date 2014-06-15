'use strict';

var path = require('path'),
    fs = require('fs'),
    mocha = require('mocha'),
    willy = require('willy'),
    will = willy.will,
    slutDoc = require('../slut-doc'),
    docBlocks = require('../doc-blocks');

var searchPath = path.join(__dirname, 'dummy-source');
var testFile = path.join(searchPath, 'foo.js');
var testFileText = fs.readFileSync(testFile, 'utf-8');

willy.addTest(function beLessThan(expectedValue) {
    return this.if(

        // a function passed the value being tested
        function (actualValue) {

            // return the result of your test
            return actualValue < expectedValue;
        },

        // a string explaining what you were testing
        'be less than',

        // the value tested (optional)
        expectedValue
    );
});

describe('generating docs', function () {
    var outputFilePath = path.join(__dirname, '..', 'README.md');
    
    var getFileSize = function () {
        return fs.statSync(outputFilePath).size;
    };
    
    // TODO: Fix this.
    // This test is no good since the existing docs will be replaced
    // if they already exist.  We need to use a test README that we
    // can destroy after each test, but that requires a configurable
    // destination.
    it('should add text to the file', function () {
        var startSize = getFileSize();
        var result = slutDoc.go(searchPath);
        var endSize = getFileSize();

        will(startSize).beLessThan(endSize);
    });

    it('should replace existing docs when run multiple times', function () {
        var fs1 = getFileSize();
        var result = slutDoc.go(searchPath);
        var fs2 = getFileSize();

        will(fs2).be(fs1);
    });
});
