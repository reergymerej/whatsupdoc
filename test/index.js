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
});

describe('processing a directory', function () {
    var main = slutDoc.main;

    it('should spit out some md');
});