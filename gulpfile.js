/*
|--------------------------------------------------------------------------
| GULPFILE.JS
|--------------------------------------------------------------------------
|
| The main gulpfile imports the gulp partials from ./gulp/tasks
| This file should only define simple broad tasks dependent on other tasks
|
*/

const gulp        = require('gulp');
const requireDir  = require('require-dir');
const browserSync = require('browser-sync').create();

global.browserSync = browserSync;

requireDir('./gulp/tasks', {recurse: false});

gulp.task('default', ['watch']);

gulp.task('build', ['html', 'assets', 'css', 'scripts']);