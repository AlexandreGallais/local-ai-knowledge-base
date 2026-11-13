---
title: "Temporal.ZonedDateTime.prototype.subtract()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/zoneddatetime/subtract/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.ZonedDateTime.prototype.subtract()

The **`subtract()`** method of `Temporal.ZonedDateTime` instances returns a new `Temporal.ZonedDateTime` object representing this date-time moved backward by a given duration (in a form convertible by `Temporal.Duration.from()`).

If you want to subtract two date-times and get a duration, use `since()` or `until()` instead.

## Syntax

```js
subtract(duration)
subtract(duration, options)
```

### Parameters

- `duration`
    A string, an object, or a `Temporal.Duration` instance representing a duration to subtract from this date-time. It is converted to a `Temporal.Duration` object using the same algorithm as `Temporal.Duration.from()`.
- `options` (optional)
    An object containing the following property:
    - `overflow` (optional)
        A string specifying the behavior when a date component is out of range. Possible values are:
        - `"constrain"` (default)
            The date component is clamped to the valid range.
        - `"reject"`
            A `RangeError` is thrown if the date component is out of range.

### Return value

A new `Temporal.ZonedDateTime` object representing the date-time specified by the original `ZonedDateTime`, minus the duration.

### Exceptions

- `RangeError`
    Thrown if the result is not in the representable range, which is ±108 days, or about ±273,972.6 years, from the Unix epoch.

## Description

Subtracting a duration is equivalent to adding its negation, so all the same considerations apply.

## Examples

### Subtracting a duration

```js
const start = Temporal.ZonedDateTime.from(
  "2021-01-01T12:34:56-05:00[America/New_York]",
);
const end = start.subtract({
  years: 1,
  months: 2,
  weeks: 3,
  days: 4,
  hours: 5,
  minutes: 6,
  seconds: 7,
  milliseconds: 8,
});
console.log(end.toString()); // 2019-10-07T07:28:48.992-04:00[America/New_York]
```

## See also

- `Temporal.ZonedDateTime`
- `Temporal.Duration`
- `Temporal.ZonedDateTime.prototype.add()`
- `Temporal.ZonedDateTime.prototype.since()`
- `Temporal.ZonedDateTime.prototype.until()`
