npm init

---

npm install http-server -g
http-server

---

npm install grunt-cli -g
npm install grunt --save-dev

---

Gruntfile.js
module.exports = function(grunt) {


	// Project configuration
	grunt.initConfig({
		
	});


	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-concat');

	// Detfaul tasks
	grunt.registerTask('default', ['concat']);

};



---

npm install grunt-contrib-concat --save-dev
npm install grunt-karma --save-dev
