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



describe.only('generating docs', function () {
    var dir = path.join(__dirname, 'dummy-source');
    var outputFilePath = path.join(dir, 'README.md');
    
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
        try {
            fs.unlinkSync(outputFilePath);
        } catch (e) {
            
        }
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

    it('should only include public blocks', function () {
        var blocks = whatsupdoc.go(searchPath);
        will(blocks).haveOnly('public');
    });
});
