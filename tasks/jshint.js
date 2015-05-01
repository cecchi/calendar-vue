(function() {
    'use strict';

    var grunt = require('grunt');

    module.exports = {
        'options': {
            'strict':  false,
            'forin':   true,
            'curly':   true,
            'eqeqeq':  true,
            'immed':   true,
            'latedef': true,
            'newcap':  false,
            'noarg':   true,
            'undef':   true,
            'unused':  true,
            'eqnull':  true,
            'browser': true,
            'onevar':  true,
            'debug':   true,
            'indent':  4,

            'globals' : {
                'define':  true,
                'require': true,
                'module':  true,
                'console': true
            }
        },
        'src': {
            'src': [
                'js/**/*.js',
                '!js/vendor/**/*.js'
            ]
        },
        'grunt': {
            'src': [
                'Gruntfile.js',
                'tasks/**/*.js'
            ]
        }
    };

    grunt.loadNpmTasks('grunt-contrib-jshint');
})();