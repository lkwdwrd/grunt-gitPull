/*
 * grunt-gitPull
 * https://github.com/lkwdwrd/grunt-gitPull
 *
 * Copyright (c) 2014 Luke Woodward
 * Licensed under the MIT license.
 */

'use strict';

var path  = require('path'),
    async = require( 'async' );



module.exports = function (grunt) {
  var SELF = this;

  function gitCMD( cmd, repo ) {
    return function( done ){
      console.log( 'Processing ' + repo );
      var process = grunt.util.spawn( { cmd: 'git', args: cmd, opts: { stdio: 'inherit' } }, done );
    };
  }

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('gitPull', 'Clone and Pull repos with Grunt', function () {
    // Merge task-specific and/or target-specific options with these defaults.
    var done = this.async(),
        commands = [],
        repos = this.data.repos,
        relPath = {},
        cmd;

    // Gather repo commands.
    for ( var i = 0, length = repos.length; i < length; i++ ) {
      relPath.outer = path.join.apply( this, repos[ i ].path );
      relPath.inner = relPath.outer + path.sep + repos[ i ].dir;
      if ( ! grunt.file.isDir( relPath.outer ) ) {
        grunt.log.warn('The directory "' + relPath + '" not found.');
        return false;
      }
      if ( grunt.file.isDir( relPath.inner + path.sep  + '.git' ) ) {
        cmd = [ '-C', relPath.inner, 'pull' ];
      } else {
        if ( ! grunt.file.isDir( relPath.inner ) ) {
          grunt.file.mkdir( relPath.inner );
        }
        cmd = [ '-C', relPath.inner, 'clone', repos[ i ].repo, '.' ];
      }
      commands.push( gitCMD( cmd, repos[ i ].repo ) );
    }
    // run the commands in parallel.
    async.parallel( commands, done );
  });

};
