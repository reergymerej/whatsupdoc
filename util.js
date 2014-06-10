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

exports.each = each;