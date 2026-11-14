---
title: "Intl.Locale.prototype.toString()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/locale/tostring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.Locale.prototype.toString()

The **`toString()`** method of `Intl.Locale` instances returns this Locale's full locale identifier string.

```js
const french = new Intl.Locale("fr-Latn-FR", {
  calendar: "gregory",
  hourCycle: "h12",
});
const korean = new Intl.Locale("ko-Kore-KR", {
  numeric: true,
  caseFirst: "upper",
});

console.log(french.toString());
// Expected output: "fr-Latn-FR-u-ca-gregory-hc-h12"

console.log(korean.toString());
// Expected output: "ko-Kore-KR-u-kf-upper-kn"
```

## Syntax

```js
toString()
```

### Parameters

None.

### Return value

The _locale_'s Unicode locale identifier string.

## Description

The `Locale` object is a JavaScript representation of a concept
Unicode locale identifier. Information about a particular locale (language, script,
calendar type, etc.) can be encoded in a locale identifier string. To make it easier
to work with these locale identifiers, the `Locale` object was
introduced to JavaScript. Calling the `toString` method on a Locale object
will return the identifier string for that particular Locale. The
`toString` method allows `Locale` instances to be
provided as an argument to existing `Intl` constructors, serialized in
JSON, or any other context where an exact string representation is useful.

## Examples

### Using toString

```js
const myLocale = new Intl.Locale("fr-Latn-FR", {
  hourCycle: "h12",
  calendar: "gregory",
});
console.log(myLocale.baseName); // Prints "fr-Latn-FR"
console.log(myLocale.toString()); // Prints "fr-Latn-FR-u-ca-gregory-hc-h12"
```

## See also

- `Intl.Locale`
- `baseName`
