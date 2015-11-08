var async = require('async');

describe('matchHeight webdriver', function() {
    var runAllTests = function(pageUrls, width, height, done) {
        var next = browser;

        if (typeof width === 'number' && typeof height === 'number') {
            next = next.setViewportSize({ width: width, height: height })
                   .windowHandlePosition({ x: 0, y: 0 });
        } else {
            done = width;
        }

        async.eachSeries(pageUrls, function(pageUrl, callback) {
            next = next.url(pageUrl)
                .waitForExist('.jasmine_html-reporter', 60000)
                .execute(function() {
                    return {
                        total: window.specsPassed.concat(window.specsFailed),
                        passed: window.specsPassed,
                        failed: window.specsFailed
                    };
                })
                .then(function(ret) {
                    var message = ret.value.failed.join(', ') + ' failed on ' + pageUrl;
                    expect(ret.value.passed.length).toBe(ret.value.total.length, message);

                    if (browser.options.pauseOnFail && ret.value.passed.length !== ret.value.total.length) {
                       console.log(message);
                       console.log('paused on failure...');
                       next = next.pause(99999999);
                    }
                })
                .then(callback);
        }, done);
    };

    var urls = browser.desiredCapabilities.urls,
        viewports = browser.desiredCapabilities.viewports;

    if (viewports) {
        for (var i = 0; i < viewports.length; i += 1) {
            (function(width, height) {
                it('passes matchHeight.spec.js at viewport ' + width + 'x' + height, function(done) {
                    runAllTests(urls, width, height, function() {
                        done();
                    });
                });
            })(viewports[i][0], viewports[i][1]);
        }
    } else {
        it('passes matchHeight.spec.js', function(done) {
            runAllTests(urls, function() {
                done();
            });
        });
    }
});