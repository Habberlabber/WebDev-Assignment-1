/*
|--------------------------------------------------------------------------
| GULP TASKS FOR BROWSERSYNC
|--------------------------------------------------------------------------
|
| This file contains Gulp tasks for BrowserSync
|
*/

const gulp = require('gulp');

const conf = require('../gulpconfig');

// Task for initializing browsersync 
gulp.task('browser-sync', function() {
  return global.browserSync.init({
    server: {
      baseDir: conf.path.dest.base,
    },
    injectchanges: true,
  });
});