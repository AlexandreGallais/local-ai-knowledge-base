---
title: "Temporal.Instant"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/instant/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.Instant

The **`Temporal.Instant`** object represents a unique point in time, with nanosecond precision. It is fundamentally represented as the number of nanoseconds since the Unix epoch (midnight at the beginning of January 1, 1970, UTC), without any time zone or calendar system.

## Description

`Temporal.Instant` is semantically the same as `Date`. They both encapsulate a single point in time, but `Temporal.Instant` is more precise because it stores nanoseconds rather than milliseconds. `Temporal.Instant` also avoids pitfalls of `Date` because it does not assume any calendar or time zone information—if you want to read any date or time information such as year or month, you need to convert it to a `Temporal.ZonedDateTime` first, using `toZonedDateTimeISO()`.

You can convert from `Date` to `Temporal.Instant` using the `Date.prototype.toTemporalInstant()` method, which should be preferred over other methods such as `Temporal.Instant.fromEpochMilliseconds()` because the former involves less user code and may be more optimized. You can also convert from `Temporal.Instant` to `Date` using its epoch milliseconds, such as `new Date(instant.epochMilliseconds)`.

### RFC 9557 format

`Instant` objects can be serialized and parsed using the RFC 9557 format, an extension to the ISO 8601 / RFC 3339 format. The string has the following form (spaces are only for readability and should not be present in the actual string):

```plain
YYYY-MM-DD T HH:mm:ss.sssssssss Z/±HH:mm
```

- `YYYY`
    Either a four-digit number, or a six-digit number with a `+` or `-` sign.
- `MM`
    A two-digit number from `01` to `12`.
- `DD`
    A two-digit number from `01` to `31`. The `YYYY`, `MM`, and `DD` components can be separated by `-` or nothing.
- `T`
    The date-time separator, which can be `T`, `t`, or a space.
- `HH`
    A two-digit number from `00` to `23`.
- `mm` (optional)
    A two-digit number from `00` to `59`. Defaults to `00`.
- `ss.sssssssss` (optional)
    A two-digit number from `00` to `59`. May optionally be followed by a `.` or `,` and one to nine digits. Defaults to `00`. The `HH`, `mm`, and `ss` components can be separated by `:` or nothing. You can omit either just `ss` or both `ss` and `mm`, so the time can be one of three forms: `HH`, `HH:mm`, or `HH:mm:ss.sssssssss`.
- `Z/±HH:mm`
    Either the UTC designator `Z` or `z`, or an offset from UTC in the form `+` or `-` followed by the same format as the time component. Note that subminute precision (`:ss.sssssssss`) may be unsupported by other systems, and is accepted but never output. If an offset is provided, the time is interpreted in the specified offset.

As an input, you may optionally include the time zone identifier and calendar, in the same format as `ZonedDateTime`, but they will be ignored. Other annotations in the `[key=value]` format are also ignored, and they must not have the critical flag.

When serializing, you can configure the fractional second digits and offset.

## Constructor

- `Temporal.Instant()`
    Creates a new `Temporal.Instant` object by directly supplying the underlying data.

## Static methods

- `Temporal.Instant.compare()`
    Returns a number (-1, 0, or 1) indicating whether the first instant comes before, is the same as, or comes after the second instant. Equivalent to comparing the `epochNanoseconds` of the two instants.
- `Temporal.Instant.from()`
    Creates a new `Temporal.Instant` object from another `Temporal.Instant` object, or an RFC 9557 string.
- `Temporal.Instant.fromEpochMilliseconds()`
    Creates a new `Temporal.Instant` object from the number of milliseconds since the Unix epoch (midnight at the beginning of January 1, 1970, UTC).
- `Temporal.Instant.fromEpochNanoseconds()`
    Creates a new `Temporal.Instant` object from the number of nanoseconds since the Unix epoch (midnight at the beginning of January 1, 1970, UTC).

## Instance properties

These properties are defined on `Temporal.Instant.prototype` and shared by all `Temporal.Instant` instances.

- `Temporal.Instant.prototype.constructor`
    The constructor function that created the instance object. For `Temporal.Instant` instances, the initial value is the `Temporal.Instant()` constructor.
- `Temporal.Instant.prototype.epochMilliseconds`
    Returns an integer representing the number of milliseconds elapsed since the Unix epoch (midnight at the beginning of January 1, 1970, UTC) to this instant. Equivalent to dividing `epochNanoseconds` by `1e6` and flooring it.
- `Temporal.Instant.prototype.epochNanoseconds`
    Returns a `BigInt` representing the number of nanoseconds since the Unix epoch (midnight at the beginning of January 1, 1970, UTC) to this instant.
- `Temporal.Instant.prototype[Symbol.toStringTag]`
    The initial value of the `[Symbol.toStringTag]` property is the string `"Temporal.Instant"`. This property is used in `Object.prototype.toString()`.

## Instance methods

- `Temporal.Instant.prototype.add()`
    Returns a new `Temporal.Instant` object representing this instant moved forward by a given duration (in a form convertible by `Temporal.Duration.from()`).
- `Temporal.Instant.prototype.equals()`
    Returns `true` if this instant is equivalent in value to another instant (in a form convertible by `Temporal.Instant.from()`), and `false` otherwise. They are compared by their epoch nanoseconds. Equivalent to `Temporal.Instant.compare(this, other) === 0`.
- `Temporal.Instant.prototype.round()`
    Returns a new `Temporal.Instant` object representing this instant rounded to the given unit.
- `Temporal.Instant.prototype.since()`
    Returns a new `Temporal.Duration` object representing the duration from another instant (in a form convertible by `Temporal.Instant.from()`) to this instant. The duration is positive if the other instant is before this instant, and negative if after.
- `Temporal.Instant.prototype.subtract()`
    Returns a new `Temporal.Instant` object representing this instant moved backward by a given duration (in a form convertible by `Temporal.Duration.from()`).
- `Temporal.Instant.prototype.toJSON()`
    Returns a string representing this instant in the same RFC 9557 format as calling `toString()`. Intended to be implicitly called by `JSON.stringify()`.
- `Temporal.Instant.prototype.toLocaleString()`
    Returns a string with a language-sensitive representation of this instant. In implementations with `Intl.DateTimeFormat` API support, this method delegates to `Intl.DateTimeFormat`.
- `Temporal.Instant.prototype.toString()`
    Returns a string representing this instant in the RFC 9557 format using the specified time zone.
- `Temporal.Instant.prototype.toZonedDateTimeISO()`
    Returns a new `Temporal.ZonedDateTime` object representing this instant in the specified time zone using the ISO 8601 calendar system.
- `Temporal.Instant.prototype.until()`
    Returns a new `Temporal.Duration` object representing the duration from this instant to another instant (in a form convertible by `Temporal.Instant.from()`). The duration is positive if the other instant is after this instant, and negative if before.
- `Temporal.Instant.prototype.valueOf()`
    Throws a `TypeError`, which prevents `Temporal.Instant` instances from being implicitly converted to primitives when used in arithmetic or comparison operations.

## See also

- `Temporal`
- `Temporal.Duration`
- `Temporal.ZonedDateTime`
