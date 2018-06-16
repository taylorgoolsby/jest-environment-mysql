'use strict'

const gulp = require('gulp')
const del = require('del')
const runSequence = require('run-sequence')
const babel = require('gulp-babel')
const sourcemaps = require('gulp-sourcemaps')

const babelCompileFiles = ['./src/**/*']

gulp.task('default', function() {
  gulp.start('build')
})

gulp.task('build', function() {
  runSequence('cleanBuild', 'babelBuild')
})

gulp.task('cleanBuild', function(cb) {
  del(['build']).then(() => cb())
})

gulp.task('babelBuild', function() {
  return gulp
    .src(babelCompileFiles, { base: './src' })
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build'))
})
