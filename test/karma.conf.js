module.exports = function(config) {
     config.set({
      basePath: '',
      frameworks: ['jasmine'],
      files: [
        '../bower_components/angular/angular.min.js',
        '../bower_components/angular-mocks/angular-mocks.js',
        '../src/bsDropdown.js',
        './bsDropdown-test.js'
      ],
      exclude: [
      ],
      preprocessors: {
      },
      reporters: ['progress'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['Chrome'],
      singleRun: false
     });

};