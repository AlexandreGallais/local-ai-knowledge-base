---
title: "Temporal.Instant.prototype.toString()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/instant/tostring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.Instant.prototype.toString()

The **`toString()`** method of `Temporal.Instant` instances returns a string representing this instant in the RFC 9557 format using the specified time zone.

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
        A string specifying the smallest unit to include in the output. Possible values are `"minute"`, `"second"`, `"millisecond"`, `"microsecond"`, and `"nanosecond"`, or their plural forms, which (except `"minute"`) are equivalent to `fractionalSecondDigits` values of `0`, `3`, `6`, `9`, respectively. If specified, then `fractionalSecondDigits` is ignored.
    - `timeZone` (optional)
        Either a string or a `Temporal.ZonedDateTime` instance representing the time zone to use. If a `Temporal.ZonedDateTime` instance, its time zone is used. If a string, it can be a named time zone identifier, an offset time zone identifier, or a date-time string containing a time zone identifier or an offset (see time zones and offsets for more information). Defaults to `"UTC"`.

### Return value

A string in the RFC 9557 format representing this instant using the specified time zone. No annotations, such as time zone names, are included.

### Exceptions

- `RangeError`
    Thrown if any of the options is invalid.

## Examples

### Using toString()

```js
const instant = Temporal.Instant.fromEpochMilliseconds(1627814412345);
console.log(instant.toString()); // '2021-08-01T10:40:12.345Z'

// Stringification implicitly calls toString()
console.log(`${instant}`); // '2021-08-01T10:40:12.345Z'
```

### Using options

```js
const instant = Temporal.Instant.fromEpochMilliseconds(1627814412345);
console.log(instant.toString({ fractionalSecondDigits: 1 })); // '2021-08-01T10:40:12.3Z'
console.log(instant.toString({ smallestUnit: "minute" })); // '2021-08-01T10:40Z'
console.log(instant.toString({ timeZone: "America/New_York" })); // '2021-08-01T06:40:12.345-04:00'

// The time zone name automatically resolves to the correct offset
// based on the instant; for example, America/New_York is UTC-4 in summer,
// but UTC-5 in winter.
const instant2 = Temporal.Instant.fromEpochMilliseconds(1577836800000);
console.log(instant2.toString({ timeZone: "UTC" })); // '2029-12-31T23:00:00Z'
console.log(instant2.toString({ timeZone: "America/New_York" })); // '2019-12-31T19:00:00-05:00'
```

## See also

- `Temporal.Instant`
- `Temporal.Instant.from()`
- `Temporal.Instant.prototype.toJSON()`
- `Temporal.Instant.prototype.toLocaleString()`
