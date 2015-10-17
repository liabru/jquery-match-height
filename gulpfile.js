// TODO: build task
// TODO: minify task
// TODO: eslint task
// TODO: cloud selenium server to test more browsers
// TODO: add more test specs (see matchHeight.spec.js)
// TODO: travis CI

var gulp = require('gulp');
var webdriver = require('gulp-webdriver');
var webserver = require('gulp-webserver');

gulp.task('test', function() {
    return gulp.src('test/conf/wdio.conf.js').pipe(webdriver());
});

gulp.task('serve', function() {
  gulp.src('.')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: 'http://localhost:8000/test/page/test.html'
    }));
});