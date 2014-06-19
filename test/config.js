'use strict';

/* global beforeEach, afterEach */

var mocha = require('mocha'),
    willy = require('willy'),
    will = willy.will,
    fs = require('fs'),
    path = require('path'),
    config = require('../config');

describe('getting the configuration', function () {
    it('should return an object', function () {
        var c = config.getConfig(path.join(__dirname, 'config'));
        will(c).beAn(Object);
    });

    it('should return options specified in .whatsupdocrc if found', function () {
        var c = config.getConfig(path.join(__dirname, 'config'));
        will(c.custom).be(true);
    });

    it('should return the default config if no .whatsupdocrc is found', function () {
        var c = config.getConfig(path.join(__dirname, 'config-none'));
        will(c.default).be(true);
    });

    it('should throw an error if .whatsupdocrc is bad JSON', function () {
        will(function () {
            config.getConfig(path.join(__dirname, 'config-bad'));
        }).throw();
    });
});