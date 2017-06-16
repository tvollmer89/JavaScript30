var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var pump = require('pump');
var uglify = require('gulp-uglify');
var lazypipe = require('lazypipe');
var rename = require("gulp-rename");
var runSequence = require('run-sequence');
var cache = require('gulp-cache');
var del = require('del');
var d = '01 - JavaScript Drum Kit';

//Broswer sync root folder
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: d
    },
  })
});

//clean extra files
gulp.task('clean', function() {
  return del.sync(d+'/*.min.js');
})

// clear local cache
gulp.task('cache:clear', function (callback) {
return cache.clearAll(callback)
})

//Compress JS
gulp.task('compress', function () {
  gulp.src(d+'/main.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(d))
});

// Gulp watch syntax to run after browserSync and sass
gulp.task('watch', ['clean', 'compress', 'browserSync'], function (){
  // Reloads the browser whenever HTML or JS files change
  gulp.watch( d+'/*.css', browserSync.reload);
  gulp.watch( d+'/*.html', browserSync.reload);
  gulp.watch( d+'/*.js', browserSync.reload);
});

gulp.task('default', function (callback) {
  runSequence(['browserSync', 'watch'],
    callback
  )
});
