'use strict';

/*global beforeEach */

var mocha = require('mocha'),
    willy = require('willy'),
    will = willy.will,
    docBlocks = require('../doc-blocks'),
    DocBlock = docBlocks.DockBlock;

var rawBlock =
    '/**\n' +
    '* @description This is a doc block description\n' +
    '* that spans multiple lines.\n' +
    '* @param {Type} value\n' +
    '* @param {AnotherType} anotherValue\n' +
    '* @param {AnotherType} [optionalValue]\n' +
    '* @param {AnotherType} [optionalValWithDefault=\'blah\']\n' +
    '* @return {ReturnType}\n' +
    '* @private\n' +
    '*/';

describe('getting a DockBlock from raw string', function () {

    it('should identify the description', function () {
        var block = new DocBlock(rawBlock);
        will(block.description).be();

    });
});