---
title: "Intl.DurationFormat"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/durationformat/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.DurationFormat

The **`Intl.DurationFormat`** object enables language-sensitive duration formatting.

## Constructor

- `Intl.DurationFormat()`
    Creates a new `Intl.DurationFormat` object.

## Static methods

- `Intl.DurationFormat.supportedLocalesOf()`
    Returns an array containing those of the provided locales that are supported without having to fall back to the runtime's default locale.

## Instance properties

These properties are defined on `Intl.DurationFormat.prototype` and shared by all `Intl.DurationFormat` instances.

- `Intl.DurationFormat.prototype.constructor`
    The constructor function that created the instance object. For `Intl.DurationFormat` instances, the initial value is the `Intl.DurationFormat` constructor.
- `Intl.DurationFormat.prototype[Symbol.toStringTag]`
    The initial value of the `[Symbol.toStringTag]` property is the string `"Intl.DurationFormat"`. This property is used in `Object.prototype.toString()`.

## Instance methods

- `Intl.DurationFormat.prototype.format()`
    Getter function that formats a duration according to the locale and formatting options of this `DurationFormat` object.
- `Intl.DurationFormat.prototype.formatToParts()`
    Returns an `Array` of objects representing the formatted duration in parts.
- `Intl.DurationFormat.prototype.resolvedOptions()`
    Returns a new object with properties reflecting the locale and formatting options computed during initialization of the object.

## Examples

### Using Intl.DurationFormat

The examples below show how to use the `Intl.DurationFormat` object to format a duration object with various locales and styles.

```js
const duration = {
  hours: 1,
  minutes: 46,
  seconds: 40,
};

// With style set to "long" and locale "fr-FR"
new Intl.DurationFormat("fr-FR", { style: "long" }).format(duration);
// "1 heure, 46 minutes et 40 secondes"

// With style set to "short" and locale "en"
new Intl.DurationFormat("en", { style: "short" }).format(duration);
// "1 hr, 46 min and 40 sec"

// With style set to "narrow" and locale "pt"
new Intl.DurationFormat("pt", { style: "narrow" }).format(duration);
// "1 h 46 min 40 s"
```

## See also

- Polyfill of `Intl.DurationFormat` in FormatJS
- `Intl`
- `Temporal.Duration.prototype.toLocaleString()`
