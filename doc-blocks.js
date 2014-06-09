'use strict';

var fs = require('fs'),
    path = require('path');

/**
* Iterate over an Array.
* @param {Array} collection
* @param {Function} fn - item, index
* @private
*/
var each = function (collection, fn) {
    var i, max;

    if (collection && collection.length) {
        for (i = 0, max = collection.length; i < max; i++) {
            fn(collection[i]);
        }
    }
};

/**
* @class DocBlock
* @param {String} raw
*/
var DocBlock = function (raw) {
    var rawItems = getRawItems(raw);
    var items = getItems(rawItems);
    this.groupItems(items);
};

/**
* @param {Object} items
*/
DocBlock.prototype.groupItems = function (items) {
    var me = this;
    
    each(items, function (item) {
        me[item.key] = me[item.key] || [];
        me[item.key].push(item);
    });
};

DocBlock.prototype.stringify = function () {
    var filePath = path.join(__dirname, 'template.txt');
    var template = fs.readFileSync(filePath, 'utf-8');
    var output = template;

    var i;

    // method 
    var methodOrClass = this.method || this.class;
    var methodOutput = '';

    if (methodOrClass) {
        methodOrClass = methodOrClass[0];
        methodOutput = output.replace('%%METHOD_OR_CLASS_NAME%%', methodOrClass.name);
    }

    output = output.replace('%%METHOD_OR_CLASS_NAME%%', methodOutput);

    
    var description = this.description && this.description[0].description;

    output = output.replace('%%METHOD_DESCRIPTION%%', description);


    // params
    var PARAM_TEMPLATE = '* %%PARAM_NAME%%: %%PARAM_TYPE%%\n\n' +
        '%%PARAM_DESCRIPTION%%\n\n' +
        'default value: %%PARAM_DEFAULT%%\n\n';

    var paramsOutput = '';

    each(this.param, function (param) {
        var output = PARAM_TEMPLATE;

        output = output.replace('%%PARAM_NAME%%', param.name);
        output = output.replace('%%PARAM_TYPE%%', param.type);
        output = output.replace('%%PARAM_DESCRIPTION%%', param.description);
        output = output.replace('%%PARAM_DEFAULT%%', param.default);

        paramsOutput += output;
    });

    output = output.replace(PARAM_TEMPLATE, paramsOutput);

    // returns

    var returns = this.return && this.return[0];
    var returnsOutput = '';

    if (returns) {
        returnsOutput = output.replace('%%RETURN_TYPE%%', returns.type);
    }

    output = output.replace('%%RETURN_TYPE%%', returnsOutput);

    return output;
};

/**
* @param {String}
* @return {DocItem[]}
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

/**
* @param {String[]} rawItems
* @return {Item[]}
*/
var getItems = function (rawItems) {
    var items = [];

    each(rawItems, function (item) {
        items.push(parseItem(item));
    });

    return items;
};

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