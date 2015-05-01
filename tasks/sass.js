(function() {
    'use strict';

    var grunt = require('grunt');

    module.exports = {
        'styles': {
            'files': {
                'build/calendar.css' : 'scss/calendar.scss'
            }
        }
    };

    grunt.loadNpmTasks('grunt-contrib-sass');
})();