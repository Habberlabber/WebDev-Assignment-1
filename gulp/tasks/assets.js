/*
|--------------------------------------------------------------------------
| GULP TASKS FOR ASSETS
|--------------------------------------------------------------------------
|
| This file contains Gulp tasks for handeling assets
|
*/

const gulp = require('gulp');
const conf = require('../gulpconfig');

// Task that moves asset files to the destination folder
gulp.task('assets', function() {
  gulp.src(conf.path.src.assets + '/**/**.*')
    .pipe(gulp.dest(conf.path.dest.assets));
});

// Task used to move HTML and update browserSync 
gulp.task('assets:watch', ['assets'], function() {
  return global.browserSync.reload('*');
});