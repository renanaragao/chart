/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    phk: grunt.file.readJSON('package.json'),
    concat: {
      js: {
        src: [
          'app/app.js',
          'app/enumChart.js',          
          'app/base/chartBase.js',
          'app/chart/column.js',
          'app/chart/geo.js',
          'app/chart/line.js',
          'app/factory/chartFactory.js',
          'app/plugin.js',
          'app/moneyFormat.js'
        ],
        dest: 'bin/chart.js'
      }
    },

    // Task configuration.
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          'bin/chart.min.js': ['bin/chart.js']
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task.
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};