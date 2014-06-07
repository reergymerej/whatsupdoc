'use strict';

var mocha = require('mocha'),
    willy = require('willy'),
    will = willy.will,
    slutDoc = require('../slut-doc');

var path = process.cwd();

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

describe('finding files', function () {
    var g = slutDoc.getFiles;

    it('should return an object', function () {
        will(g(path, 'js')).have(['path', 'extension', 'files']);
    });

    it('should use cwd if no path is provided', function () {
        will(g(null, 'js').path).be(path);
    });

    it('should use \'js\' if no extension is provided', function () {
        will(g(path).extension).be('js');
    });

    // it('should find files by extension', function () {
    //     slutDoc.getFiles(path, 'js');
    //     will(slutDoc.matchedFileCount).beGreaterThan(0);
    // });
});