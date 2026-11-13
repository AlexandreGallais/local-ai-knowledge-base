---
title: "Temporal.PlainDate.prototype.subtract()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaindate/subtract/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainDate.prototype.subtract()

The **`subtract()`** method of `Temporal.PlainDate` instances returns a new `Temporal.PlainDate` object representing this date moved backward by a given duration (in a form convertible by `Temporal.Duration.from()`).

If you want to subtract two dates and get a duration, use `since()` or `until()` instead.

## Syntax

```js
subtract(duration)
subtract(duration, options)
```

### Parameters

- `duration`
    A string, an object, or a `Temporal.Duration` instance representing a duration to subtract from this date. It is converted to a `Temporal.Duration` object using the same algorithm as `Temporal.Duration.from()`.
- `options` (optional)
    An object containing the following property:
    - `overflow` (optional)
        A string specifying the behavior when a date component is out of range. Possible values are:
        - `"constrain"` (default)
            The date component is clamped to the valid range.
        - `"reject"`
            A `RangeError` is thrown if the date component is out of range.

### Return value

A new `Temporal.PlainDate` object representing the date specified by the original `PlainDate`, minus the duration.

### Exceptions

- `RangeError`
    Thrown if the result is not in the representable range, which is ±(108 + 1) days, or about ±273,972.6 years, from the Unix epoch.

## Description

Subtracting a duration is equivalent to adding its negation, so all the same considerations apply.

## Examples

### Subtracting a duration

```js
const start = Temporal.PlainDate.from("2022-01-01");
const end = start.subtract({ years: 1, months: 2, weeks: 3, days: 4 });
console.log(end.toString()); // 2020-10-07
```

For more examples, see `add()`.

## See also

- `Temporal.PlainDate`
- `Temporal.Duration`
- `Temporal.PlainDate.prototype.add()`
- `Temporal.PlainDate.prototype.since()`
- `Temporal.PlainDate.prototype.until()`
