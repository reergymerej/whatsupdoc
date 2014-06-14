/**
* Iterate over an Array/Object.
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

exports.each = each;