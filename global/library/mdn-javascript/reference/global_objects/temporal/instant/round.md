---
title: "Temporal.Instant.prototype.round()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/instant/round/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.Instant.prototype.round()

The **`round()`** method of `Temporal.Instant` instances returns a new `Temporal.Instant` object representing this instant rounded to the given unit.

## Syntax

```js
round(smallestUnit)
round(options)
```

### Parameters

- `smallestUnit`
    A string representing the `smallestUnit` option. This is a convenience overload, so `round(smallestUnit)` is equivalent to `round({ smallestUnit })`, where `smallestUnit` is a string.
- `options`
    An object containing some or all of the following properties (in the order they are retrieved and validated):
    - `roundingIncrement` (optional)
        A number (truncated to an integer) representing the rounding increment in the given `smallestUnit`. Defaults to `1`. The increment and the `smallestUnit` must evenly divide 24 hours; for example, 45 seconds is a divisor of 86400 seconds, and 100 minutes is a divisor of 3600 minutes. This is slightly less strict than the `round()` method of the other classes, which all require the increment to be a divisor of the maximum value of the unit.
    - `roundingMode` (optional)
        A string specifying how to round off the fractional part of `smallestUnit`. See `Intl.NumberFormat()`. Defaults to `"halfExpand"`.
    - `smallestUnit`
        A string representing the smallest unit to include in the output. The value must be one of the following: `"hour"`, `"minute"`, `"second"`, `"millisecond"`, `"microsecond"`, `"nanosecond"`, or their plural forms. For units larger than `"nanosecond"`, fractional parts of the `smallestUnit` will be rounded according to the `roundingIncrement` and `roundingMode` settings.

### Return value

A new `Temporal.Instant` object representing this instant rounded to the given unit, where all units smaller than `smallestUnit` are zeroed out.

### Exceptions

- `RangeError`
    Thrown if any of the options is invalid.

## Examples

### Rounding off small units

```js
const instant = Temporal.Instant.fromEpochMilliseconds(1000);
const roundedInstant = instant.round("second");
console.log(roundedInstant.epochMilliseconds); // 1000

const instant2 = instant.round("minute");
console.log(instant2.epochMilliseconds); // 0
```

## See also

- `Temporal.Instant`
