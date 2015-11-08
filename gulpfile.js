// TODO: add more test specs (see matchHeight.spec.js)
// TODO: travis CI

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var header = require('gulp-header');
var eslint = require('gulp-eslint');
var gulpBump = require('gulp-bump');
var changelog = require('gulp-conventional-changelog');
var tag = require('gulp-tag-version');
var sequence = require('run-sequence');
var webdriver = require('gulp-webdriver');
var webserver = require('gulp-webserver');
var selenium = require('selenium-standalone');
var browserStack = require('gulp-browserstack');
var staticTransform = require('connect-static-transform');
var privateConfig = require('./test/conf/private.conf.js').config;
var pkg = require('./package.json');
var server;

gulp.task('release', function(callback) {
    var type = process.argv[4] || 'minor';
    sequence('lint', 'test', 'build', 'bump:' + type, 'changelog', 'tag', callback);
});

gulp.task('build', function() {
    return gulp.src(pkg.main)
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '-min' }))
        .pipe(gulp.dest('.'));
});

gulp.task('lint', function() {
    return gulp.src(pkg.main)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

var bump = function(options) {
    return gulp.src(['package.json', 'bower.json'])
        .pipe(gulpBump(options))
        .pipe(gulp.dest('.'));
};

gulp.task('bump:patch', function() {
    return bump({ type: 'patch' });
});

gulp.task('bump:minor', function() {
    return bump({ type: 'minor' });
});

gulp.task('bump:major', function() {
    return bump({ type: 'major' });
});

gulp.task('tag', function() {
    return gulp.src('package.json')
        .pipe(tag({ prefix: '' }));
});

gulp.task('changelog', function () {
    return gulp.src('CHANGELOG.md')
        .pipe(changelog())
        .pipe(gulp.dest('.'));
});

gulp.task('serve', function() {
    server = gulp.src('.')
        .pipe(webserver({
            host: '0.0.0.0',
            //livereload: true,
            directoryListing: true,
            middleware: function(req, res, next) {
                var ieMode = (req._parsedUrl.query || '').replace('=','');
                if (ieMode in emulateIEMiddleware) {
                    emulateIEMiddleware[ieMode](req, res, next);
                } else {
                    next();
                }
            }
        }));
});

gulp.task('selenium', function(done) {
    console.log('Setting up Selenium server...');
    selenium.install({
        logger: function(message) { console.log(message); }
    }, function(err) {
        if (err) {
            done(err);
            return;
        }
        console.log('Starting Selenium server...');
        selenium.start(function(err, child) {
            console.log('Selenium server started');
            selenium.child = child;
            done(err);
        });
    });
});

gulp.task('test', ['serve', 'selenium'], function(done) {
    var error;
    console.log('Starting webdriver...');

    var finish = function(err) {
        console.log('Webdriver stopped');
        selenium.child.kill();
        console.log('Selenium server stopped');
        if (server) {
            try {
                server.emit('kill');
            } catch(e) {}
            console.log('Web server stopped');
        }
        done(error || err);
    };

    gulp.src('test/conf/local.conf.js')
        .pipe(webdriver())
        .on('error', function(err) { error = err; })
        .on('finish', finish);
});

gulp.task('test:cloud', ['serve'], function(done) {
    gulp.src('test/conf/cloud.conf.js')
    .pipe(browserStack.startTunnel({
        key: privateConfig.key,
        hosts: [{
            name: 'localhost',
            port: 8000,
            sslFlag: 0
        }]
    }))
    .pipe(webdriver())
    .pipe(browserStack.stopTunnel())
    .on('finish', function(err) {
        if (server) {
            try {
                server.emit('kill');
            } catch(e) {}
            console.log('Web server stopped');
        }
        done(err);
    });
});

gulp.task('test:cloud:all', function(done) {
    return gulp
    .src('test/conf/cloud-all.conf.js')
    .pipe(browserStack.startTunnel({
        key: privateConfig.key,
        hosts: [{
            name: 'localhost',
            port: 8000,
            sslFlag: 0
        }]
    }))
    .pipe(webdriver())
    .pipe(browserStack.stopTunnel());
});

var banner = [
  '/*',
  '* <%= pkg.name %> v<%= pkg.version %> by @liabru',
  '* <%= pkg.homepage %>',
  '* License <%= pkg.license %>',
  '*/',
  ''
].join('\n');

var emulateIEMiddlewareFactory = function(version) {
    return staticTransform({
        root: __dirname,
        match: /(.+)\.html/,
        transform: function (path, text, send) {
            send(text.replace('content="IE=edge,chrome=1"', 'content="IE=' + version + '"'));
        }
    });
};

var emulateIEMiddleware = {
    'ie8': emulateIEMiddlewareFactory(8),
    'ie9': emulateIEMiddlewareFactory(9),
    'ie10': emulateIEMiddlewareFactory(10)
};