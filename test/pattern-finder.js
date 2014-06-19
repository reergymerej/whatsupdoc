'use strict';

/* global beforeEach, afterEach */

var mocha = require('mocha'),
  willy = require('willy'),
  will = willy.will,
  path = require('path'),
  patternFinder = require('../pattern-finder');

describe('finding patterns in files', function () {

  var file;

  beforeEach(function () {
    file = path.join(__dirname, 'pattern-finder.txt');
  });

  it('should throw if the file does not open', function () {
    file = path.join(__dirname, 'not.found');

    will(function () {
      patternFinder.findPattern(/asdf/g, file);
    }).throw();
  });

  it('should return an empty Array if no matches are found', function () {
    var matches = patternFinder.findPattern(/qwer/gi, file);
    will(matches).beAn(Array);
  });

  it('should return an Array if matches were found', function () {
    var matches = patternFinder.findPattern(/asdf/gi, file);
    will(matches).beAn(Array);
  });

  it('should return an Array of each match', function () {
    var matches = patternFinder.findPattern(/a.+?f/gi, file);
    will(matches[0]).be('asdf');
  });
});
