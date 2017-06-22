/**
 *  In work mode set index to reference main.js.
 *  When complete, run gulp compress then set Index.html
 *    to reference
 */

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var pump = require('pump');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var lazypipe = require('lazypipe');
var rename = require("gulp-rename");
var runSequence = require('run-sequence');
var cache = require('gulp-cache');
var del = require('del');
var es2015 = require('babel-preset-es2015');

var d = '02 - JS and CSS Clock';

//Broswer sync root folder
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: d
    },
  })
});

gulp.task('compress', function() {
    return gulp.src(d+'/js/main.js')
        .pipe(babel({
          presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(d));
});

//clean extra files
gulp.task('clean', function() {
  return del.sync(d+'/main.min.js');
})

// clear local cache
gulp.task('cache:clear', function (callback) {
  return cache.clearAll(callback)
})

// Gulp watch syntax to run after browserSync and sass
gulp.task('watch', ['clean', 'compress', 'browserSync'], function (){
  // Reloads the browser whenever HTML or JS files change
  gulp.watch( d+'/*.css', browserSync.reload);
  gulp.watch( d+'/*.html', browserSync.reload);
  gulp.watch( d+'/js/*.js', browserSync.reload);
});

gulp.task('default', function (callback) {
  runSequence(['browserSync', 'watch'],
    callback
  )
});
