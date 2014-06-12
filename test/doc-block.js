'use strict';

/*global beforeEach */

var mocha = require('mocha'),
    willy = require('willy'),
    will = willy.will,
    docBlocks = require('../doc-blocks'),
    DocBlock = docBlocks.DocBlock;

var rawBlock =
    '/**\n' +
    '* @description This is a doc block description\n' +
    '* that spans multiple lines.\n' +
    '* @method someCoolMethod\n' +
    '* @param {Type} value\n' +
    '* @param {AnotherType} anotherValue\n' +
    '* @param {AnotherType} [optionalValue]\n' +
    '* @param {AnotherType} [optionalValWithDefault=\'blah\'] This is a param description.\n' +
    '* @return {ReturnType}\n' +
    '* @private\n' +
    '*/';

describe('getting a DocBlock from raw string', function () {
    var block;

    beforeEach(function () {
        block = new DocBlock(rawBlock);
    });

    it('should be able to stringify itself', function () {
        var str = block.stringify();
        will(str).exist();
    });
});