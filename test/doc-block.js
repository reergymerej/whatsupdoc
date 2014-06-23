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
        '* @param {Type1} value\n' +
        '* @param {AnotherType2} anotherValue\n' +
        '* @param {AnotherType3} [optionalValue]\n' +
        '* @param {AnotherType4} [optionalValWithDefault=\'blah\'] This is a param description.\n' +
        '* @return {ReturnType}\n' +
        '* @private\n' +
        '*/',
    filePath = 'foo.bar';

describe('getting a DocBlock from raw string', function () {
    var block;

    beforeEach(function () {
        block = new DocBlock(rawBlock, filePath);
    });

    it('should know its name', function () {
        will(block.name).be('someCoolMethod');
    });

    it('should know its privacy', function () {
        will(block.privacy).be('private');
    });

    it('should know where the block was found', function () {
        will(block.file).be(filePath);
    });

    describe('params', function () {
        it('should contain an item for each param', function () {
            will(block.params.length).be(4);
        });

        it('should account for each element of the param', function () {
            will(block.params[3]).have(['type', 'name', 'optional', 'description']);
        });

        it('should list the params in order', function () {
            will(block.params[3].name).be('optionalValWithDefault');
        });
    });
});
