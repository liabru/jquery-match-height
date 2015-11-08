<a name="0.6.0"></a>
# 0.6.0 (2015-03-31)

### release summary

- added options parameter
- added `property` option
- added `target` option
- added callback events
- added maintain scroll
- added inline-block support
- added hidden elements support
- improved performance and throttling
- improved demo

- fixed declaration order issue when using requirejs
- fixed issues for people using build concatenation
- fixed data api issue with missing data-mh
- fixed IE8 border calculation
- fixed Safari row detection
- fixed inline style preservation

### commit log

* Fix usage of data-mh attribute ([816850d](https://github.com/liabru/jquery-match-height/commit/816850d))
* Improve support when concatenated or minified ([09c4b1a](https://github.com/liabru/jquery-match-height/commit/09c4b1a))
* Merge branch 'kwoodfriend-patch-1' ([dde46f9](https://github.com/liabru/jquery-match-height/commit/dde46f9))
* Merge branch 'nyordanov-master' ([dc77dbe](https://github.com/liabru/jquery-match-height/commit/dc77dbe))
* Merge branch 'patch-1' of https://github.com/kwoodfriend/jquery-match-height into kwoodfriend-patch- ([e009c4c](https://github.com/liabru/jquery-match-height/commit/e009c4c))
* Merge branch 'stefanozoffoli-patch-1' ([c0104c4](https://github.com/liabru/jquery-match-height/commit/c0104c4))
* Preserve inline styles when using byRow ([72ba5cf](https://github.com/liabru/jquery-match-height/commit/72ba5cf))
* added display property tests ([5dafa0c](https://github.com/liabru/jquery-match-height/commit/5dafa0c))
* added gitignore ([d76b02c](https://github.com/liabru/jquery-match-height/commit/d76b02c))
* added local jquery ([9239f4e](https://github.com/liabru/jquery-match-height/commit/9239f4e))
* added maintainScroll functionality, closes #18 ([ee83317](https://github.com/liabru/jquery-match-height/commit/ee83317)), closes [#18](https://github.com/liabru/jquery-match-height/issues/18)
* added support for hidden elements, closes #12 ([9a8944b](https://github.com/liabru/jquery-match-height/commit/9a8944b)), closes [#12](https://github.com/liabru/jquery-match-height/issues/12)
* added support for options, added property option for min-height ([94c9d28](https://github.com/liabru/jquery-match-height/commit/94c9d28))
* added update callback events ([0b31e21](https://github.com/liabru/jquery-match-height/commit/0b31e21))
* avoid call to .is when no target specified ([db9996d](https://github.com/liabru/jquery-match-height/commit/db9996d))
* changed master build description ([6dcc13d](https://github.com/liabru/jquery-match-height/commit/6dcc13d))
* early out on options parser ([b4326d3](https://github.com/liabru/jquery-match-height/commit/b4326d3))
* fix for single item rows, closes #48 ([64b9a54](https://github.com/liabru/jquery-match-height/commit/64b9a54)), closes [#48](https://github.com/liabru/jquery-match-height/issues/48)
* fix handling of hidden elements by row, closes #28 ([71a5151](https://github.com/liabru/jquery-match-height/commit/71a5151)), closes [#28](https://github.com/liabru/jquery-match-height/issues/28)
* fix row detection on safari (windows) ([b52448a](https://github.com/liabru/jquery-match-height/commit/b52448a))
* fix to preserve inline styles ([e9de702](https://github.com/liabru/jquery-match-height/commit/e9de702))
* fix typo in target option, closes #63 ([290dfcf](https://github.com/liabru/jquery-match-height/commit/290dfcf)), closes [#63](https://github.com/liabru/jquery-match-height/issues/63)
* fixed IE8 border reset issue, closes #10 ([246820d](https://github.com/liabru/jquery-match-height/commit/246820d)), closes [#10](https://github.com/liabru/jquery-match-height/issues/10)
* fixed support for inline-block ([b3df801](https://github.com/liabru/jquery-match-height/commit/b3df801))
* fixed throttling issue ([fdc8f7a](https://github.com/liabru/jquery-match-height/commit/fdc8f7a))
* implemented target option ([a01fb70](https://github.com/liabru/jquery-match-height/commit/a01fb70))
* improved readme ([9ba9529](https://github.com/liabru/jquery-match-height/commit/9ba9529))
* preserve inline styles on hidden parents, closes #46 ([4917d6c](https://github.com/liabru/jquery-match-height/commit/4917d6c)), closes [#46](https://github.com/liabru/jquery-match-height/issues/46)
* refactored plugin definition ([467d928](https://github.com/liabru/jquery-match-height/commit/467d928))
* release 0.6.0 ([aef80df](https://github.com/liabru/jquery-match-height/commit/aef80df))
* removed redundant css setter ([6c7e6ad](https://github.com/liabru/jquery-match-height/commit/6c7e6ad))
* reorganised source, closes #27 ([cae21cd](https://github.com/liabru/jquery-match-height/commit/cae21cd)), closes [#27](https://github.com/liabru/jquery-match-height/issues/27)
* skip apply to rows with only one item ([f72ab91](https://github.com/liabru/jquery-match-height/commit/f72ab91))
* updated min file ([56214a1](https://github.com/liabru/jquery-match-height/commit/56214a1))
* updated min file ([9aa96f1](https://github.com/liabru/jquery-match-height/commit/9aa96f1))
* updated min file ([b6f612a](https://github.com/liabru/jquery-match-height/commit/b6f612a))
* updated min file ([128c363](https://github.com/liabru/jquery-match-height/commit/128c363))
* updated readme ([667e516](https://github.com/liabru/jquery-match-height/commit/667e516))
* updated readme ([a30551f](https://github.com/liabru/jquery-match-height/commit/a30551f))
* updated readme with known limitations ([57ee64a](https://github.com/liabru/jquery-match-height/commit/57ee64a))
* updating minified version ([ab3963f](https://github.com/liabru/jquery-match-height/commit/ab3963f))



<a name="0.5.2"></a>
## 0.5.2 (2014-06-10)

### release summary

- improved demo
- added matchHeight('remove')
- added update throttling
- removed forced `display:block` after application

### commit log

* added matchHeight('remove') ([8f5f13f](https://github.com/liabru/jquery-match-height/commit/8f5f13f))
* added updated throttling ([6d9a6a7](https://github.com/liabru/jquery-match-height/commit/6d9a6a7))
* prettier demo ([f7ea426](https://github.com/liabru/jquery-match-height/commit/f7ea426))
* release 0.5.2 ([4b8f8e4](https://github.com/liabru/jquery-match-height/commit/4b8f8e4))
* removed forced `display:block` after application ([a3a058c](https://github.com/liabru/jquery-match-height/commit/a3a058c))
* updated changelog ([ecee5f9](https://github.com/liabru/jquery-match-height/commit/ecee5f9))
* updated readme, changelog, build ([ae0a825](https://github.com/liabru/jquery-match-height/commit/ae0a825))



<a name="0.5.1"></a>
## 0.5.1 (2014-04-15)

### release summary

- fixed IE8 NaN bug when parsing 'auto' properties
- fixed IE8 window resize event loop bug
- fixed compatibility with older jQuery versions
- added bower package file
- added jquery package file

### commit log

* Making the library compatible with old jQuery versions < 1.7 ([4c3f945](https://github.com/liabru/jquery-match-height/commit/4c3f945))
* Making the library compatible with old jQuery versions < 1.7 ([7d467aa](https://github.com/liabru/jquery-match-height/commit/7d467aa))
* Merge pull request #3 from dcorb/master ([18a6fa1](https://github.com/liabru/jquery-match-height/commit/18a6fa1))
* added CHANGELOG ([b1ed72d](https://github.com/liabru/jquery-match-height/commit/b1ed72d))
* added bower package ([56c9902](https://github.com/liabru/jquery-match-height/commit/56c9902))
* added minified version ([44c4554](https://github.com/liabru/jquery-match-height/commit/44c4554))
* fixed IE8 NaN bug when parsing 'auto' properties ([702eea6](https://github.com/liabru/jquery-match-height/commit/702eea6))
* fixed IE8 window resize event loop bug ([22b74da](https://github.com/liabru/jquery-match-height/commit/22b74da))
* increment version ([0cb6082](https://github.com/liabru/jquery-match-height/commit/0cb6082))
* updated minified build ([3873f7d](https://github.com/liabru/jquery-match-height/commit/3873f7d))
* updated readme ([b62297b](https://github.com/liabru/jquery-match-height/commit/b62297b))



<a name="0.5.0"></a>
# 0.5.0 (2014-03-02)

### release summary

- initial release

### commit log

* added jquery package file ([3fdbeae](https://github.com/liabru/jquery-match-height/commit/3fdbeae))
* initial commit ([35b8209](https://github.com/liabru/jquery-match-height/commit/35b8209))
* updated readme ([ae41130](https://github.com/liabru/jquery-match-height/commit/ae41130))
* updated readme ([6e1b0f8](https://github.com/liabru/jquery-match-height/commit/6e1b0f8))



