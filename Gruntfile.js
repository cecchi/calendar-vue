module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        'pkg':        grunt.file.readJSON('package.json'),
        'jshint':     require('./tasks/jshint'),
        'clean':      require('./tasks/clean'),
        'sass':       require('./tasks/sass'),
        'watch':      require('./tasks/watch'),
        'browserify': require('./tasks/browserify')
    });

    grunt.registerTask('build', ['jshint', 'clean', 'browserify', 'sass']);
    grunt.registerTask('default', 'build');
};