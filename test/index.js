'use strict';

/*global beforeEach */

var path = require('path'),
    fs = require('fs'),
    mocha = require('mocha'),
    willy = require('willy'),
    will = willy.will,
    slutDoc = require('../slut-doc');

var searchPath = path.join(__dirname, 'dummy-source');

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

describe('finding doc blocks', function () {
    var f = slutDoc.findBlocks,
        foo = path.join(searchPath, 'foo.js'),
        text = fs.readFileSync(foo, 'utf-8');

    it('should return an Array', function () {
        will(f(text)).beAn(Array);
    });

    it('should be able to find blocks', function () {
        will(f(text).length).be(2);
    });

    describe.only('finding doc items', function () {
        var fdi = slutDoc.findDocItems,
            block = f(text)[0],
            items;

        beforeEach(function () {
            items = fdi(block);
        });

        it('should return an Array', function () {
            will(items).beAn(Array);
        });

        it('should match each item', function () {
            will(items.length).be(5);
        });

        it('should clean up matches to all start with @', function () {
            will(items[0][0]).be('@');
        });
    });
});