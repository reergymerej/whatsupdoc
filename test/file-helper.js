'use strict';

// TODO: Break this out into its own module.

var path = require('path'),
    fs = require('fs'),
    mocha = require('mocha'),
    willy = require('willy'),
    fileHelper = require('../file-helper'),
    searchPath = path.join(__dirname, 'dummy-source'),
    will = willy.will;

require('./willyHelpers').load(willy);


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