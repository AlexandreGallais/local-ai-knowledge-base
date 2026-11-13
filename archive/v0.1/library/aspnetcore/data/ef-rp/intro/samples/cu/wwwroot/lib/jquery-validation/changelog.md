---
title: "changelog (part 1 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/data/ef-rp/intro/samples/cu/wwwroot/lib/jquery-validation/changelog.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# changelog

1.14.0 / 2015-06-30
==================

## Core
  * Remove unused removeAttrs method
  * Replace regex for url method
  * Remove bad url param in $.ajax, overwritten by $.extend
  * Properly handle nested cancel submit button
  * Fix indent
  * Refactor attributeRules and dataRules to share noramlizer
  * dataRules method to convert value to number for number inputs
  * Update url method to allow for protocol-relative URLs
  * Remove deprecated $.format placeholder
  * Use jQuery 1.7+ on/off, add destroy method
  * IE8 compatibility changed .indexOf to $.inArray
  * Cast NaN value attributes to undefined for Opera Mini
  * Stop trimming value inside required method
  * Use :disabled selector to match disabled elements
  * Exclude some keyboard keys to prevent revalidating the field
  * Do not search the whole DOM for radio/checkbox elements
  * Throw better errors for bad rule methods
  * Fixed number validation error
  * Fix reference to whatwg spec
  * Focus invalid element when validating a custom set of inputs
  * Reset element styles when using custom highlight methods
  * Escape dollar sign in error id
  * Revert "Ignore readonly as well as disabled fields."
  * Update link in comment for Luhn algorithm

## Additionals
  * Update dateITA to address timezone issue
  * Fix extension method to only method period
  * Fix accept method to match period only
  * Update time method to allow single digit hour
  * Drop bad test for notEqualTo method
  * Add notEqualTo method
  * Use correct jQuery reference via `$`
  * Remove useless regex check in iban method
  * Brazilian CPF number

## Localization
  * Update messages_tr.js
  * Update messages_sr_lat.js
  * Adding Perú Spanish (ES PE)
  * Adding Georgian (ქართული, ge)
  * Fixed typo in catalan translation
  * Improve Finnish (fi) translation
  * Add armenian (hy_AM) locale
  * Extend italian (it) translation with currency method
  * Add bn_BD locale
  * Update zh locale
  * Remove full stop at the end of italian messages

1.13.1 / 2014-10-14
==================

## Core
  * Allow 0 as value for autoCreateRanges
  * Apply ignore setting to all validationTargetFor elements
  * Don't trim value in min/max/rangelength methods
  * Escape id/name before using it as a selector in errorsFor
  * Explicit default for focusCleanup option
  * Fix incorrect regexp for describedby matcher
  * Ignore readonly as well as disabled fields
  * Improve id escaping, store escaped id in describedby
  * Use return value of submitHandler to allow or prevent form submit

## Additionals
  * Add postalcodeBR method
  * Fix pattern method when parameter is a string

1.13.0 / 2014-07-01
==================

## All
* Add plugin UMD wrapper

## Core
* Respect non-error aria-describedby and empty hidden errors
* Improve dateISO RegExp
* Added radio/checkbox to delegate click-event
* Use aria-describedby for non-label elements
* Register focusin, focusout and keyup also on radio/checkbox
* Fix normalization for rangelength attribute value
* Update elementValue method to deal with type="number" fields
* Use charAt instead of array notation on strings, to support IE8(?)

## Localization
* Fix sk translation of rangelength method
* Add Finnish methods
* Fixed GL number validation message
* Fixed ES number method validation message
* Added galician (GL)
* Fixed French messages for min and max methods
