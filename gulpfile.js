var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test', function() {
  process.stdout.write('\033c');
  gulp.
    src('./test.js').
    pipe(mocha()).
    on('error', function() {    }).
    on('end', function() {    });
});

gulp.task('watch', ['test'], function() {
  gulp.watch(['./*.js'], ['test']);
});

