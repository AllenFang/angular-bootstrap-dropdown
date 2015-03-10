'use strict'

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var karma = require('gulp-karma');

var srcFile = 'src/bsDropdown.js';
var testFile = [
	'./bower_components/angular/angular.min.js',
    './bower_components/angular-mocks/angular-mocks.js',
    './src/bsDropdown.js',
    './test/bsDropdown-test.js'
];

gulp.task('default', ['test', 'jshint', 'uglify']);
gulp.task('dev', function(){
	return gulp.watch([srcFile], ['default'])
});


gulp.task('jshint', function(){
	return gulp.src(srcFile)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('uglify', function(){
	return gulp.src(srcFile)
		.pipe(uglify({
			preserveComments: 'some'
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('test', function(){
	return gulp.src(testFile)
		.pipe(karma({
			configFile: 'test/karma.conf.js',
			action: 'run'
		}))
		.on('error', function(err){
			throw err;
		});
});