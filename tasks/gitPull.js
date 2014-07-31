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
        cmd, dir;

    // Gather repo commands.
    for ( var i = 0, length = repos.length; i < length; i++ ) {
      // Make sure we have a repo
      if ( ! repos[ i ].repo ) {
        return;
      }

      // parse the repo name
      if ( repos[ i ].dir ) {
        dir = repos[ i ].dir;
      } else {
        dir = repos[ i ].repo.match(/\/([^\/]+?)(?:.git)?$/);
        if ( ! dir[1] ) {
          grunt.log.warn('There was some trouble parsing the repository ' + repos[ i ].repo );
          continue;
        }
        dir = dir[1];
      }

      // Set up working paths.
      relPath.outer = path.join.apply( this, repos[ i ].path );
      relPath.inner = relPath.outer + path.sep + dir;
      
      // validate outer directory
      if ( ! grunt.file.isDir( relPath.outer ) ) {
        grunt.log.warn('The directory "' + relPath + '" not found.');
        continue;
      }
      
      // Set up pull or clone
      if ( grunt.file.isDir( relPath.inner + path.sep  + '.git' ) ) {
        cmd = [ '--git-dir=' + relPath.inner + '/.git', 'pull' ];
      } else {
        if ( ! grunt.file.isDir( relPath.inner ) ) {
          grunt.file.mkdir( relPath.inner );
        }
        cmd = [ 'clone', repos[ i ].repo, relPath.inner ];
      }
      commands.push( gitCMD( cmd, repos[ i ].repo ) );
    }
    // run the commands in parallel.
    async.parallel( commands, done );
  });

};
