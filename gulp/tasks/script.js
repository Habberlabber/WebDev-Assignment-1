/*
|--------------------------------------------------------------------------
| GULP SCRIPT TASKS
|--------------------------------------------------------------------------
|
| This file contains the Gulp tasks related to scripts
|
*/

const gulp = require('gulp');
const conf = require('../gulpconfig');

// Moves vendor and custom scripts to the destination
gulp.task('scripts', ['scripts:vendor', 'scripts:custom']);

// Moves npm dependencie and custom vendor scripts to the vender script destination location
gulp.task('scripts:custom', function() {
  gulp.src(conf.path.src.scripts.base + '/*.js')
    .pipe(gulp.dest(conf.path.dest.scripts.base));
});

// Moves npm dependencie and custom vendor scripts to the vender script destination location
gulp.task('scripts:vendor', ['scripts:uikit', 'scripts:jquery']);

// Moves jquery scripts to the vender script location
gulp.task('scripts:uikit', function() {
  gulp.src('node_modules/uikit/dist/js/uikit.js')
    .pipe(gulp.dest(conf.path.dest.scripts.vendor));
});
// Moves jquery scripts to the vender script location
gulp.task('scripts:jquery', function() {
  gulp.src('node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest(conf.path.dest.scripts.vendor));
});


gulp.task('scripts:custom:watch', ['scripts:custom'], function() {
  return global.browserSync.reload(conf.path.dest.scripts.base);
});