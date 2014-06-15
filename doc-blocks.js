'use strict';

var swig = require('swig');
var fs = require('fs'),
    path = require('path'),
    util = require('./util');

/**
* @class DocBlock
* @description an object used to represent a block of documentation
* @param {String} raw the text found that will be converted into a DocBlock
* @param {String} filePath the file the block was found in
*/
var DocBlock = function (raw, filePath) {
    var items = getItems(raw);
    this.filePath = filePath;
    this.groupItems(items);
};

/**
* @name groupItems
* @param {Object} items
*/
DocBlock.prototype.groupItems = function (items) {
    var me = this;
    
    util.each(items, function (item) {
        me[item.key] = me[item.key] || [];
        me[item.key].push(item);
    });
};

DocBlock.prototype.stringify = function () {
    var templateFilePath = path.join(__dirname, 'block-template.txt');
    var template = swig.compileFile(templateFilePath);
    var that = this;

    var obj = {
        file: this.filePath,
        name: this.getName(),
        privacy: this.getPrivacy(),
        description: this.description &&
            this.description[0].description,

        params: this.param,
        returns: this.return && this.return[0]
    };

    return template(obj);
};

DocBlock.prototype.getName = function () {
    var result = '*unnamed*';
    var possible = ['method', 'class', 'function', 'name'];
    var that = this;
    var which;
    
    util.each(possible, function (possibility) {
        if (that.hasOwnProperty(possibility)) {
            which = possibility;
        }
    });

    if (which) {
        result = that[which][0].name;
    }

    return result;
};

DocBlock.prototype.getPrivacy = function () {
    var result = 'not specified';
    var possible = ['public', 'protected', 'private'];
    var that = this;
    var which;
    
    util.each(possible, function (possibility) {
        if (that.hasOwnProperty(possibility)) {
            which = possibility;
        }
    });

    if (which) {
        result = that[which][0].key;
    }

    return result;
};

/**
* @function getItems
* @param {String}
* @return {Object[]}
*/
var getItems = function (raw) {

    /**
    * @function getRawItems
    * @description Identify each item in the doc block.
    * @param {String} raw
    * @return {String[]} strings
    * @private
    */
    var getRawItems = function (raw) {

        var items;

        raw = raw.replace(/(\*\/)/g, '');
        raw = raw.replace(/\n/g, ' ');
        raw = raw.replace(/ *\* /g, ' ');

        items = raw.split('@');
        items.splice(0, 1);

        return items.sort();
    };

    var rawItems = getRawItems(raw);

    var items = [];

    util.each(rawItems, function (item) {
        items.push(parseItem(item));
    });

    return items;
};

/**
* @function parseItem
* @private
*/
var parseItem = function (item) {
    var s = item;

    var keyRegex = /^.+?(?=\s)/g;
    var typeRegex = /\{.+\}/g;
    var nameRegex = / +\[?[a-z0-9]+/gi;
    var defaultRegex = /= ?.+?(?=( |\]))/gi;
    var descriptionRegex = /[^\]]+$/gi;

    var pluck = function (s, regex) {
        var result = regex.exec(s);

        if (!result) {
            result = '';
        } else {
            result = result[0];
        }
        return result;
    };


    var obj = {};

    obj.key = (function () {
        var key = pluck(s, keyRegex);
        return key || s;
    }());

    // Flag is an internal indicator that means
    // this doc item only had a key, nothing else:
    // "* @private" or something like that.
    obj.flag = obj.key === s.trim();

    if (!obj.flag) {

        if (obj.key === 'description') {
            obj.description = s.substr(keyRegex.lastIndex).trim();
        } else {
            // Start searching for type based on where the key
            // was found.
            obj.type = (function () {
                var type;
                typeRegex.lastIndex = keyRegex.lastIndex;
                type = pluck(s, typeRegex).replace(/(\{|\})/g, '');
                return type || null;
            }());

            // Start searching for name from where the type was found.
            obj.name = (function () {
                var name;

                nameRegex.lastIndex = typeRegex.lastIndex;
                name = pluck(s, nameRegex).replace(/\[| /g, '');

                return name || null;
            })();

            // params can indicate that the param is optional
            // and a default value
            if (obj.key === 'param') {
                obj.optional = (function () {
                    var optionalRegex = /[^ ]/g;
                    optionalRegex.lastIndex = typeRegex.lastIndex;
                    return pluck(s, optionalRegex) === '[';
                }());

                if (obj.optional) {
                    obj.default = (function () {
                        var def;
                        defaultRegex.lastIndex = nameRegex.lastIndex;
                        def = pluck(s, defaultRegex);
                        return def.replace(/^=/, '');
                    }());
                }
            }

            obj.description = (function () {
                var desc = null;

                // Start looking for the description
                // after the last match from other elements.
                descriptionRegex.lastIndex = Math.max(
                    typeRegex.lastIndex,
                    nameRegex.lastIndex,
                    defaultRegex.lastIndex
                );

                if (descriptionRegex.lastIndex) {
                    desc = pluck(s, descriptionRegex).trim();
                }

                return desc;
            }());
        }
    }

    return obj;
};

// ================================================
exports.DocBlock = DocBlock;