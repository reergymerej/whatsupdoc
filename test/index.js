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


describe('everything', function () {
    var result = slutDoc.go(searchPath);
    
    it('should make md');
});
