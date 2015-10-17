exports.config = {
    capabilities: [
        {
            browserName: 'firefox'
        },
        {
            browserName: 'chrome'
        },
        {
            browserName: 'internet explorer'
        }
    ],
    specs: [
        './test/specs/webdriver.spec.js'
    ],
    logLevel: 'silent',
    coloredLogs: true,
    waitforTimeout: 10000,
    framework: 'jasmine',
    reporter: 'spec',
    jasmineNodeOpts: {
        defaultTimeoutInterval: 10000
    }
};
