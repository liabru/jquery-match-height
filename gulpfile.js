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
var gutil = require('gulp-util');
var replace = require('gulp-replace');
var webdriver = require('gulp-webdriver');
var webserver = require('gulp-webserver');
var selenium = require('selenium-standalone');
var ngrok = require('ngrok');
var staticTransform = require('connect-static-transform');
var privateConfig = require('./test/conf/private.conf.js').config;
var pkg = require('./package.json');
var extend = require('util')._extend;
var server;

gulp.task('release', function(callback) {
    var type = process.argv[4] || 'minor';
    sequence('lint', 'test', 'build', 'bump:' + type, 'changelog', 'tag', callback);
});

gulp.task('build', function() {
    build = extend(pkg)
    build.version = process.argv[4] || pkg.version;
    return gulp.src(pkg.main)
        .pipe(replace("version = 'master'", "version = '" + build.version + "'"))
        .pipe(uglify({ output: { max_line_len: 500 } }))
        .pipe(header(banner, { build: build }))
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
    process.on('uncaughtException', function(err) {
        if (err.errno === 'EADDRINUSE') {
            gutil.log('Server already running (or port is otherwise in use)');
        }
    });     

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
    gutil.log('Setting up Selenium server...');
    selenium.install({
        logger: function(message) { gutil.log(message); }
    }, function(err) {
        if (err) {
            done(err);
            return;
        }
        gutil.log('Starting Selenium server...');
        selenium.start(function(err, child) {
            gutil.log('Selenium server started');
            selenium.child = child;
            done(err);
        });
    });
});

gulp.task('test', ['lint', 'serve', 'selenium'], function(done) {
    var error;
    gutil.log('Starting webdriver...');

    var finish = function(err) {
        gutil.log('Webdriver stopped');
        selenium.child.kill();
        gutil.log('Selenium server stopped');
        if (server) {
            try {
                server.emit('kill');
            } catch(e) {}
            gutil.log('Web server stopped');
        }
        done(error || err);
    };


    gulp.src('test/conf/local.conf.js')
        .pipe(webdriver({
            baseUrl: 'http://localhost:8000'
        }))
        .on('error', function(err) { error = err; })
        .on('finish', finish);
});

gulp.task('test:cloud', ['lint', 'serve'], function(done) {
    ngrok.connect({
        authtoken: null,
        port: 8000
    }, function (err, url) {
        gutil.log('Tunnel started', url);
        gulp.src('test/conf/cloud.conf.js')
        .pipe(webdriver({
            baseUrl: url
        }))
        .on('finish', function(err) {
            if (server) {
                try {
                    server.emit('kill');
                } catch(e) {}
                ngrok.disconnect();
                ngrok.kill();
                gutil.log('Tunnel stopped');
                gutil.log('Web server stopped');
            }
            done(err);
        });
    });
});

gulp.task('test:cloud:all', ['lint', 'serve'], function(done) {
    ngrok.connect({
        authtoken: null,
        port: 8000
    }, function (err, url) {
        gutil.log('Tunnel started', url);
        gulp.src('test/conf/cloud-all.conf.js')
        .pipe(webdriver({
            baseUrl: url
        }))
        .on('finish', function(err) {
            if (server) {
                try {
                    server.emit('kill');
                } catch(e) {}
                ngrok.disconnect();
                ngrok.kill();
                gutil.log('Tunnel stopped');
                gutil.log('Web server stopped');
            }
            done(err);
        });
    });
});

var banner = [
  '/*',
  '* <%= build.name %> <%= build.version %> by @liabru',
  '* <%= build.homepage %>',
  '* License <%= build.license %>',
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