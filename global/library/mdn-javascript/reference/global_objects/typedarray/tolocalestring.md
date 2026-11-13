---
title: "TypedArray.prototype.toLocaleString()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/typedarray/tolocalestring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypedArray.prototype.toLocaleString()

The **`toLocaleString()`** method of `TypedArray` instances returns a string representing the elements of the typed array. The elements are converted to strings using their `toLocaleString` methods and these strings are separated by a locale-specific string (such as a comma ","). This method has the same algorithm as `Array.prototype.toLocaleString()`.

```js
const uint8 = new Uint32Array([500, 8123, 12]);

console.log(uint8.toLocaleString());
// Expected output: "500,8123,12"

console.log(uint8.toLocaleString("en-GB"));
// Expected output: "500,8,123,12"

console.log(
  uint8.toLocaleString("de-DE", { style: "currency", currency: "EUR" }),
);
// Expected output: "500,00 €,8.123,00 €,12,00 €"
```

## Syntax

```js
toLocaleString()
toLocaleString(locales)
toLocaleString(locales, options)
```

### Parameters

- `locales` (optional)
    A string with a BCP 47 language tag, or an array of such strings. For the general form and interpretation of the `locales` argument, see the parameter description on the `Intl` main page.
- `options` (optional)
    An object with configuration properties. See `Number.prototype.toLocaleString()`.

### Return value

A string representing the elements of the typed array.

## Description

See `Array.prototype.toLocaleString()` for more details. This method is not generic and can only be called on typed array instances.

## Examples

### Using toLocaleString()

```js
const uint = new Uint32Array([2000, 500, 8123, 12, 4212]);

uint.toLocaleString();
// if run in a de-DE locale
// "2.000,500,8.123,12,4.212"

uint.toLocaleString("en-US");
// "2,000,500,8,123,12,4,212"

uint.toLocaleString("ja-JP", { style: "currency", currency: "JPY" });
// "￥2,000,￥500,￥8,123,￥12,￥4,212"
```

## See also

- JavaScript typed arrays guide
- `TypedArray`
- `TypedArray.prototype.toString()`
- `Array.prototype.toLocaleString()`
- `Intl`
- `Intl.ListFormat`
- `Number.prototype.toLocaleString()`
