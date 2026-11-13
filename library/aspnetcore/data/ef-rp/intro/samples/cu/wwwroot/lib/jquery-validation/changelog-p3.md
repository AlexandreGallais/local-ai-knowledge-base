---
title: "changelog (part 3 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/data/ef-rp/intro/samples/cu/wwwroot/lib/jquery-validation/changelog.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# changelog (part 3 of 4)

1.6
---
* Added Arabic (AR), Portuguese (PTPT), Persian (FA), Finnish (FI) and Bulgarian (BR) localization
* Updated Swedish (SE) localization (some missing html iso characters)
* Fixed $.validator.addMethod to properly handle empty string vs. undefined for the message argument
* Fixed two accidental global variables
* Enhanced min/max/rangeWords (in additional-methods.js) to strip html before counting; good when counting words in a richtext editor
* Added localized methods for DE, NL and PT, removing the dateDE and numberDE methods (use messages_de.js and methods_de.js with date and number methods instead)
* Fixed remote form submit synchronization, kudos to Matas Petrikas
* Improved interactive select validation, now validating also on click (via option or select, inconsistent across browsers); doesn't work in Safari, which doesn't trigger a click event at all on select elements; fixes http://plugins.jquery.com/node/11520
* Updated to latest form plugin (2.36), fixing http://plugins.jquery.com/node/11487
* Bind to blur event for equalTo target to revalidate when that target changes, fixes http://plugins.jquery.com/node/11450
* Simplified select validation, delegating to jQuery's val() method to get the select value; should fix http://plugins.jquery.com/node/11239
* Fixed default message for digits (http://plugins.jquery.com/node/9853)
* Fixed issue with cached remote message (http://plugins.jquery.com/node/11029 and http://plugins.jquery.com/node/9351)
* Fixed a missing semicolon in additional-methods.js (http://plugins.jquery.com/node/9233)
* Added automatic detection of substitution parameters in messages, removing the need to provide format functions (http://plugins.jquery.com/node/11195)
* Fixed an issue with :filled/:blank somewhat caused by Sizzle (http://plugins.jquery.com/node/11144)
* Added an integer method to additional-methods.js (http://plugins.jquery.com/node/9612)
* Fixed errorsFor method where the for-attribute contains characters that need escaping to be valid inside a selector (http://plugins.jquery.com/node/9611)

1.5.5
---
* Fix for http://plugins.jquery.com/node/8659
* Fixed trailing comma in messages_cs.js

1.5.4
---
* Fixed remote method bug (http://plugins.jquery.com/node/8658)

1.5.3
---
* Fixed a bug related to the wrapper-option, where all ancestor-elements that matched the wrapper-option where selected (http://plugins.jquery.com/node/7624)
* Updated multipart demo to use latest jQuery UI accordion
* Added dateNL and time methods to additionalMethods.js
* Added Traditional Chinese (Taiwan, tw) and Kazakhstan (KK) localization
* Moved jQuery.format (formerly String.format) to jQuery.validator.format, jQuery.format is deprecated and will be removed in 1.6 (see http://code.google.com/p/jquery-utils/issues/detail?id=15 for details)
* Cleaned up messages_pl.js and messages_ptbr.js (still defined messages for max/min/rangeValue, which were removed in 1.4)
* Fixed flawed boolean logic in valid-plugin-method for multiple elements; now all elements need to be valid for a boolean-true result (http://plugins.jquery.com/node/8481)
* Enhancement $.validator.addMethod: An undefined third message-argument won't overwrite an existing message (http://plugins.jquery.com/node/8443)
* Enhancement to submitHandler option: When used, click events on submit buttons are captured and the submitting button is inserted into the form before calling submitHandler, and removed afterwards; keeps submit buttons intact (http://plugins.jquery.com/node/7183#comment-3585)
* Added option validClass, default "valid", which adds that class to all valid elements, after validation (http://dev.jquery.com/ticket/2205)
* Added creditcardtypes method to additionalMethods.js, including tests (via http://dev.jquery.com/ticket/3635)
* Improved remote method to allow serverside message as a string, or true for valid, or false for invalid using the clientside defined message (http://dev.jquery.com/ticket/3807)
* Improved accept method to also accept a Drupal-style comma-separated list of values (http://plugins.jquery.com/node/8580)

1.5.2
---
* Fixed messages in additional-methods.js for maxWords, minWords, and rangeWords to include call to $.format
* Fixed value passed to methods to exclude carriage return (\r), same as jQuery's val() does
* Added slovak (sk) localization
* Added demo for integration with jQuery UI tabs
* Added selects-grouping example to tabs demo (see second tab, birthdate field)

1.5.1
---
* Updated marketo demo to use invalidHandler option instead of binding invalid-form event
* Added TinyMCE integration example
* Added ukrainian (ua) localization
* Fixed length validation to work with trimmed value (regression from 1.5 where general trimming before validation was removed)
* Various small fixes for compatibility with both 1.2.6 and 1.3

1.5
---
* Improved basic demo, validating confirm-password field after password changed
* Fixed basic validation to pass the untrimmed input value as the first parameter to validation methods, changed required accordingly; breaks existing custom method that rely on the trimming
* Added norwegian (no), italian (it), hungarian (hu) and romanian (ro) localization
* Fixed #3195: Two flaws in swedish localization
* Fixed #3503: Extended rules("add") to accept messages property: use to specify add custom messages to an element via rules("add", { messages: { required: "Required! " } });
* Fixed #3356: Regression from #2908 when using meta-option
* Fixed #3370: Added ignoreTitle option, set to skip reading messages from the title attribute, helps to avoid issues with Google Toolbar; default is false for compatibility
* Fixed #3516: Trigger invalid-form event even when remote validation is involved
* Added invalidHandler option as a shortcut to bind("invalid-form", function() {})
* Fixed Safari issue for loading indicator in ajaxSubmit-integration-demo (append to body first, then hide)
* Added test for creditcard validation and improved default message
* Enhanced remote validation, accepting options to passthrough to $.ajax as parameter (either url string or options, including url property plus everything else that $.ajax supports)

1.4
---
* Fixed #2931, validate elements in document order and ignore type=image inputs
* Fixed usage of $ and jQuery variables, now fully compatible with all variations of noConflict usage
* Implemented #2908, enabling custom messages via metadata ala class="{required:true,messages:{required:'required field'}}", added demo/custom-messages-metadata-demo.html
* Removed deprecated methods minValue (min), maxValue (max), rangeValue (rangevalue), minLength (minlength), maxLength (maxlength), rangeLength (rangelength)
* Fixed #2215 regression: Call unhighlight only for current elements, not everything
* Implemented #2989, enabling image button to cancel validation
* Fixed issue where IE incorrectly validates against maxlength=0
* Added czech (cs) localization
* Reset validator.submitted on validator.resetForm(), enabling a full reset when necessary
* Fixed #3035, skipping all falsy attributes when reading rules (0, undefined, empty string), removed part of the maxlength workaround (for 0)
* Added dutch (nl) localization (#3201)

1.3
---
* Fixed invalid-form event, now only triggered when form is invalid
* Added spanish (es), russian (ru), portuguese brazilian (ptbr), turkish (tr), and polish (pl) localization
* Added removeAttrs plugin to facilitate adding and removing multiple attributes
* Added groups option to display a single message for multiple elements, via groups: { arbitraryGroupName: "fieldName1 fieldName2[, fieldNameN" }
* Enhanced rules() for adding and removing (static) rules: rules("add", "method1[, methodN]"/{method1:param[, method_n:param]}) and rules("remove"[, "method1[, method_n]")
* Enhanced rules-option, accepts space-separated string-list of methods, eg. {birthdate: "required date"}
* Fixed checkbox group validation with inline rules: As long as the rules are specified on the first element, the group is now properly validated on click
* Fixed #2473, ignoring all rules with an explicit parameter of boolean-false, eg. required:false is the same as not specifying required at all (it was handled as required:true so far)
* Fixed #2424, with a modified patch from #2473: Methods returning a dependency-mismatch don't stop other rules from being evaluated anymore; still, success isn't applied for optional fields
* Fixed url and email validation to not use trimmed values
* Fixed creditcard validation to accept only digits and dashes ("asdf" is not a valid creditcard number)
* Allow both button and input elements for cancel buttons (via class="cancel")
* Fixed #2215: Fixed message display to call unhighlight as part of showing and hiding messages, no more visual side-effects while checking an element and extracted validator.checkForm to validate a form without UI sideeffects
* Rewrote custom selectors (:blank, :filled, :unchecked) with functions for compatibility with AIR

1.2.1
-----

* Bundled delegate plugin with validate plugin - its always required anyway
* Improved remote validation to include parts from the ajaxQueue plugin for proper synchronization (no additional plugin necessary)
* Fixed stopRequest to prevent pendingRequest < 0
* Added jQuery.validator.autoCreateRanges property, defaults to false, enable to convert min/max to range and minlength/maxlength to rangelength; this basically fixes the issue introduced by automatically creating ranges in 1.2
* Fixed optional-methods to not highlight anything at all if the field is blank, that is, don't trigger success
* Allow false/null for highlight/unhighlight options instead of forcing a do-nothing-callback even when nothing needs to be highlighted
* Fixed validate() call with no elements selected, returning undefined instead of throwing an error
* Improved demo, replacing metadata with classes/attributes for specifying rules
* Fixed error when no custom message is used for remote validation
* Modified email and url validation to require domain label and top label
* Fixed url and email validation to require TLD (actually to require domain label); 1.2 version (TLD is optional) is moved to additions as url2 and email2
* Fixed dynamic-totals demo in IE6/7 and improved templating, using textarea to store multiline template and string interpolation
* Added login form example with "Email password" link that makes the password field optional
* Enhanced dynamic-totals demo with an example of a single message for two fields

1.2
---

* Added AJAX-captcha validation example (based on http://psyrens.com/captcha/)
* Added remember-the-milk-demo (thanks RTM team for the permission!)
* Added marketo-demo (thanks Glen Lipka!)
* Added support for ajax-validation, see method "remote"; serverside returns JSON, true for valid elements, false or a String for invalid, String is used as message
* Added highlight and unhighlight options, by default toggles errorClass on element, allows custom highlighting
* Added valid() plugin method for easy programmatic checking of forms and fields without the need to use the validator API
* Added rules() plugin method to read and write rules for an element (currently read only)
* Replaced regex for email method, thanks to the contribution by Scott Gonzalez, see http://projects.scottsplayground.com/email_address_validation/
* Restructured event architecture to rely solely on delegation, both improving performance, and ease-of-use for the developer (requires jquery.delegate.js)
* Moved documentation from inline to http://docs.jquery.com/Plugins/Validation - including interactive examples for all methods
* Removed validator.refresh(), validation is now completely dynamic
* Renamed minValue to min, maxValue to max and rangeValue to range, deprecating the previous names (to be removed in 1.3)
* Renamed minLength to minlength, maxLength to maxlength and rangeLength to rangelength, deprecating the previous names (to be removed in 1.3)
* Added feature to merge min + max into and range and minlength + maxlength into rangelength
* Added support for dynamic rule parameters, allowing to specify a function as a parameter eg. for minlength, called when validating the element
* Allow to specify null or an empty string as a message to display nothing (see marketo demo)
* Rules overhaul: Now supports combination of rules-option, metadata, classes (new) and attributes (new), see rules() for details

1.1.2
---

* Replaced regex for URL method, thanks to the contribution by Scott Gonzalez, see http://projects.scottsplayground.com/iri/
* Improved email method to better handle unicode characters
* Fixed error container to hide when all elements are valid, not only on form submit
* Fixed String.format to jQuery.format (moving into jQuery namespace)
* Fixed accept method to accept both upper and lowercase extensions
* Fixed validate() plugin method to create only one validator instance for a given form and always return that one instance (avoids binding events multiple times)
* Changed debug-mode console log from "error" to "warn" level

1.1.1
-----

* Fixed invalid XHTML, preventing error label creation in IE since jQuery 1.1.4
* Fixed and improved String.format: Global search & replace, better handling of array arguments
* Fixed cancel-button handling to use validator-object for storing state instead of form element
* Fixed name selectors to handle "complex" names, eg. containing brackets ("list[]")
* Added button and disabled elements to exclude from validation
* Moved element event handlers to refresh to be able to add handlers to new elements
* Fixed email validation to allow long top level domains (eg. ".travel")
* Moved showErrors() from valid() to form()
* Added validator.size(): returns the number of current errors
* Call submitHandler with validator as scope for easier access of it's methods, eg. to find error labels using errorsFor(Element)
* Compatible with jQuery 1.1.x and 1.2.x

1.1
---

* Added validation on blur, keyup and click (for checkboxes and radiobutton). Replaces event-option.
* Fixed resetForm
* Fixed custom-methods-demo

1.0
---
