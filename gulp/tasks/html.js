/*
|--------------------------------------------------------------------------
| GULP HTML TASKS
|--------------------------------------------------------------------------
|
| This file contains the Gulp tasks related to html
|
*/

const gulp = require('gulp');
const conf = require('../gulpconfig');

// Task that moves html files to the destination folder
gulp.task('html', function() {
  gulp.src(conf.path.src.base + '/**/*.html')
    .pipe(gulp.dest(conf.path.dest.base));
});

// Task used to move HTML and update browserSync 
gulp.task('html:watch', ['html'], function() {
  return global.browserSync.reload('*');
});