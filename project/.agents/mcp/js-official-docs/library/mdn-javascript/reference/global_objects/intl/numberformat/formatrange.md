---
title: "Intl.NumberFormat.prototype.formatRange()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/numberformat/formatrange/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.NumberFormat.prototype.formatRange()

The **`formatRange()`** method of `Intl.NumberFormat` instances formats a range of numbers according to the locale and formatting options of this `Intl.NumberFormat` object.

## Syntax

```js
formatRange(startRange, endRange)
```

### Parameters

- `startRange`
    A `Number`, `BigInt`, or string, to format. Strings are parsed in the same way as in number conversion, except that `formatRange()` will use the exact value that the string represents, avoiding loss of precision during implicitly conversion to a number.
- `endRange`
    A `Number`, `BigInt`, or string, to format.

### Return value

A string representing the given range of numbers formatted according to the locale and formatting options of this `Intl.NumberFormat` object. If the start and end values are formatted to the same string, the output will only contain a single value, possibly prefixed with an "approximately equals" symbol (e.g., "~$3"). The insertion of this symbol only depends on the locale settings, and is inserted even when `startRange === endRange`.

### Exceptions

- `RangeError`
    Thrown if either `startRange` or `endRange` is `NaN` or an inconvertible string.
- `TypeError`
    Thrown if either `startRange` or `endRange` is undefined.

## Description

The `formatRange` getter function formats a range of numbers into a string according to the locale and formatting options of this `Intl.NumberFormat` object from which it is called.

## Examples

### Using formatRange

Use the `formatRange` getter function for formatting a range of currency values:

```js
const nf = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

console.log(nf.formatRange(3, 5)); // "$3 – $5"

// Note: the "approximately equals" symbol is added if
// startRange and endRange round to the same values.
console.log(nf.formatRange(2.9, 3.1)); // "~$3"
```

```js
const nf = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

console.log(nf.formatRange(3, 5)); // "3-5 €"
console.log(nf.formatRange(2.9, 3.1)); // "~3 €"
```

## See also

- `Intl.NumberFormat`
- `Number.prototype.toLocaleString()`
