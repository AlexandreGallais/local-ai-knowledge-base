---
title: "Intl.Locale.prototype.minimize()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/locale/minimize/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.Locale.prototype.minimize()

The **`minimize()`** method of `Intl.Locale` instances attempts to
remove information about this locale that would be added by calling
`maximize()`.

```js
const english = new Intl.Locale("en-Latn-US");
const korean = new Intl.Locale("ko-Kore-KR");
const arabic = new Intl.Locale("ar-Arab-EG");

console.log(english.minimize().baseName);
// Expected output: "en"

console.log(korean.minimize().baseName);
// Expected output: "ko"

console.log(arabic.minimize().baseName);
// Expected output: "ar"
```

## Syntax

```js
minimize()
```

### Parameters

None.

### Return value

An `Intl.Locale` instance whose `baseName` property returns
the result of the Remove Likely Subtags algorithm
executed against _`locale.baseName`_.

## Description

This method carries out the reverse of `maximize()`,
removing any language, script, or region subtags from the locale language identifier
(essentially the contents of `baseName`). This is useful when there are
superfluous subtags in the language identifier; for instance, "en-Latn" can be
simplified to "en", since "Latn" is the only script used to write English.
`minimize()` only affects the main subtags that comprise
the language identifier:
language, script, and region subtags. Other subtags after the "-u"
in the locale identifier are called extension subtags and are not affected by the
`minimize()` method. Examples of these subtags include
`hourCycle`, `calendar`, and `numeric`.

## Examples

### Using minimize

```js
const myLocale = new Intl.Locale("fr-Latn-FR", {
  hourCycle: "h12",
  calendar: "gregory",
});
console.log(myLocale.baseName); // Prints "fr-Latn-FR"
console.log(myLocale.toString()); // Prints "fr-Latn-FR-u-ca-gregory-hc-h12"

const myLocMinimized = myLocale.minimize();

// Prints "fr", since French is only written in the Latin script
// and is most likely to be spoken in France.
console.log(myLocMinimized.baseName);

// Prints "fr-u-ca-gregory-hc-h12".
// Note that the extension tags (after "-u") remain unchanged.
console.log(myLocMinimized.toString());
```

## See also

- `Intl.Locale`
- `baseName`
