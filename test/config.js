'use strict';

/* global beforeEach, afterEach */

var mocha = require('mocha'),
    willy = require('willy'),
    will = willy.will,
    whatsupdoc = require('../whatsupdoc');

describe('getting/setting config options', function () {

    beforeEach(function () {
        whatsupdoc.configure({
            a: 1,
            b: 2,
            c: 3
        });
    });

    it('should work when getting one value', function () {
        var config = whatsupdoc.configure('b');
        will(config).be(2);
    });

    it('should work when getting all values', function () {
        var config = whatsupdoc.configure();
        will(config).have(['a', 'b', 'c']);
    });

    it('should work when setting one value', function () {
        whatsupdoc.configure('b', 'potato');
        will(whatsupdoc.configure('b')).be('potato');
    });

    it('should work when setting multiple values', function () {
        whatsupdoc.configure({
            b: 3,
            c: 4,
            d: 5
        });

        will(whatsupdoc.configure()).have('abcd'.split(''));
    });
});