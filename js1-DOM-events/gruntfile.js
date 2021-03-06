/* eslint-env node */
/* eslint global-strict: 0 */
/* eslint semi: 0 */
'use strict'

module.exports = function (grunt) {

    grunt.config.init({
        //jshint: {
        //    src: ['src/**/*.js','!src/js/lib/**/*.js'],
        //    options: {
        //        asi: true
        //    }
        //},
        eslint: {
            src: ['src/**/*.js', '!src/js/lib/**/*.js'],
        },
        csslint: {
            src: ['src/**/*.css']
        },
        //jasmine_node: {
        //    options: {
        //        forceExit: true,
        //        match: '.',
        //        matchall: false,
        //        specNameMatcher: 'spec',
        //        extensions: 'js'
        //    },
        //    all: ['test']
        //},
        watch: {
            js: {
                files: ['src/**/*.js'],
                tasks: ['jshint']/*, 'jasmine_node'*/
            },
            css: {
                files: ['src/**/*.css'],
                tasks: ['csslint']
            }
        },
        clean: {
            src: ['target']
        },
        uglify: {
            main: {
                files: {
                    'target/scripts.min.js': ['src/js/itemsJSON.js', 'src/js/**/*.js']
                }
            }
        },
        cssmin: {
            main: {
                files: {
                    'target/style.min.css': ['src/css/**/*.css']
                    //'target/css/style.css': ['src/css/style.css'],
                    //'target/css/tableSimulation.css': ['src/css/tableSimulation.css']
                }
            }
        },
        processhtml: {
            options: {
                // Task-specific options go here.
            },
            // main: {
            'target/index.html': ['src/index.html']
            // }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['**', '!js/**', '!css/**', '!index.html'],
                        dest: 'target/'
                    }
                ]
            }
        },
        connect: {
            dev: {
                options: {
                    hostname: 'localhost',
                    useAvailablePort: true,
                    base: 'src',
                    open: true,
                    keepalive: true
                }
            },
            prod: {
                options: {
                    hostname: 'localhost',
                    useAvailablePort: true,
                    base: 'target',
                    open: true,
                    keepalive: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint')
    grunt.loadNpmTasks('grunt-eslint')
    grunt.loadNpmTasks('grunt-contrib-csslint')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-contrib-cssmin')
    grunt.loadNpmTasks('grunt-processhtml')
    grunt.loadNpmTasks('grunt-contrib-connect')
    grunt.loadNpmTasks('grunt-jasmine-node');

    grunt.registerTask('check', ['jshint', 'csslint'])/*, 'jasmine_node'*/
    grunt.registerTask('build', ['clean', 'copy', 'uglify', 'cssmin', 'processhtml'])

    grunt.registerTask('default', ['check', 'build'])
    grunt.registerTask('dev', ['connect:dev'])
    grunt.registerTask('prod', ['default', 'connect:prod'])

}