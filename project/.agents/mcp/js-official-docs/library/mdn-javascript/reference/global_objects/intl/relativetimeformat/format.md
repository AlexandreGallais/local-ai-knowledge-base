---
title: "Intl.RelativeTimeFormat.prototype.format()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/relativetimeformat/format/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.RelativeTimeFormat.prototype.format()

The **`format()`** method of `Intl.RelativeTimeFormat` instances formats a `value` and `unit` according to the locale and formatting options of this `Intl.RelativeTimeFormat` object.

```js
const rtf = new Intl.RelativeTimeFormat("en", { style: "short" });

console.log(rtf.format(3, "quarter"));
// Expected output: "in 3 qtrs."

console.log(rtf.format(-1, "day"));
// Expected output: "1 day ago"

console.log(rtf.format(10, "seconds"));
// Expected output: "in 10 sec."
```

## Syntax

```js
format(value, unit)
```

### Parameters

- `value`
    Numeric value to use in the internationalized relative time message.
- `unit`
    Unit to use in the relative time internationalized message. Possible values are: `"year"`, `"quarter"`, `"month"`, `"week"`, `"day"`, `"hour"`, `"minute"`, `"second"`. Plural forms are also permitted.

### Return value

A string representing the given `value` and `unit` formatted according to the locale and formatting options of this `Intl.RelativeTimeFormat` object.

> **Note:**
> Most of the time, the formatting returned by `format()` is consistent. However, the output may vary between implementations, even within the same locale — output variations are by design and allowed by the specification. It may also not be what you expect. For example, the string may use non-breaking spaces or be surrounded by bidirectional control characters. You should not compare the results of `format()` to hardcoded constants.

## Examples

### Basic <example-value> usage

The following example shows how to create a relative time formatter using the English language.

```js
// Create a relative time formatter in your locale
// with default values explicitly passed in.
const rtf = new Intl.RelativeTimeFormat("en", {
  localeMatcher: "best fit", // other values: "lookup"
  numeric: "always", // other values: "auto"
  style: "long", // other values: "short" or "narrow"
});

// Format relative time using negative value (-1).
rtf.format(-1, "day"); // "1 day ago"

// Format relative time using positive value (1).
rtf.format(1, "day"); // "in 1 day"
```

### Using the auto option

If the `numeric: "auto"` option is passed, it will produce the string `yesterday`, `today`, or `tomorrow` instead of `1 day ago`, `in 0 days`, or `in 1 day`. This allows you to avoid using numeric values in the output.

```js
// Create a relative time formatter in your locale
// with numeric: "auto" option value passed in.
const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

// Format relative time using negative value (-1).
rtf.format(-1, "day"); // "yesterday"

rtf.format(0, "day"); // "today"

// Format relative time using positive day unit (1).
rtf.format(1, "day"); // "tomorrow"
```

## See also

- `Intl.RelativeTimeFormat`
