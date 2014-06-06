'use strict';

var mocha = require('mocha'),
    will = require('willy').will,
    slutDoc = require('../index');

describe('getting started', function () {
    it('should work', function () {
        will(function () {
            slutDoc.index();
        }).not.throw();
    });
});