---
title: "Intl.Locale.prototype.maximize()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/locale/maximize/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.Locale.prototype.maximize()

The **`maximize()`** method of `Intl.Locale` instances gets the
most likely values for the language, script, and region of this locale based on
existing values.

```js
const english = new Intl.Locale("en");
const korean = new Intl.Locale("ko");
const arabic = new Intl.Locale("ar");

console.log(english.maximize().baseName);
// Expected output: "en-Latn-US"

console.log(korean.maximize().baseName);
// Expected output: "ko-Kore-KR"

console.log(arabic.maximize().baseName);
// Expected output: "ar-Arab-EG"
```

## Syntax

```js
maximize()
```

### Parameters

None.

### Return value

An `Intl.Locale` instance whose `baseName` property returns
the result of the Add Likely Subtags algorithm executed against _`locale.baseName`_.

## Description

Sometimes, it is convenient to be able to identify the most likely locale language
identifier subtags based on an incomplete language ID. The Add Likely Subtags
algorithm gives us this functionality. For instance, given the language ID "en", the
algorithm would return "en-Latn-US", since English can only be written in the Latin
script, and is most likely to be used in the United States, as it is the largest
English-speaking country in the world. This functionality is provided to JavaScript
programmers via the `maximize()` method. `maximize()` only
affects the main subtags that comprise the language identifier: language, script, and region subtags.
Other subtags after the "-u" in the locale identifier are called extension subtags and
are not affected by the `maximize()` method. Examples of these subtags
include `hourCycle`,
`calendar`, and `numeric`.

## Examples

### Using maximize

```js
const myLocale = new Intl.Locale("fr", {
  hourCycle: "h12",
  calendar: "gregory",
});
console.log(myLocale.baseName); // Prints "fr"
console.log(myLocale.toString()); // Prints "fr-u-ca-gregory-hc-h12"
const myLocMaximized = myLocale.maximize();

// Prints "fr-Latn-FR". The "Latn" and "FR" tags are added,
// since French is only written in the Latin script and is most likely to be spoken in France.
console.log(myLocMaximized.baseName);

// Prints "fr-Latn-FR-u-ca-gregory-hc-h12".
// Note that the extension tags (after "-u") remain unchanged.
console.log(myLocMaximized.toString());
```

## See also

- `Intl.Locale`
- `baseName`
- Likely Subtags in the Unicode locale data markup language spec
