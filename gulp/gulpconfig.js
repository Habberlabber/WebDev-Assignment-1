/*
|--------------------------------------------------------------------------
| GULP CONFIG FILE
|--------------------------------------------------------------------------
|
| This file is used to manage configuration and options across the gulp task files
|
*/

// Defining variables for source and destination folders
var src = 'src';
var dest = 'dist';

// Defining paths for use across task files
module.exports = {
  path: {
    src: {
      base: src,
      scss: src + '/styles',
      assets: src + '/assets',
      scripts: {
        base: src + '/scripts',
        vendor: src + '/scripts/vendor',
      }
    },
    dest: {
      base: dest,
      css: dest + '/styles',
      assets: dest + '/assets',
      scripts: {
        base: dest + '/scripts',
        vendor: dest + '/scripts/vendor',
      }
    },
  },
};