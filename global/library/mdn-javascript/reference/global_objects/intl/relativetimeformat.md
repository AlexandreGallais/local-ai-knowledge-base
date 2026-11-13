---
title: "Intl.RelativeTimeFormat"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/relativetimeformat/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.RelativeTimeFormat

The **`Intl.RelativeTimeFormat`** object enables language-sensitive relative time formatting.

```js
const rtf1 = new Intl.RelativeTimeFormat("en", { style: "short" });

console.log(rtf1.format(3, "quarter"));
// Expected output: "in 3 qtrs."

console.log(rtf1.format(-1, "day"));
// Expected output: "1 day ago"

const rtf2 = new Intl.RelativeTimeFormat("es", { numeric: "auto" });

console.log(rtf2.format(2, "day"));
// Expected output: "pasado mañana"
```

## Constructor

- `Intl.RelativeTimeFormat()`
    Creates a new `Intl.RelativeTimeFormat` object.

## Static methods

- `Intl.RelativeTimeFormat.supportedLocalesOf()`
    Returns an array containing those of the provided locales that are supported without having to fall back to the runtime's default locale.

## Instance properties

These properties are defined on `Intl.RelativeTimeFormat.prototype` and shared by all `Intl.RelativeTimeFormat` instances.

- `Intl.RelativeTimeFormat.prototype.constructor`
    The constructor function that created the instance object. For `Intl.RelativeTimeFormat` instances, the initial value is the `Intl.RelativeTimeFormat` constructor.
- `Intl.RelativeTimeFormat.prototype[Symbol.toStringTag]`
    The initial value of the `[Symbol.toStringTag]` property is the string `"Intl.RelativeTimeFormat"`. This property is used in `Object.prototype.toString()`.

## Instance methods

- `Intl.RelativeTimeFormat.prototype.format()`
    Formats a `value` and a `unit` according to the locale and formatting options of the given `Intl.RelativeTimeFormat` object.
- `Intl.RelativeTimeFormat.prototype.formatToParts()`
    Returns an `Array` of objects representing the relative time format in parts that can be used for custom locale-aware formatting.
- `Intl.RelativeTimeFormat.prototype.resolvedOptions()`
    Returns a new object with properties reflecting the locale and formatting options computed during initialization of the object.

## Examples

### Basic <example-value> usage

The following example shows how to use a relative time formatter for the English language.

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

### Using formatToParts

The following example shows how to create a relative time formatter returning formatted parts.

```js
const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

// Format relative time using the day unit.
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

- Polyfill of `Intl.RelativeTimeFormat` in FormatJS
- `Intl`
- `Intl.RelativeTimeFormat` on v8.dev (2018)
