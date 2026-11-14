---
title: "Intl.NumberFormat.prototype.formatRangeToParts()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/numberformat/formatrangetoparts/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.NumberFormat.prototype.formatRangeToParts()

The **`formatRangeToParts()`** method of `Intl.NumberFormat` instances returns an `Array` of objects containing the locale-specific tokens from which it is possible to build custom strings while preserving the locale-specific parts. This makes it possible to provide locale-aware custom formatting ranges of number strings.

## Syntax

```js
formatRangeToParts(startRange, endRange)
```

### Parameters

- `startRange`
    A `Number`, `BigInt`, or string, to format. Strings are parsed in the same way as in number conversion, except that `formatRangeToParts()` will use the exact value that the string represents, avoiding loss of precision during implicitly conversion to a number.
- `endRange`
    A `Number`, `BigInt`, or string, to format.

### Return value

An `Array` of objects containing the formatted range in parts. Each object has three properties, `type`, `value`, and `source`, each containing a string. The string concatenation of `value`, in the order provided, will result in the same string as `formatRange()`. The `type` may have the same values as `formatToParts()`, or the additional value `"approximatelySign"` (see below). The `source` can be one of the following:

- `startRange`
    The token is a part of the start number.
- `endRange`
    The token is a part of the end number.
- `shared`
    The token is shared between the start and end; for example, the currency symbol. All literals that are part of the range pattern itself, such as the `"<example-value>"` separator, are also marked as `shared`.

If the start and end numbers are formatted to the same string, then the output has the same list of tokens as calling `formatToParts()` on the start number, with all tokens marked as `source: "<example-value>"`. In addition, the first token may be an "<example-value>" symbol (e.g., "<example-value>") with `type: "<example-value>"`. The insertion of this symbol only depends on the locale settings, and is inserted even when `startRange === endRange`.

### Exceptions

- `RangeError`
    Thrown if either `startRange` or `endRange` is `NaN` or an inconvertible string.
- `TypeError`
    Thrown if either `startRange` or `endRange` is undefined.

## Examples

### Using formatRangeToParts()

The `formatRange()` method outputs localized, opaque strings that cannot be manipulated directly:

```js
const startRange = 3500;
const endRange = 9500;

const formatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});

console.log(formatter.formatRange(startRange, endRange));
// "3.500,00–9.500,00 €"
```

However, in many user interfaces you may want to customize the formatting of this string, or interleave it with other texts. The `formatRangeToParts()` method produces the same information in parts:

```js
console.log(formatter.formatRangeToParts(startRange, endRange));

// return value:
[
  { type: "integer", value: "3", source: "startRange" },
  { type: "group", value: ".", source: "startRange" },
  { type: "integer", value: "500", source: "startRange" },
  { type: "decimal", value: ",", source: "startRange" },
  { type: "fraction", value: "00", source: "startRange" },
  { type: "literal", value: "–", source: "shared" },
  { type: "integer", value: "9", source: "endRange" },
  { type: "group", value: ".", source: "endRange" },
  { type: "integer", value: "500", source: "endRange" },
  { type: "decimal", value: ",", source: "endRange" },
  { type: "fraction", value: "00", source: "endRange" },
  { type: "literal", value: " ", source: "shared" },
  { type: "currency", value: "€", source: "shared" },
];
```

## See also

- `Intl.NumberFormat`
- `Intl.NumberFormat.prototype.format()`
