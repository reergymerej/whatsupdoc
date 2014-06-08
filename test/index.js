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

describe('finding doc blocks', function () {
    var f = slutDoc.findBlocks,
        foo = path.join(searchPath, 'foo.js'),
        text = fs.readFileSync(foo, 'utf-8');

    it('should return an Array', function () {
        will(f(text)).beAn(Array);
    });

    it('should be able to find blocks', function () {
        will(f(text).length).be(3);
    });

    describe('finding doc items', function () {
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
            will(items.length).be(6);
        });

        it('should clean up matches to all start with @', function () {
            will(items[0][0]).be('@');
        });
    });

    describe('finding doc block description', function () {
        var block = f(text)[0];

        it('should return the description', function () {
            will(slutDoc.getBlockDescription(block))
                .be('This is a doc block description.');
        });
    });
});