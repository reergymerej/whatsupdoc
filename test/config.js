'use strict';

/* global beforeEach, afterEach */

var mocha = require('mocha'),
    willy = require('willy'),
    will = willy.will,
    fs = require('fs'),
    path = require('path'),
    config = require('../config');

// describe('getting/setting config options', function () {

//     beforeEach(function () {
//         whatsupdoc.configure({
//             a: 1,
//             b: 2,
//             c: 3
//         });
//     });

//     it('should work when getting one value', function () {
//         var config = whatsupdoc.configure('b');
//         will(config).be(2);
//     });

//     it('should work when getting all values', function () {
//         var config = whatsupdoc.configure();
//         will(config).have(['a', 'b', 'c']);
//     });

//     it('should work when setting one value', function () {
//         whatsupdoc.configure('b', 'potato');
//         will(whatsupdoc.configure('b')).be('potato');
//     });

//     it('should work when setting multiple values', function () {
//         whatsupdoc.configure({
//             b: 3,
//             c: 4,
//             d: 5
//         });

//         will(whatsupdoc.configure()).have('abcd'.split(''));
//     });
// });

// describe('initializing config', function () {
//     var dir = path.join(__dirname, 'dummy-source');

//     // beforeEach(function () {
//     //     var oldName = path.join(dir, '.whatsupdocrc');
//     //     var newName = path.join(dir, '.whatsupdocrc_');
//     //     fs.renameSync(oldName, newName);
//     // });

//     // afterEach(function () {
//     //     var oldName = path.join(dir, '.whatsupdocrc_');
//     //     var newName = path.join(dir, '.whatsupdocrc');
//     //     fs.renameSync(oldName, newName);
//     // });

//     it('should start with default values', function () {
//         var settings;

//         whatsupdoc.init(dir);
//         settings = whatsupdoc.configure();

//         will(settings).have(['extensions', 'include', 'exclude', 'outputFile']);

//     });

//     it('should set values based on .whatsupdocrc', function () {
//         // create config file
//         // var filePath = path.join()
//         console.log(process.cwd());
//     });
// });

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