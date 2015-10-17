// TODO: run these tests for all breakpoints

describe('matchHeight browser tests', function() {
    it('passes all specs in matchHeight.spec.js', function(done) {
        browser
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
    });
});