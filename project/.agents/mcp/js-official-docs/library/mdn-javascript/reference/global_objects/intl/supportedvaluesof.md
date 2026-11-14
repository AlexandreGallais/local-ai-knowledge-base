---
title: "Intl.supportedValuesOf() (part 1 of 6)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/supportedvaluesof/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.supportedValuesOf()

The **`Intl.supportedValuesOf()`** static method returns an array containing the supported calendar, collation, currency, numbering systems, or unit values supported by the implementation.

Duplicates are omitted and the array is sorted in ascending lexicographical order (or more precisely, using `Array.prototype.sort()` with an `undefined` compare function).

The method can be used to feature-test whether values are supported in a particular implementation and download a polyfill only if necessary.
It can also be used to build UIs that allow users to select their preferred localized values, for example when the UI is created from WebGL or server-side.

This method is locale-unaware: it is possible that certain identifiers are only supported or preferred in certain locales. If you want to determine the preferred values for a specific locale, you should use the `Intl.Locale` object, such as `Intl.Locale.prototype.getCalendars()`.

```js
console.log(Intl.supportedValuesOf("calendar"));
console.log(Intl.supportedValuesOf("collation"));
console.log(Intl.supportedValuesOf("currency"));
console.log(Intl.supportedValuesOf("numberingSystem"));
console.log(Intl.supportedValuesOf("timeZone"));
console.log(Intl.supportedValuesOf("unit"));
// Expected output: Array ['key'] (for each key)

try {
  Intl.supportedValuesOf("someInvalidKey");
} catch (err) {
  console.log(err.toString());
  // Expected output: RangeError: invalid key: "someInvalidKey"
}
```
