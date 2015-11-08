// NOTE: these test specs are a work in progress
// manual testing before going into production is still advised!
// the following features are implemented, but do not have specs yet:

// TODO: spec for $(elements).matchHeight({ property: 'min-height' })
// TODO: spec for $(elements).matchHeight({ remove: true })
// TODO: spec for events: ready, load, resize, orientationchange
// TODO: spec for $.fn.matchHeight._groups
// TODO: spec for $.fn.matchHeight._throttle
// TODO: spec for $.fn.matchHeight._maintainScroll
// TODO: spec for handling box-sizing, padding, margin, border


describe('matchHeight', function() {
    beforeEach(function(){
      jasmine.addMatchers({
        toBeWithinTolerance: function() {
          return {
            compare: function(actual, expected, tolerance) {
              if (tolerance !== 0) {
                tolerance = tolerance || 1;
              }

              return {
                pass: Math.abs(expected - actual) <= tolerance
              };
            }
          }
        }
      });
    });

    it('has been defined', function(done) {
        var matchHeight = $.fn.matchHeight;
        expect(typeof matchHeight).toBe('function');
        expect(testHelper.isArray(matchHeight._groups)).toBe(true);
        expect(typeof matchHeight._throttle).toBe('number');
        expect(typeof matchHeight._maintainScroll).toBe('boolean');
        expect(typeof matchHeight._rows).toBe('function');
        expect(typeof matchHeight._apply).toBe('function');
        expect(typeof matchHeight._applyDataApi).toBe('function');
        expect(typeof matchHeight._update).toBe('function');
        done();
    });

    it('has matched heights automatically after images load', function(done) {
        var $items = $('.image-items'),
            currentBreakpoint = testHelper.getCurrentBreakpoint(),
            item0Height = $items.find('.item-0').outerHeight(),
            item1Height = $items.find('.item-1').outerHeight(),
            item2Height = $items.find('.item-2').outerHeight(),
            item3Height = $items.find('.item-3').outerHeight();

        if (currentBreakpoint === 'mobile') {
            // all heights will be different
        } else if (currentBreakpoint === 'tablet') {
            expect(item0Height).toBeWithinTolerance(item1Height);
            expect(item2Height).toBeWithinTolerance(item3Height);
        } else if (currentBreakpoint === 'desktop') {
            expect(item0Height).toBeWithinTolerance(item3Height);
            expect(item1Height).toBeWithinTolerance(item3Height);
            expect(item2Height).toBeWithinTolerance(item3Height);
        }

        done();
    });

    it('has found rows correctly', function(done) {
        var $items = $('.simple-items').children('.item'),
            rows = $.fn.matchHeight._rows($items),
            currentBreakpoint = testHelper.getCurrentBreakpoint(),
            expectedNumberCols = 4,
            expectedNumberRows = 2;

        if (testHelper.isMediaQueriesSupported) {
            if (currentBreakpoint === 'mobile') {
                expectedNumberCols = 1;
                expectedNumberRows = 8;
            } else if (currentBreakpoint === 'tablet') {
                expectedNumberCols = 2;
                expectedNumberRows = 4;
            }
        }

        expect(rows.length).toBe(expectedNumberRows);

        $.each(rows, function(i, $row) {
            expect($row.length).toBe(expectedNumberCols);

            $row.each(function(j, item) {
                expect($(item).hasClass('item-' + ((i * expectedNumberCols) + j))).toBe(true);
            });
        });

        done();
    });

    it('has matched heights when byRow true', function(done) {
        // test custom toBeWithinTolerance matcher
        expect(-1.0001).not.toBeWithinTolerance(0);
        expect(-1).toBeWithinTolerance(0);
        expect(-0.1).toBeWithinTolerance(0);
        expect(0).toBeWithinTolerance(0);
        expect(0.1).toBeWithinTolerance(0);
        expect(1).toBeWithinTolerance(0);
        expect(1.0001).not.toBeWithinTolerance(0);

        $('.simple-items, .image-items, .nested-items-parent, .nested-items,' +
          '.fixed-items, .inline-block-items, .inline-flex-items, .items-with-float')
        .each(function() {
            var $items = $(this).children('.item'),
                rows = $.fn.matchHeight._rows($items);

            $.each(rows, function(index, $row) {
                var targetHeight = $row.first().outerHeight(),
                    maxNaturalHeight = 0;

                $row.each(function() {
                    var $item = $(this),
                        heightCss = $item.css('height'),
                        actualHeight = $item.outerHeight();

                    $item.css('height', '');
                    var naturalHeight = $item.outerHeight();
                    $item.css('height', heightCss);

                    expect(actualHeight).toBeWithinTolerance(targetHeight);

                    if (naturalHeight > maxNaturalHeight) {
                        maxNaturalHeight = naturalHeight;
                    }
                });

                expect(targetHeight).toBeWithinTolerance(maxNaturalHeight);
            });
        });

        done();
    });

    it('has matched heights when byRow false', function(done) {
        $.each($.fn.matchHeight._groups, function() {
            this.options._oldByRow = this.options.byRow;
            this.options.byRow = false;
        });

        $.fn.matchHeight._update();

        $('.simple-items, .image-items,' +
          '.fixed-items, .inline-block-items, .inline-flex-items, .items-with-float')
        .each(function() {
            var $items = $(this).children('.item'),
                targetHeight = $items.first().outerHeight(),
                maxNaturalHeight = 0;

            $items.each(function() {
                var $item = $(this),
                    heightCss = $item.css('height'),
                    actualHeight = $item.outerHeight();

                $item.css('height', '');
                var naturalHeight = $item.outerHeight();
                $item.css('height', heightCss);

                expect(actualHeight).toBeWithinTolerance(targetHeight);

                if (naturalHeight > maxNaturalHeight) {
                    maxNaturalHeight = naturalHeight;
                }
            });

            // TODO: solve this for .nested-items-parent, .nested-items
            expect(targetHeight).toBeWithinTolerance(maxNaturalHeight);
        });

        $.each($.fn.matchHeight._groups, function() {
            this.options.byRow = this.options._oldByRow;
            delete this.options._oldByRow;
        });

        $.fn.matchHeight._update();

        done();
    });

    it('has matched heights for hidden items', function(done) {
        $('body').removeClass('test-hidden');

        $('.hidden-items .item-2 .items-container, .hidden-items .item-3 .items-container')
        .each(function() {
            var $items = $(this).children('.item'),
                rows = $.fn.matchHeight._rows($items);

            $.each(rows, function(index, $row) {
                var targetHeight = $row.first().outerHeight(),
                    maxNaturalHeight = 0;

                $row.each(function() {
                    var $item = $(this),
                        heightCss = $item.css('height'),
                        actualHeight = $item.outerHeight();

                    $item.css('height', '');
                    var naturalHeight = $item.outerHeight();
                    $item.css('height', heightCss);

                    expect(actualHeight).toBeWithinTolerance(targetHeight);

                    if (naturalHeight > maxNaturalHeight) {
                        maxNaturalHeight = naturalHeight;
                    }
                });

                expect(targetHeight).toBeWithinTolerance(maxNaturalHeight);
            });
        });

        $('body').addClass('test-hidden');

        done();
    });

    it('has matched heights when using data api', function(done) {
        var $items = $('.data-api-items'),
            currentBreakpoint = testHelper.getCurrentBreakpoint(),
            item0Height = $items.find('.item-0').outerHeight(),
            item1Height = $items.find('.item-1').outerHeight(),
            item2Height = $items.find('.item-2').outerHeight(),
            item3Height = $items.find('.item-3').outerHeight();

        if (currentBreakpoint !== 'mobile') {
            expect(item0Height).toBeWithinTolerance(item1Height);
            expect(item2Height).toBeWithinTolerance(item3Height);
            expect(item0Height).not.toBeWithinTolerance(item2Height);
            expect(item1Height).not.toBeWithinTolerance(item3Height);
        }

        done();
    });

    it('has matched heights when using target option', function(done) {
        var $items = $('.target-items'),
            item0Height = $items.find('.item-0').outerHeight(),
            item1Height = $items.find('.item-1').outerHeight(),
            item2Height = $items.find('.item-2').outerHeight(),
            item3Height = $items.find('.item-3').outerHeight();

        expect(item0Height).toBeWithinTolerance(item1Height);
        expect(item2Height).toBeWithinTolerance(item1Height);
        expect(item3Height).toBeWithinTolerance(item1Height);

        done();
    });

    it('can manually update heights and fires global callbacks', function(done) {
        var currentBreakpoint = testHelper.getCurrentBreakpoint(),
            calledBefore = false,
            calledAfter = false;

        var oldBefore = $.fn.matchHeight._beforeUpdate,
            oldAfter = $.fn.matchHeight._afterUpdate;

        // set some test update callbacks
        $.fn.matchHeight._beforeUpdate = function() {
            calledBefore = true;
        };

        $.fn.matchHeight._afterUpdate = function() {
            calledAfter = true;
        };

        // add more content to one of the items to change it's height
        $('.simple-items .item-1').append('<p>Test content update.</p>');

        // call update which should match heights again
        $.fn.matchHeight._update();

        if (currentBreakpoint === 'mobile') {
            // all heights will be different
        } else {
            // check item heights are as expected
            $('.simple-items').each(function() {
                var $items = $(this).children('.item'),
                    rows = $.fn.matchHeight._rows($items);

                $.each(rows, function(index, $row) {
                    var targetHeight = $row.first().outerHeight(),
                        maxNaturalHeight = 0;

                    $row.each(function() {
                        var $item = $(this),
                            heightCss = $item.css('height'),
                            actualHeight = $item.outerHeight();

                        $item.css('height', '');
                        var naturalHeight = $item.outerHeight();
                        $item.css('height', heightCss);

                        expect(actualHeight).toBeWithinTolerance(targetHeight);

                        if (naturalHeight > maxNaturalHeight) {
                            maxNaturalHeight = naturalHeight;
                        }
                    });

                    expect(targetHeight).toBeWithinTolerance(maxNaturalHeight);
                });
            });
        }

        // check callbacks were fired
        expect(calledBefore).toBe(true);
        expect(calledAfter).toBe(true);

        // revert callbacks
        $.fn.matchHeight._beforeUpdate = oldBefore;
        $.fn.matchHeight._afterUpdate = oldAfter;

        done();
    });

    it('parses numbers and NaN', function(done) {
        var _parse = $.fn.matchHeight._parse;
        expect(_parse(1)).toBe(1);
        expect(_parse(1.1)).toBe(1.1);
        expect(_parse('1')).toBe(1);
        expect(_parse('1.1')).toBe(1.1);
        expect(_parse(NaN)).toBe(0);
        done();
    });

    it('parses options', function(done) {
        var _parseOptions = $.fn.matchHeight._parseOptions,
            defaultOptions = {
                byRow: true,
                property: 'height',
                target: null,
                remove: false
            };

        expect(_parseOptions()).toEqual(defaultOptions);

        expect(_parseOptions({
            byRow: false,
            property: 'min-height',
            target: null,
            remove: true
        })).toEqual({
            byRow: false,
            property: 'min-height',
            target: null,
            remove: true
        });

        expect(_parseOptions('remove')).toEqual({
            byRow: defaultOptions.byRow,
            property: defaultOptions.property,
            target: defaultOptions.target,
            remove: true
        });

        expect(_parseOptions(true)).toEqual({
            byRow: true,
            property: defaultOptions.property,
            target: defaultOptions.target,
            remove: defaultOptions.remove
        });

        expect(_parseOptions(false)).toEqual({
            byRow: false,
            property: defaultOptions.property,
            target: defaultOptions.target,
            remove: defaultOptions.remove
        });

        done();
    });
});


jasmine.getEnv().addReporter({
    suiteStarted: function() {
        window.specsPassed = [];
        window.specsFailed = [];
        $('.test-summary').text('running tests...');
    },
    specDone: function(result) {
        if (result.status === 'passed') {
            window.specsPassed.push(result.id);
        } else {
            window.specsFailed.push(result.id);
        }
    }, 
    suiteDone: function() {
        $('.test-summary')
            .toggleClass('has-passed', window.specsFailed.length === 0)
            .toggleClass('has-failed', window.specsFailed.length !== 0)
            .text(window.specsPassed.length + ' tests passed, ' + window.specsFailed.length + ' failed');
    }
});


var testHelper = {
    isMediaQueriesSupported: typeof (window.matchMedia || window.msMatchMedia) !== 'undefined' || navigator.userAgent.indexOf('MSIE 9.0') >= 0,
    isArray: function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    },
    getCurrentBreakpoint: function() {
        if (testHelper.isMediaQueriesSupported) {
            var windowWidth = $(window).width();
            if (windowWidth <= 640) {
                return 'mobile';
            } else if (windowWidth <= 1024) {
                return 'tablet';
            }
        }

        return 'desktop';
    }
};