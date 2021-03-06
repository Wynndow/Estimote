// Karma configuration
// Generated on Tue Feb 16 2016 18:12:15 GMT+0000 (GMT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './www/',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'lib/angular/angular.js',
      'lib/angular-route/angular-route.js',
      'lib/angular-resource/angular-resource.js',
      'lib/angular-mocks/angular-mocks.js',
      'js/beacons.js',
      'js/home.js',
      'js/login.js',
      'js/app.js',
      'js/messages.js',
      'tests/beacons.spec.js',
      'tests/home.spec.js',
      'tests/login.spec.js',
      'tests/app.spec.js',
      'tests/messages.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],
   //
  //   plugins: [
  //     'karma-spec-reporter',
  //     'karma-coverage'
  //  ],



    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'js/!(app|login)*.js': ['coverage'],
   },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'spec', 'coverage'],


    coverageReporter: {
        type: "lcov",
        dir: "coverage/"
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
