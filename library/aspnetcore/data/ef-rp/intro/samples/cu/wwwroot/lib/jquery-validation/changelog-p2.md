---
title: "changelog (part 2 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/data/ef-rp/intro/samples/cu/wwwroot/lib/jquery-validation/changelog.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# changelog (part 2 of 4)

## Additionals
* Add statesUS method
* Fix dateITA method to deal with DST bug
* Add persian date method
* Add postalCodeCA method
* Add postalcodeIT method

1.12.0 / 2014-04-01
==================

* Add ARIA testing (3d5658e)
* Add es-AR localization messages. (7b30beb)
* Add missing dots to 'es' and 'es_AR' messages. (a2a653c)
* Added Indonesian (ID) localization (1d348bd)
* Added NIF, NIE and CIF Spanish documents numbers validation (#830, 317c20f)
* Added the current form to the context of the remote ajax request (0a18ae6)
* Additionals: Update IBAN method, trim trailing whitespaces (#970, 347b04a)
* BIC method: Improve RegEx, {1} is always redundant. Closes gh-744 (5cad6b4)
* Bower: Add Bower.json for package registration (e86ccb0)
* Changes dollar references to 'jQuery', for compability with jQuery.noConflict. Closes gh-754 (2049afe)
* Core: Add "method" field to error list entry (89a15c7)
* Core: Added support for generic messages via data-msg attribute (5bebaa5)
* Core: Allow attributes to have a value of zero (eg min='0') (#854, 9dc0d1d)
* Core: Disable deprecated $.format (#755, bf3b350)
* Core: Fix support for multiple error classes (c1f0baf)
* Core: Ignore events on ignored elements (#700, a864211)
* Core: Improve elementValue method (6c041ed)
* Core: Make element() handle ignored elements properly. (3f464a8)
* Core: Switch dataRules parsing to W3C HTML5 spec style (460fd22)
* Core: Trigger success on optional but have other successful validators (#851, f93e1de)
* Core: Use plain element instead of un-wrapping the element again (03cd4c9)
* Core: make sure remote is executed last (#711, ad91b6f)
* Demo: Use correct option in multipart demo. (#1025, 070edc7)
* Fix $/jQuery usage in additional methods. Fixes #839 (#839, 59bc899)
* Improve Chinese translations (1a0bfe3)
* Initial ARIA-Required implementation (bf3cfb2)
* Localization: change accept values to extension. Fixes #771, closes gh-793. (#771, 12edec6)
* Messages: Add icelandic localization (dc88575)
* Messages: Add missing dots to 'bg', 'fr' and 'sr' messages. (adbc636)
* Messages: Create messages_sr_lat.js (f2f9007)
* Messages: Create messages_tj.js (de830b3)
* Messages: Fix sr_lat translation, add missing space (880ba1c)
* Messages: Update messages_sr.js, fix missing space (10313f4)
* Methods: Add additional method for currency (1a981b4)
* Methods: Adding Smart Quotes to stripHTML's punctuation removal (aa0d624)
* Methods: Fix dateITA method, avoiding summertime errors (279b932)
* Methods: Localized methods for chilean culture (es-CL) (cf36b93)
* Methods: Update email to use HTML5 regex, remove email2 method (#828, dd162ae)
* Pattern method: Remove delimiters, since HTML5 implementations don't include those either. (37992c1)
* Restricting credit card validator to include length check. Closes gh-772 (f5f47c5)
* Update messages_ko.js - closes gh-715 (5da3085)
* Update messages_pt_BR.js. Closes gh-782 (4bf813b)
* Update phonesUK and mobileUK to accept new prefixes. Closes gh-750 (d447b41)
* Verify nine-digit zip codes. Closes gh-726 (165005d)
* phoneUS: Add N11 exclusions. Closes gh-861 (519bbc6)
* resetForm should clear any aria-invalid values (4f8a631)
* valid(): Check all elements. Fixes #791 - valid() validates only the first (invalid) element (#791, 6f26803)

1.11.1 / 2013-03-22
==================

  * Revert to also converting parameters of range method to numbers. Closes gh-702
  * Replace most usage of PHP with mockjax handlers. Do some demo cleanup as well, update to newer masked-input plugin. Keep captcha demo in PHP. Fixes #662
  * Remove inline code highlighting from milk demo. View source works fine.
  * Fix dynamic-totals demo by trimming whitespace from template content before passing to jQuery constructor
  * Fix min/max validation. Closes gh-666. Fixes #648
  * Fixed 'messages' coming up as a rule and causing an exception after being updated through rules("add"). Closes gh-670, fixes #624
  * Add Korean (ko) localization. Closes gh-671
  * Improved the UK postcode method to filter out more invalid postcodes. Closes #682
  * Update messages_sv.js. Closes #683
  * Change grunt link to the project website. Closes #684
  * Move remote method down the list to run last, after all other methods applied to a field. Fixes #679
  * Update plugin.json description, should include the word 'validate'
  * Fix typos
  * Fix jQuery loader to use path of itself. Fixes nested demos.
  * Update grunt-contrib-qunit to make use of PhantomJS 1.8, when installed through node module 'phantomjs'
  * Make valid() return a boolean instead of 0 or 1. Fixes #109 - valid() does not return boolean value

1.11.0 / 2013-02-04
==================

  * Remove clearing as numbers of `min`, `max` and `range` rules. Fixes #455. Closes gh-528.
  * Update pre-existing labels - fixes #430 closes gh-436
  * Fix $.validator.format to avoid group interpolation, where at least IE8/9 replaces -bash with the match. Fixes #614
  * Fix mimetype regex
  * Add plugin manifest and update headers to just MIT license, drop unnecessary dual-licensing (like jQuery).
  * Hebrew messages: Removed dots at end of sentences - Fixes gh-568
  * French translation for require_from_group validation. Fixes gh-573.
  * Allow groups to be an array or a string - Fixes #479
  * Removed spaces with multiple MIME types
  * Fix some date validations, JS syntax errors.
  * Remove support for metadata plugin, replace with data-rule- and data-msg- (added in 907467e8) properties.
  * Added sftp as a valid url-pattern
  * Add Malay (my) localization
  * Update localization/messages_hu.js
  * Remove focusin/focusout polyfill. Fixes #542 - Inclusion of jquery.validate interfers with focusin and focusout events in IE9
  * Localization: Fixed typo in finnish translation
  * Fix RTM demo to show invalid icon when going from valid back to invalid
  * Fixed premature return in remote function which prevented ajax call from being made in case an input was entered too quickly. Ensures remote validation always validates the newest value.
  * Undo fix for #244. Fixes #521 - E-mail validation fires immediately when text is in the field.

1.10.0 / 2012-09-07
===================

  * Corrected French strings for nowhitespace, phoneUS, phoneUK and mobileUK based upon community feedback.
  * rename files for language_REGION according to the standard ISO_3166-1 (http://en.wikipedia.org/wiki/ISO_3166-1), for Taiwan tha language is Chinese (zh) and the region is Taiwan (TW)
  * Optimise RegEx patterns, especially for UK phone numbers.
  * Add Language Name for each file, rename the language code according to the standard ISO 639 for Estonian, Georgian, Ukrainian and Chinese (http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
  * Added croatian (HR) localization
  * Existing French translations were edited and French translations for the additional methods were added.
  * Merged in changes for specifying custom error messages in data attributes
  * Updated UK Mobile phone number regex for new numbers. Fixes #154
  * Add element to success call with test. Fixes #60
  * Fixed regex for time additional method. Fixes #131
  * resetForm now clears old previousValue on form elements. Fixes #312
  * Added checkbox test to require_from_group and changed require_from_group to use elementValue. Fixes #359
  * Fixed dataFilter response issues in jQuery 1.5.2+. Fixes #405
  * Added jQuery Mobile demo. Fixes #249
  * Deoptimize findByName for correctness. Fixes #82 - $.validator.prototype.findByName breaks in IE7
  * Added US zip code support and test. Fixes #90
  * Changed lastElement to lastActive in keyup, skip validation on tab or empty element. Fixes #244
  * Removed number stripping from stripHtml. Fixes #2
  * Fixed invalid count on invalid to valid remote validation. Fixes #286
  * Add link to file_input to demo index
  * Moved old accept method to extension additional-method, added new accept method to handle standard browser mimetype filtering. Fixes #287 and supersedes #369
  * Disables blur event when onfocusout is set to false. Test added.
  * Fixed value issue for radio buttons and checkboxes. Fixes #363
  * Added test for rangeWords and fixed regex and bounds in method. Fixes #308
  * Fixed TinyMCE Demo and added link on demo page. Fixes #382
  * Changed localization message for min/max. Fixes #273
  * Added pseudo selector for text input types to fix issue with default empty type attribute. Added tests and some test markup. Fixes #217
  * Fixed delegate bug for dynamic-totals demo. Fixes #51
  * Fix incorrect message for alphanumeric validator
  * Removed incorrect false check on required attribute
  * required attribute fix for non-html5 browsers. Fixes #301
  * Added methods "require_from_group" and "skip_or_fill_minimum"
  * Use correct iso code for swedish
  * Updated demo HTML files to use HTML5 doctype
  * Fixed regex issue for decimals without leading zeroes. Added new methods test. Fixes #41
  * Introduce a elementValue method that normalizes only string values (don't touch array value of multi-select). Fixes #116
  * Support for dynamically added submit buttons, and updated test case. Uses validateDelegate. Code from PR #9
  * Fix bad double quote in test fixtures
  * Fix maxWords method to include the upper bound, not exclude it. Fixes #284
  * Fixed grammar error in german range validator message. Fixes #315
  * Fixed handling of multiple class names for errorClass option. Test by Max Lynch. Fixes #280
  * Fix jQuery.format usage, should be $.validator.format. Fixes #329
  * Methods for 'all' UK phone numbers + UK postcodes
  * Pattern method: Convert string param to RegExp. Fixes issue #223
  * grammar error in german localization file
  * Added Estonian localization for messages
  * Improve tooltip handling on themerollered demo
  * Add type="text" to input fields without type attribute to please qSA
  * Update themerollered demo to use tooltip to show errors as overlay.
  * Update themerollered demo to use latest jQuery UI (along with newer jQuery version). Move code around to speed up page load.
  * Fixed min error message broken in Japanese.
  * Update form plugin to latest version. Enhance the ajaxSubmit demo.
  * Drop dateDE and numberDE methods from classRuleSettings, leftover from moving those to localized methods
  * Passing submit event to submitHandler callback
  * Fixed #219 - Fix valid() on elements with dependency-callback or dependency-expression.
  * Improve build to remove dist dir to ensure only the current release gets zipped up

1.9.0
---
* Added Basque (EU) localization
* Added Slovenian (SL) localization
* Fixed issue #127 - Finnish translations has one : instead of ;
* Fixed Russian localization, minor syntax issue
* Added in support for HTML5 input types, fixes #97
* Improved HTML5 support by setting novalidate attribute on the form, and reading the type attribute.
* Fixed showLabel() removing all classes from error element. Remove only settings.validClass. Fixes #151.
* Added 'pattern' to additional-methods to validate against arbitrary regular expressions.
* Improved email method to not allow the dot at the end (valid by RFC, but unwanted here). Fixes #143
* Fixed swedish and norwegian translations, min/max messages got switched. Fixes #181
* Fixed #184 - resetForm: should unset lastElement
* Fixed #71 - improve existing time method and add time12h method for 12h am/pm time format
* Fixed #177 - Fix validation of a single radio or checkbox input
* Fixed #189 - :hidden elements are now ignored by default
* Fixed #194 - Required as attribute fails if jQuery>=1.6 - Use .prop instead of .attr
* Fixed #47, #39, #32 - Allowed credit card numbers to contain spaces as well as dashes (spaces are commonly input by users).

1.8.1
---
* Added Thai (TH) localization, fixes #85
* Added Vietnamese (VI) localization, thanks Ngoc
* Fixed issue #78. Error/Valid styling applies to all radio buttons of same group for required validation.
* Don't use form.elements as that isn't supported in jQuery 1.6 anymore. Its buggy as hell anyway (IE6-8: form.elements === form).

1.8.0
---
* Improved NL localization (http://plugins.jquery.com/node/14120)
* Added Georgian (GE) localization, thanks Avtandil Kikabidze
* Added Serbian (SR) localization, thanks Aleksandar Milovac
* Added ipv4 and ipv6 to additional methods, thanks Natal Ngétal
* Added Japanese (JA) localization, thanks Bryan Meyerovich
* Added Catalan (CA) localization, thanks Xavier de Pedro
* Fixed missing var statements within for-in loops
* Fix for remote validation, where a formatted message got messed up (https://github.com/jzaefferer/jquery-validation/issues/11)
* Bugfixes for compatibility with jQuery 1.5.1, while maintaining backwards-compatibility

1.7
---
* Added Lithuanian (LT) localization
* Added Greek (EL) localization (http://plugins.jquery.com/node/12319)
* Added Latvian (LV) localization (http://plugins.jquery.com/node/12349)
* Added Hebrew (HE) localization (http://plugins.jquery.com/node/12039)
* Fixed Spanish (ES) localization (http://plugins.jquery.com/node/12696)
* Added jQuery UI themerolled demo
* Removed cmxform.js
* Fixed four missing semicolons (http://plugins.jquery.com/node/12639)
* Renamed phone-method in additional-methods.js to phoneUS
* Added phoneUK and mobileUK methods to additional-methods.js (http://plugins.jquery.com/node/12359)
* Deep extend options to avoid modifying multiple forms when using the rules-method on a single element (http://plugins.jquery.com/node/12411)
* Bugfixes for compatibility with jQuery 1.4.2, while maintaining backwards-compatibility
