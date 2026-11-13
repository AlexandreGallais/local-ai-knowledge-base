---
title: "Temporal.PlainTime.prototype.round()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaintime/round/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainTime.prototype.round()

The **`round()`** method of `Temporal.PlainTime` instances returns a new `Temporal.PlainTime` object representing this time rounded to the given unit.

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
        A number (truncated to an integer) representing the rounding increment in the given `smallestUnit`. Defaults to `1`. The increment must be a divisor of the maximum value of `smallestUnit`; for example, if the unit is hours, the increment must be a divisor of 24 and must not be 24 itself, which means it can be 1, 2, 3, 4, 6, 8, or 12.
    - `roundingMode` (optional)
        A string specifying how to round off the fractional part of `smallestUnit`. See `Intl.NumberFormat()`. Defaults to `"halfExpand"`.
    - `smallestUnit`
        A string representing the smallest unit to include in the output. The value must be one of the following: `"hour"`, `"minute"`, `"second"`, `"millisecond"`, `"microsecond"`, `"nanosecond"`, or their plural forms. For units larger than `"nanosecond"`, fractional parts of the `smallestUnit` will be rounded according to the `roundingIncrement` and `roundingMode` settings.

### Return value

A new `Temporal.PlainTime` object representing this time rounded to the given unit, where all units smaller than `smallestUnit` are zeroed out.

### Exceptions

- `RangeError`
    Thrown if any of the options is invalid.

## Examples

### Rounding off small units

```js
const time = Temporal.PlainTime.from("12:34:56.123456789");
const nearestMillisecond = time.round("millisecond");
console.log(nearestMillisecond.toString()); // 12:34:56.123

const nearestHalfHour = time.round({
  smallestUnit: "minute",
  roundingIncrement: 30,
});
console.log(nearestHalfHour.toString()); // 12:30:00

const nextHour = time.round({ smallestUnit: "hour", roundingMode: "ceil" });
console.log(nextHour.toString()); // 13:00:00
```

## See also

- `Temporal.PlainTime`
