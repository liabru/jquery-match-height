describe('matchHeight webdriver', function() {
    var runAllTests = function(done, width, height) {
        browser
        .setViewportSize({ width: width, height: height })
        .url('http://localhost:8000/test/page/test.html')
        .waitForExist('.jasmine_html-reporter', 5000)
        .execute(function() {
            return {
                total: window.specsPassed + window.specsFailed,
                passed: window.specsPassed,
                failed: window.specsFailed
            };
        })
        .then(function(ret) {
            expect(ret.value.passed).toBe(ret.value.total, 'number of specs passed');
            expect(ret.value.failed).toBe(0, 'number of specs failed');
        }).call(done);
    };

    it('passes matchHeight.spec.js at desktop breakpoint', function(done) {
        runAllTests(done, 1280, 1024);
    });

    it('passes matchHeight.spec.js at tablet breakpoint', function(done) {
        runAllTests(done, 640, 480);
    });

    it('passes matchHeight.spec.js at mobile breakpoint', function(done) {
        runAllTests(done, 320, 640);
    });
});