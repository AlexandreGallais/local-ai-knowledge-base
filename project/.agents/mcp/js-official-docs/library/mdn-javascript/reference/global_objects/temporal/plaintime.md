---
title: "Temporal.PlainTime"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaintime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainTime

The **`Temporal.PlainTime`** object represents a time without a date or time zone; for example, a recurring event that happens at the same time every day. It is fundamentally represented as a combination of hour, minute, second, millisecond, microsecond, and nanosecond values.

## Description

A `PlainTime` is essentially the time part of a `Temporal.PlainDateTime` object, with the date information removed. Because the date and time information don't have much interaction, all general information about time properties is documented here.

### RFC 9557 format

`PlainTime` objects can be serialized and parsed using the RFC 9557 format, an extension to the ISO 8601 / RFC 3339 format. The string has the following form:

```plain
HH:mm:ss.sssssssss
```

- `HH`
    A two-digit number from `00` to `23`. It may be prefixed by the time designator `T` or `t`.
- `mm` (optional)
    A two-digit number from `00` to `59`. Defaults to `00`.
- `ss.sssssssss` (optional)
    A two-digit number from `00` to `59`. May optionally be followed by a `.` or `,` and one to nine digits. Defaults to `00`. The `HH`, `mm`, and `ss` components can be separated by `:` or nothing. You can omit either just `ss` or both `ss` and `mm`, so the time can be one of three forms: `HH`, `HH:mm`, or `HH:mm:ss.sssssssss`.

As an input, you may optionally include the date, offset, time zone identifier, and calendar, in the same format as `PlainDateTime`, but they will be ignored. A date-only string will be rejected. Other annotations in the `[key=value]` format are also ignored, and they must not have the critical flag.

When serializing, you can configure the fractional second digits.

## Constructor

- `Temporal.PlainTime()`
    Creates a new `Temporal.PlainTime` object by directly supplying the underlying data.

## Static methods

- `Temporal.PlainTime.compare()`
    Returns a number (-1, 0, or 1) indicating whether the first time comes before, is the same as, or comes after the second time. Equivalent to comparing the hour, minute, second, millisecond, microsecond, and nanosecond fields one by one.
- `Temporal.PlainTime.from()`
    Creates a new `Temporal.PlainTime` object from another `Temporal.PlainTime` object, an object with time properties, or an RFC 9557 string.

## Instance properties

These properties are defined on `Temporal.PlainTime.prototype` and shared by all `Temporal.PlainTime` instances.

- `Temporal.PlainTime.prototype.constructor`
    The constructor function that created the instance object. For `Temporal.PlainTime` instances, the initial value is the `Temporal.PlainTime()` constructor.
- `Temporal.PlainTime.prototype.hour`
    Returns an integer from 0 to 23 representing the hour component of this time.
- `Temporal.PlainTime.prototype.microsecond`
    Returns an integer from 0 to 999 representing the microsecond (10-6 second) component of this time.
- `Temporal.PlainTime.prototype.millisecond`
    Returns an integer from 0 to 999 representing the millisecond (10-3 second) component of this time.
- `Temporal.PlainTime.prototype.minute`
    Returns an integer from 0 to 59 representing the minute component of this time.
- `Temporal.PlainTime.prototype.nanosecond`
    Returns an integer from 0 to 999 representing the nanosecond (10-9 second) component of this time.
- `Temporal.PlainTime.prototype.second`
    Returns an integer from 0 to 59 representing the second component of this time.
- `Temporal.PlainTime.prototype[Symbol.toStringTag]`
    The initial value of the `[Symbol.toStringTag]` property is the string `"Temporal.PlainTime"`. This property is used in `Object.prototype.toString()`.

## Instance methods

- `Temporal.PlainTime.prototype.add()`
    Returns a new `Temporal.PlainTime` object representing this time moved forward by a given duration (in a form convertible by `Temporal.Duration.from()`), wrapping around the clock if necessary.
- `Temporal.PlainTime.prototype.equals()`
    Returns `true` if this time is equivalent in value to another time (in a form convertible by `Temporal.PlainTime.from()`), and `false` otherwise. They are compared by their time values. Equivalent to `Temporal.PlainTime.compare(this, other) === 0`.
- `Temporal.PlainTime.prototype.round()`
    Returns a new `Temporal.PlainTime` object representing this time rounded to the given unit.
- `Temporal.PlainTime.prototype.since()`
    Returns a new `Temporal.Duration` object representing the duration from another time (in a form convertible by `Temporal.PlainTime.from()`) to this time. The duration is positive if the other time is before this time, and negative if after.
- `Temporal.PlainTime.prototype.subtract()`
    Returns a new `Temporal.PlainTime` object representing this time moved backward by a given duration (in a form convertible by `Temporal.Duration.from()`), wrapping around the clock if necessary.
- `Temporal.PlainTime.prototype.toJSON()`
    Returns a string representing this time in the same RFC 9557 format as calling `toString()`. Intended to be implicitly called by `JSON.stringify()`.
- `Temporal.PlainTime.prototype.toLocaleString()`
    Returns a string with a language-sensitive representation of this time.
- `Temporal.PlainTime.prototype.toString()`
    Returns a string representing this time in the RFC 9557 format.
- `Temporal.PlainTime.prototype.until()`
    Returns a new `Temporal.Duration` object representing the duration from this time to another time (in a form convertible by `Temporal.PlainTime.from()`). The duration is positive if the other time is after this time, and negative if before.
- `Temporal.PlainTime.prototype.valueOf()`
    Throws a `TypeError`, which prevents `Temporal.PlainTime` instances from being implicitly converted to primitives when used in arithmetic or comparison operations.
- `Temporal.PlainTime.prototype.with()`
    Returns a new `Temporal.PlainTime` object representing this time with some fields replaced by new values.

## See also

- `Temporal`
- `Temporal.Duration`
- `Temporal.PlainDateTime`
