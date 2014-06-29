module.exports = function(grunt) {

	// Project configuration
	grunt.initConfig({
		concat: {
			options:{

			},
			javascript:{
				src: ['libs/angular.js', 'libs/angular-route.js', 'scripts/**/*.js'],
				dest: '.tmp/concat/scripts.js'
			},
		},

		cssmin: {
			combine: {
				files: {
					'dist/build.css': ['css/bootstrap.css','css/style.css']
				}
			}
		},

		uglify: {
			options: {
				mangle: false
			},
			dist: {
				files: {
					'dist/build.js': ['.tmp/concat/scripts.js']
				}
			}
		}
	});


	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// Detfaul tasks
	grunt.registerTask('default', ['concat','cssmin','uglify']);

};