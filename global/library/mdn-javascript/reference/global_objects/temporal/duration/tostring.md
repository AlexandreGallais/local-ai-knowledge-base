---
title: "Temporal.Duration.prototype.toString()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/duration/tostring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.Duration.prototype.toString()

The **`toString()`** method of `Temporal.Duration` instances returns a string representing this duration in the ISO 8601 format.

## Syntax

```js
toString()
toString(options)
```

### Parameters

- `options` (optional)
    An object containing some or all of the following properties (in the order they are retrieved and validated):
    - `fractionalSecondDigits` (optional)
        Either an integer from 0 to 9, or the string `"auto"`. The default is `"auto"`. If `"auto"`, then trailing zeros are removed from the fractional seconds. Otherwise, the fractional part of the second component contains this many digits, padded with zeros or rounded as necessary.
    - `roundingMode` (optional)
        A string specifying how to round off fractional second digits beyond `fractionalSecondDigits`. See `Intl.NumberFormat()`. Defaults to `"trunc"`.
    - `smallestUnit` (optional)
        A string specifying the smallest unit to include in the output. Possible values are `"second"`, `"millisecond"`, `"microsecond"`, and `"nanosecond"`, or their plural forms, which are equivalent to `fractionalSecondDigits` values of `0`, `3`, `6`, `9`, respectively. If specified, then `fractionalSecondDigits` is ignored.

### Return value

A string representing the given duration in the ISO 8601 format, with subsecond components formatted according to the options. The zero duration is represented as `"PT0S"`.

### Exceptions

- `RangeError`
    Thrown if any of the options is invalid.

## Examples

### Using toString()

```js
const duration = Temporal.Duration.from({ hours: 1, minutes: 30, seconds: 15 });
console.log(duration.toString()); // 'PT1H30M15S'

// Stringification implicitly calls toString()
console.log(`${duration}`); // 'PT1H30M15S'
```

### Using options

```js
const worldRecord = Temporal.Duration.from({ seconds: 9, milliseconds: 580 });
console.log(worldRecord.toString()); // 'PT9.58S'
console.log(worldRecord.toString({ fractionalSecondDigits: 1 })); // 'PT9.5S'
console.log(worldRecord.toString({ fractionalSecondDigits: 0 })); // 'PT9S'
console.log(worldRecord.toString({ smallestUnit: "millisecond" })); // 'PT9.580S'
console.log(
  worldRecord.toString({
    fractionalSecondDigits: 1,
    roundingMode: "halfExpand",
  }),
); // 'PT9.6S'
```

## See also

- `Temporal.Duration`
- `Temporal.Duration.prototype.toJSON()`
- `Temporal.Duration.prototype.toLocaleString()`
