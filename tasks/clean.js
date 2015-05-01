(function() {
    'use strict';

    var grunt = require('grunt');

    module.exports = {
        'js' : [
            'build/calendar.js'
        ],
        'css' : [
            'build/calendar.css',
            'build/calendar.css.map'
        ]
    };

    grunt.loadNpmTasks('grunt-contrib-clean');
})();