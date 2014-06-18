# grunt-gitPull

> Clone and Pull repos with Grunt

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-gitPull --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-gitPull');
```

## The "gitPull" task

### Overview
In your project's Gruntfile, add a section named `gitPull` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  gitPull: {
    set: {
      repos: [
        // array of object with relative path arrays and repo keys.
      ]
    },
  },
})
```

Now when running `grunt gitPull` the plugin will check all paths and see if there is a git repo in them. If so, it will run a git pull on that repository. If it is not present, it will run `git clone` with the repository specified.

### Usage Example
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  gitPull: {
    example: {
      repos: [
        {
          path: ['relative', 'path'], // relative/path/
          repo: 'git@git.repository.com/myRepo.git'
        },
        {
          path: ['another', 'path'] // another/path/
          repo: 'git@git.repository.com/otherRepo.git'
        }
      ]
    },
  },
})
```

## Release History
**0.1.2**

 - Parse out the repo name rather than specifying it.

**0.1.1**

 - Report which repo is being processed.
 - Fix README docs.

**0.1.0**

 - First release.
 - Basic git clone/pull behavior.

## License
Copyright (c) 2014 Luke Woodward. Licensed under the MIT license.
