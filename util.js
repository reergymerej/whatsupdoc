'use strict';

/**
* @name each
* @description Iterate over an Array/Object.
* @param {Array/Object} collection
* @param {Function} fn - item, index
* @private
*/
var each = function (collection, fn) {
    var i, max;

    if (collection) {
	    if (collection instanceof Array) {
	        for (i = 0, max = collection.length; i < max; i++) {
	            fn(collection[i]);
	        }
	    } else {
	    	for (i in collection) {
	    		if (collection.hasOwnProperty(i)) {
	    	    	fn(collection[i], i);
	    		}
	    	}
	    }
    }
};

/**
* @name log
* @description logs text to the console
* @param {String/String[]} msg the message to log
*/
var log = function (msg) {
    arguments[0] = '  whatsupdoc: ' + arguments[0];
    console.log.apply(this, arguments);
};

exports.each = each;
exports.log = log;