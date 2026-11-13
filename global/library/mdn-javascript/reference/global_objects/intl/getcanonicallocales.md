---
title: "Intl.getCanonicalLocales()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/getcanonicallocales/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.getCanonicalLocales()

The **`Intl.getCanonicalLocales()`** static method returns an array
containing the canonical locale names. Duplicates will be omitted and elements will be
validated as structurally valid language tags.

```js
console.log(Intl.getCanonicalLocales("EN-US"));
// Expected output: Array ["en-US"]

console.log(Intl.getCanonicalLocales(["EN-US", "Fr"]));
// Expected output: Array ["en-US", "fr"]

try {
  Intl.getCanonicalLocales("EN_US");
} catch (err) {
  console.log(err.toString());
  // Expected output: RangeError: invalid language tag: "EN_US"
}
```

## Syntax

```js
Intl.getCanonicalLocales(locales)
```

### Parameters

- `locales`
    A list of `String` values for which to get the canonical locale names.

### Return value

An array containing the canonical locale names.

## Examples

### Using getCanonicalLocales

```js
Intl.getCanonicalLocales("EN-US"); // ["en-US"]
Intl.getCanonicalLocales(["EN-US", "Fr"]); // ["en-US", "fr"]

Intl.getCanonicalLocales("EN_US");
// RangeError: invalid language tag: "EN_US"
```

## See also

- Polyfill of `Intl.getCanonicalLocales` in FormatJS
- `Intl.NumberFormat.supportedLocalesOf()`
- `Intl.DateTimeFormat.supportedLocalesOf()`
- `Intl.Collator.supportedLocalesOf()`
