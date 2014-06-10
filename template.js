'use strict';

var path = require('path');
var swig = require('swig');

var templateFilePath = path.join(__dirname, 'template.txt');

// Compile a file and store it, rendering it later
var tpl = swig.compileFile(templateFilePath);
console.log(tpl({
    article: {
        title: 'Swig is fun!'
    }
}));

// Immediately render a Swig template from a string
console.log(swig.render('{% if foo %}Hooray!{% endif %}', { locals: { foo: true }}));
