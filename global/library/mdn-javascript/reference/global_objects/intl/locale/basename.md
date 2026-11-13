---
title: "Intl.Locale.prototype.baseName"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/locale/basename/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.Locale.prototype.baseName

The **`baseName`** accessor property of `Intl.Locale` instances returns a substring of this locale's string representation, containing core information about this locale, including the language, script, region, and variants, if available.

## Description

`baseName` returns the `language ["-" script] ["-" region] *("-" variant)` subsequence of the unicode_language_id grammar. It only includes information explicitly specified in the constructor, either through the locale identifier string or the options object.

The set accessor of `baseName` is `undefined`. You cannot change this property directly.

## Examples

### Basic <example-value>

```js
const myLoc = new Intl.Locale("fr-Latn-CA"); // Sets locale to Canadian French
console.log(myLoc.toString()); // "fr-Latn-CA-u-ca-gregory"
console.log(myLoc.baseName); // "fr-Latn-CA"
```

### Example with extension tags in the input string

```js
// Sets language to Japanese, region to Japan,
// calendar to Gregorian, hour cycle to 24 hours
const japan = new Intl.Locale("ja-JP-u-ca-gregory-hc-24");
console.log(japan.toString()); // "ja-JP-u-ca-gregory-hc-h24"
console.log(japan.baseName); // "ja-JP"
```

### Example with options that override input string

```js
// Input string indicates language as Dutch and region as Belgium,
// but options object overrides the region and sets it to the Netherlands
const dutch = new Intl.Locale("nl-Latn-BE", { region: "NL" });

console.log(dutch.baseName); // "nl-Latn-NL"
```

## See also

- `Intl.Locale`
