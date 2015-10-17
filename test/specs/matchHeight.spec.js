// NOTE: these test specs are a work in progress
// manual testing before going into production is still advised!

// TODO: spec for _parse
// TODO: spec for _parseOptions
// TODO: spec for $(elements).matchHeight({ property: 'min-height' })
// TODO: spec for $(elements).matchHeight({ remove: true })
// TODO: spec for events: ready, load, resize, orientationchange
// TODO: spec for $.fn.matchHeight._update
// TODO: spec for $.fn.matchHeight._beforeUpdate
// TODO: spec for $.fn.matchHeight._afterUpdate
// TODO: spec for $.fn.matchHeight._groups
// TODO: spec for $.fn.matchHeight._throttle
// TODO: spec for $.fn.matchHeight._maintainScroll
// TODO: spec for handling box-sizing, padding, margin, border


describe('matchHeight', function() {
    it('has been defined', function(done) {
        var matchHeight = $.fn.matchHeight;
        expect(typeof matchHeight).toBe('function');
        expect(Array.isArray(matchHeight._groups)).toBe(true);
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
            image0Width = $items.find('.item-0 img')[0].naturalWidth,
            item0Height = $items.find('.item-0').outerHeight(),
            item1Height = $items.find('.item-1').outerHeight(),
            item2Height = $items.find('.item-2').outerHeight(),
            item3Height = $items.find('.item-3').outerHeight();

        expect(image0Width).toBe(800);

        if (currentBreakpoint === 'mobile') {
            // all heights will be different
        } else if (currentBreakpoint === 'tablet') {
            expect(item0Height).toBe(item1Height);
            expect(item2Height).toBe(item3Height);
        } else if (currentBreakpoint === 'desktop') {
            expect(item0Height).toBe(item3Height);
            expect(item1Height).toBe(item3Height);
            expect(item2Height).toBe(item3Height);
        }

        done();
    });

    it('has found rows correctly', function(done) {
        var $items = $('.simple-items').children('.item'),
            rows = $.fn.matchHeight._rows($items),
            currentBreakpoint = testHelper.getCurrentBreakpoint(),
            expectedNumberCols = 4,
            expectedNumberRows = 2;

        if (currentBreakpoint === 'mobile') {
            expectedNumberCols = 1;
            expectedNumberRows = 8;
        } else if (currentBreakpoint === 'tablet') {
            expectedNumberCols = 2;
            expectedNumberRows = 4;
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
        $('.simple-items, .image-items, .nested-items-parent, .nested-items,' +
          '.fixed-items, .inline-block-items, .inline-flex-items')
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

                    expect(actualHeight).toBe(targetHeight);

                    if (naturalHeight > maxNaturalHeight) {
                        maxNaturalHeight = naturalHeight;
                    }
                });

                expect(targetHeight).toBe(maxNaturalHeight);
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
          '.fixed-items, .inline-block-items, .inline-flex-items')
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

                expect(actualHeight).toBe(targetHeight);

                if (naturalHeight > maxNaturalHeight) {
                    maxNaturalHeight = naturalHeight;
                }
            });

            // TODO: solve this for .nested-items-parent, .nested-items
            expect(targetHeight).toBe(maxNaturalHeight);
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

                    expect(actualHeight).toBe(targetHeight);

                    if (naturalHeight > maxNaturalHeight) {
                        maxNaturalHeight = naturalHeight;
                    }
                });

                expect(targetHeight).toBe(maxNaturalHeight);
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
            expect(item0Height).toBe(item1Height);
            expect(item2Height).toBe(item3Height);
            expect(item0Height).not.toBe(item2Height);
            expect(item1Height).not.toBe(item3Height);
        }

        done();
    });

    it('has matched heights when using target option', function(done) {
        var $items = $('.target-items'),
            item0Height = $items.find('.item-0').outerHeight(),
            item1Height = $items.find('.item-1').outerHeight(),
            item2Height = $items.find('.item-2').outerHeight(),
            item3Height = $items.find('.item-3').outerHeight();

        expect(item0Height).toBe(item1Height);
        expect(item2Height).toBe(item1Height);
        expect(item3Height).toBe(item1Height);

        done();
    });
});


jasmine.getEnv().addReporter({
    suiteStarted: function() {
        window.specsPassed = 0;
        window.specsFailed = 0;
        $('.test-summary').text('running tests...');
    },
    specDone: function(result) {
        if (result.status === 'passed') {
            window.specsPassed += 1;
        } else {
            window.specsFailed += 1;
        }
    }, 
    suiteDone: function() {
        $('.test-summary')
            .toggleClass('has-passed', window.specsFailed === 0)
            .toggleClass('has-failed', window.specsFailed !== 0)
            .text(window.specsPassed + ' tests passed, ' + window.specsFailed + ' failed');
    }
});


var testHelper = {
    getCurrentBreakpoint: function() {
        var windowWidth = $(window).width();

        if (windowWidth <= 640) {
            return 'mobile';
        } else if (windowWidth <= 1024) {
            return 'tablet';
        }

        return 'desktop';
    }
};