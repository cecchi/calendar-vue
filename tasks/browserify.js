(function() {
    'use strict';

    var grunt = require('grunt');

    module.exports = {
        'build' : {
            'files' : {
                'build/calendar.js' : [
                    'js/**/*.js'
                ]
            },
            'options' : {
                'transform': [
                    'partialify'
                ]
            }
        }
    };

    grunt.loadNpmTasks('grunt-browserify');
})();