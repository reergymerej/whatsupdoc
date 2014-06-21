'use strict';

exports.load = function (willy) {
    willy.addTest(function beGreaterThan(expectedValue) {
        return this.if(

            // a function passed the value being tested
            function (actualValue) {

                // return the result of your test
                return actualValue > expectedValue;
            },

            // a string explaining what you were testing
            'be greater than',

            // the value tested (optional)
            expectedValue
        );
    });

    willy.addTest(function haveAnItemLike(expectedValue) {
        return this.if(

            function (actualValue) {
                var foundMatch = false;
                actualValue.forEach(function (item) {
                    if (!foundMatch) {
                        foundMatch = item.indexOf(expectedValue) > -1;
                    }
                });

                return foundMatch;
            },

            'have an item like',

            expectedValue
        );
    });

    willy.addTest(function beLessThan(expectedValue) {
        return this.if(

            // a function passed the value being tested
            function (actualValue) {

                // return the result of your test
                return actualValue < expectedValue;
            },

            // a string explaining what you were testing
            'be less than',

            // the value tested (optional)
            expectedValue
        );
    });
};