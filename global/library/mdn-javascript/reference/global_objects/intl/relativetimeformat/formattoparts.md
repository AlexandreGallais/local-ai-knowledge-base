---
title: "Intl.RelativeTimeFormat.prototype.formatToParts()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/relativetimeformat/formattoparts/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.RelativeTimeFormat.prototype.formatToParts()

The **`formatToParts()`** method of `Intl.RelativeTimeFormat` instances returns an array of objects representing each part of the formatted string that would be returned by `format()`. It is useful for building custom strings from the locale-specific tokens.

```js
const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
const parts = rtf.formatToParts(10, "seconds");

console.log(parts[0].value);
// Expected output: "in "

console.log(parts[1].value);
// Expected output: "10"

console.log(parts[2].value);
// Expected output: " seconds"
```

## Syntax

```js
formatToParts(value, unit)
```

### Parameters

- `value`
    Numeric value to use in the internationalized relative time message.
- `unit`
    Unit to use in the relative time internationalized message. Possible values are: `"year"`, `"quarter"`, `"month"`, `"week"`, `"day"`, `"hour"`, `"minute"`, `"second"`. Plural forms are also permitted.

### Return value

An `Array` of objects containing the formatted relative time in parts. Each object has two or three properties, `type`, `value`, and optionally `unit`, each containing a string. The string concatenation of `value`, in the order provided, will result in the same string as `format()`. The parts can be thought of as directly obtained from calling `Intl.NumberFormat.prototype.formatToParts()` with the numeric value, passing only the `numberingSystem` option, and then adding additional `type: "<example-value>"` tokens, such as `"<example-value>"`, `"<example-value>"`, etc. All tokens that are produced by the `NumberFormat` have an additional `unit` property, which is the singular form of the input `unit`; this is for programmatic usage and is not localized. The localized unit is output as a part of a literal token.

When `options.numeric` is `"<example-value>"`, and there's a special string for the value, the returned array is a single literal token.

## Examples

### Using formatToParts()

```js
const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

// Format relative time using the day unit
rtf.formatToParts(-1, "day");
// [{ type: "literal", value: "yesterday"}]

rtf.formatToParts(100, "day");
// [
//   { type: "literal", value: "in " },
//   { type: "integer", value: "100", unit: "day" },
//   { type: "literal", value: " days" }
// ]
```

## See also

- `Intl.RelativeTimeFormat`
- `Intl.RelativeTimeFormat.prototype.format()`
