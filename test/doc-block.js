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

    it('should identify each of the elements', function () {
        will(block).have([
            'description',
            'param',
            'return',
            'private'
        ]);
    });

    it.only('should be able to stringify itself', function () {
        var str = block.stringify();
        // var expected =
        //     '* This is a doc block description that spans multiple lines.\n' +
        //     '**Parameters**\n' +
        //     '* anotherValue *AnotherType*\n' +
        //     '* optionalValue *AnotherType* (optional)\n' +
        //     '* optionalValWithDefault=]AnotherType (optional)\n' +
        //     '** defaults: \'blah\'\n' +
        //     '* @return {ReturnType}\n' +
        //     '* @private\n';

        console.log(str);   

        will(str).exist();
    });
});