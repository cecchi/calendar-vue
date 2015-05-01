(function() {
    'use strict';

    var grunt = require('grunt');

    module.exports = {
        'sass': {
            'files': ['scss/**/*.scss'],
            'tasks': ['clean:css', 'sass']
        },

        'jshint-src': {
            'files': [
                'js/**/*.js',
                'js/**/*.html'
            ],
            'tasks': ['jshint:src', 'clean:js', 'browserify']
        },

        'jshint-grunt': {
            'files': ['tasks/**/*.js'],
            'tasks': ['jshint:grunt']
        }
    };

    grunt.loadNpmTasks('grunt-contrib-watch');
})();