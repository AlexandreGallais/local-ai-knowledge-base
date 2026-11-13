---
title: "Temporal.ZonedDateTime.prototype.round()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/zoneddatetime/round/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.ZonedDateTime.prototype.round()

The **`round()`** method of `Temporal.ZonedDateTime` instances returns a new `Temporal.ZonedDateTime` object representing this date-time rounded to the given unit.

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
        A number (truncated to an integer) representing the rounding increment in the given `smallestUnit`. Defaults to `1`. For all values of `smallestUnit` except `"day"`, the increment must be a divisor of the maximum value of the unit; for example, if the unit is hours, the increment must be a divisor of 24 and must not be 24 itself, which means it can be 1, 2, 3, 4, 6, 8, or 12. For `"day"`, the increment must be 1.
    - `roundingMode` (optional)
        A string specifying how to round off the fractional part of `smallestUnit`. See `Intl.NumberFormat()`. Defaults to `"halfExpand"`.
    - `smallestUnit`
        A string representing the smallest unit to include in the output. The value must be one of the following: `"day"`, `"hour"`, `"minute"`, `"second"`, `"millisecond"`, `"microsecond"`, `"nanosecond"`, or their plural forms. For units larger than `"nanosecond"`, fractional parts of the `smallestUnit` will be rounded according to the `roundingIncrement` and `roundingMode` settings.

### Return value

A new `Temporal.ZonedDateTime` object representing this date-time rounded to the given unit, where all units smaller than `smallestUnit` are zeroed out.

If `smallestUnit` is `"day"`, the returned date-time will be the start of day of this date or the next day, depending on the `roundingMode` and the distance to these two instants. Otherwise, the rounding is first performed on its `PlainDateTime` (same as `Temporal.PlainDateTime.prototype.round()`), and then re-interpreted in the same time zone, with `disambiguation: "compatible", offset: "prefer"`. See ambiguity and gaps from local time to UTC time and offset ambiguity.

### Exceptions

- `RangeError`
    Thrown if any of the options is invalid.

## Examples

### Rounding off small units

```js
const zdt = Temporal.ZonedDateTime.from(
  "2021-07-01T12:34:56.123456789[America/New_York]",
);
const nearestMillisecond = zdt.round("millisecond");
console.log(nearestMillisecond.toString()); // 2021-07-01T12:34:56.123-04:00[America/New_York]

const nearestHalfHour = zdt.round({
  smallestUnit: "minute",
  roundingIncrement: 30,
});
console.log(nearestHalfHour.toString()); // 2021-07-01T12:30:00-04:00[America/New_York]

const nextDay = zdt.round({ smallestUnit: "day", roundingMode: "ceil" });
console.log(nextDay.toString()); // 2021-07-02T00:00:00-04:00[America/New_York]
```

### Ambiguity after rounding

It's possible that the rounded date-time is ambiguous in the given time zone. The ambiguity is always resolved using `disambiguation: "compatible", offset: "prefer"`. Here's a quick example:

```js
const zdt = Temporal.ZonedDateTime.from(
  "2024-03-10T01:00:00-05:00[America/New_York]",
);
const rounded = zdt.round({ smallestUnit: "hour", roundingIncrement: 2 });
// The result is supposed to be 2024-03-10T02:00:00-05:00[America/New_York],
// but this time does not exist. `disambiguation: "compatible"` tells us to move
// forward by 1 hour.
console.log(rounded.toString()); // 2024-03-10T03:00:00-04:00[America/New_York]
```

## See also

- `Temporal.ZonedDateTime`
