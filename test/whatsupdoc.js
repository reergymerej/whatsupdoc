'use strict';

/* global beforeEach, afterEach */

var path = require('path'),
    fs = require('fs'),
    mocha = require('mocha'),
    willy = require('willy'),
    will = willy.will,
    whatsupdoc = require('../whatsupdoc'),
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
    var outputFilePath = path.join(__dirname, 'README.md');
    
    var getFileSize = function () {
        var size;
        try {
            size = fs.statSync(outputFilePath).size;
        } catch (e) {
            size = 0;
        }
        return size;
    };

    beforeEach(function () {
        whatsupdoc.configure('destinationFile', outputFilePath);
    });

    afterEach(function () {
        fs.unlinkSync(outputFilePath);
    });
    
    it('should add text to the file', function () {
        var startSize = getFileSize();
        var result = whatsupdoc.go(searchPath);
        var endSize = getFileSize();

        will(startSize).beLessThan(endSize);
    });

    it('should replace existing docs when run multiple times', function () {
        var fs1, fs2;
        whatsupdoc.go(searchPath);
        fs1 = getFileSize();
        whatsupdoc.go(searchPath);
        fs2 = getFileSize();

        will(fs2).be(fs1);
    });
});
