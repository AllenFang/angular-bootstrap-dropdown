'use strict'

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var srcFile = 'src/bsDropdown.js';

gulp.task('default', ['jshint', 'uglify']);

gulp.task('jshint', function(){
	return gulp.src(srcFile)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('uglify', function(){
	return gulp.src(srcFile)
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('dist'));
});