# jquery.matchHeight.js #

*matchHeight* makes the height of all selected elements exactly equal.

[brm.io/jquery-match-height](http://brm.io/jquery-match-height/)

I needed a more robust version of the common [equal heights](https://www.google.com/search?q=jquery+equal+heights) plugin.
So matchHeight improves on these by adding features and handling the edge cases where the others tend to fail in practice.

### Demo

See the [jquery.matchHeight.js demo](http://brm.io/jquery-match-height-demo).

[![jquery.matchHeight.js screenshot](http://brm.io/img/content/jquery-match-height/jquery-match-height.png)](http://brm.io/jquery-match-height-demo)

### Features

- row aware, handles floating elements
- responsive, automatically updates on window resize (can be throttled for performance)
- handles mixed `padding`, `margin`, `border` values (even if every element has them different)
- accounts for `box-sizing`
- handles images and other media (updates automatically after loading)
- data attributes API
- tested in IE8+, Chrome, Firefox, Chrome Android
- can be removed when needed

### Status

Current version is `v0.5.2`. I've fully tested it and it works well, but if you use it make sure you test fully too. 
Please report any [issues](https://github.com/liabru/jquery-match-height/issues) you find.

### Install

[jQuery](http://jquery.com/download/) is required, so include it first.
<br>Download [jquery.matchHeight.js](https://github.com/liabru/jquery-match-height/blob/master/jquery.matchHeight.js) and include the script in your HTML file:

	<script src="jquery.matchHeight.js" type="text/javascript"></script>

#### Or install using [Bower](http://bower.io/)

	bower install matchHeight

### Usage

	$(elements).matchHeight(byRow);

Where `byRow` is a boolean that enables or disables row detection, default is `true`.<br>
You should apply this on the [DOM ready](http://api.jquery.com/ready/) event.

See the included [test.html](https://github.com/liabru/jquery-match-height/blob/master/test.html) for a working example.

### Data API

Use the data attribute `data-match-height="group-name"` (or `data-mh` shorthand) where `group-name` is an arbitrary string to denote which elements should be considered as a group.

All elements with the same group name will be set to the same height when the page is loaded, regardless of their position in the DOM, without any extra code required. 

Note that `byRow` will be enabled when using the data API, if you don't want this then use the above method.

### Removing

It is possible to remove any matchHeight bindings for a given set of elements like so

	$('.item').matchHeight('remove');

### Examples

	$(function() {
		$('.item').matchHeight();
	});

Will set all elements with the class `item` to the height of the tallest.<br>
If the items are on multiple rows, the items of each row will be set to the tallest of that row.

	<div data-mh="my-group">My text</div>
	<div data-mh="my-group">Some other text</div>
	<div data-mh="my-other-group">Even more text</div>
	<div data-mh="my-other-group">The last bit of text</div>

Will set both elements in `my-group` to the same height, then both elements in `my-other-group` to be the same height respectively.

See the included [test.html](https://github.com/liabru/jquery-match-height/blob/master/test.html) for a working example.

### Changelog

To see what's new or changed in the latest version, see the [changelog](https://github.com/liabru/jquery-match-height/blob/master/CHANGELOG.md)

### Advanced Usage

There are a few internal properties and functions you should know about:

	$.fn.matchHeight._groups

The array that contains all element groups that have had `matchHeight` applied. Used for automatically updating on resize events.<br>
Search and modify this array if you need to remove any groups or elements, for example if you're deleting elements.

	$.fn.matchHeight._update()

If you need to manually trigger an update of all currently set equal heights groups, for example if you've modified some content.


	$.fn.matchHeight._apply(elements, byRow)

Use the apply function directly if you wish to avoid the automatic update functionality.

	$.fn.matchHeight._throttle = 80;

By default, the `_update` method is throttled to execute at a maximum rate of once every `80ms`.
Decreasing the above `_throttle` property will update your layout quicker, appearing smoother during resize, at the expense of performance.
If you experience lagging or freezing during resize, you should increase the `_throttle` property.

### Why not use CSS?

Making robust, responsive equal height columns for _arbitrary content_ is [difficult or impossible](http://filamentgroup.com/lab/setting_equal_heights_with_jquery/) to do with CSS alone (at least without hacks or trickery, in a backwards compatible way).

Note you should probably ensure your layout is still usable if JavaScript is disabled.

### License

jquery.matchHeight.js is licensed under [The MIT License (MIT)](http://opensource.org/licenses/MIT)
<br/>Copyright (c) 2014 Liam Brummitt

This license is also supplied with the release and source code.
<br/>As stated in the license, absolutely no warranty is provided.