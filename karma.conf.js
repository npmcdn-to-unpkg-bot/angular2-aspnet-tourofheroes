'use strict';

module.exports = function (config) {
  config.set({

    basePath: './',

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    // Reporters generates the coverage data
    reporters: ['progress', 'dots', 'coverage'],

    // Do not include tests or libraries (these files will be instrumented by Istanbul)
    preprocessors: {
      'wwwroot/**/!(*spec).js': ['coverage']
    },

    coverageReporter: {
      dir: 'coverage/',
      reporters: [{
        type: 'text-summary'
      }, {
        type: 'json',
        subdir: '.',
        file: 'coverage-final.json'
      }, {
        type: 'html'
      }]
    },

    files: [
      'node_modules/zone.js/dist/zone.js',
      'node_modules/zone.js/dist/long-stack-trace-zone.js',
      'node_modules/zone.js/dist/jasmine-patch.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/reflect-metadata/Reflect.js',
      'node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',

      {
        pattern: 'node_modules/angular2/**/*.js',
        included: false,
        watched: false
      }, {
        pattern: 'node_modules/rxjs/**/**.js',
        included: false,
        watched: false
      }, {
        pattern: 'node_modules/systemjs/dist/system-polyfills.js',
        included: false,
        watched: false
      },

      // paths loaded via module imports
      {
        pattern: 'wwwroot/**/*.js',
        included: false,
        watched: true
      },

      'karma.test.shim.js'
    ],

    // proxied base paths
    proxies: {
      // required for component assets fetched by Angular's compiler
      '/wwwroot/': '/base/wwwroot/'
    },

    exclude: [
      'node_modules/angular2/**/*spec.js'
    ],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    singleRun: true
  })
};
