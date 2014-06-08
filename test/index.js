'use strict';

/*global beforeEach */

var path = require('path'),
    fs = require('fs'),
    mocha = require('mocha'),
    willy = require('willy'),
    will = willy.will,
    slutDoc = require('../slut-doc');

var searchPath = path.join(__dirname, 'dummy-source');
var testFile = path.join(searchPath, 'foo.js');
var testFileText = fs.readFileSync(testFile, 'utf-8');




describe('finding doc blocks', function () {
    var f = slutDoc.findBlocks,
        text = testFileText;

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

describe.only('processing a directory', function () {
    var main = slutDoc.main;

    // it('should find all files', function () {
    //     will(main(searchPath).length).be(3);
    // });

    it('should find all doc blocks in files', function () {
        will(main(searchPath).length).be(6);
    });

    it('should identify descriptions');

    it('should identify tags');

    it('should create an Array of objects for each block');

    it('should spit out some md');
});