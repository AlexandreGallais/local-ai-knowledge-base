---
title: "Temporal.PlainDateTime.prototype.toString()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaindatetime/tostring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainDateTime.prototype.toString()

The **`toString()`** method of `Temporal.PlainDateTime` instances returns a string representing this date-time in the RFC 9557 format.

## Syntax

```js
toString()
toString(options)
```

### Parameters

- `options` (optional)
    An object containing the following property:
    - `calendarName` (optional)
        Whether to show the calendar annotation (`[u-ca=calendar_id]`) in the return value. Possible values are:
        - `"auto"` (default)
            Include the calendar annotation if the calendar is not `"iso8601"`.
        - `"always"`
            Always include the calendar annotation.
        - `"never"`
            Never include the calendar annotation. This makes the returned string not recoverable to the same `Temporal.PlainDateTime` instance, although the date value still remains the same.
        - `"critical"`
            Always include the calendar annotation, and add a critical flag: `[!u-ca=calendar_id]`. Useful when sending the string to certain systems, but not useful for Temporal itself.
    - `fractionalSecondDigits` (optional)
        Either an integer from 0 to 9, or the string `"auto"`. The default is `"auto"`. If `"auto"`, then trailing zeros are removed from the fractional seconds. Otherwise, the fractional part of the second component contains this many digits, padded with zeros or rounded as necessary.
    - `roundingMode` (optional)
        A string specifying how to round off fractional second digits beyond `fractionalSecondDigits`. See `Intl.NumberFormat()`. Defaults to `"trunc"`.
    - `smallestUnit` (optional)
        A string specifying the smallest unit to include in the output. Possible values are `"minute"`, `"second"`, `"millisecond"`, `"microsecond"`, and `"nanosecond"`, or their plural forms, which (except `"minute"`) are equivalent to `fractionalSecondDigits` values of `0`, `3`, `6`, `9`, respectively. If specified, then `fractionalSecondDigits` is ignored.

### Return value

A string in the RFC 9557 format representing this date-time. The calendar annotation is included as specified.

### Exceptions

- `RangeError`
    Thrown if any of the options is invalid.
- `TypeError`
    Thrown if `options` is not an object or `undefined`.

## Examples

### Using toString()

```js
const dt = Temporal.PlainDateTime.from("2021-08-01T12:34:56");
console.log(dt.toString()); // '2021-08-01T12:34:56'
```

For examples with rounding times, see `Temporal.PlainTime.prototype.toString()`. For examples with displaying calendars, see `Temporal.PlainDate.prototype.toString()`.

## See also

- `Temporal.PlainDateTime`
- `Temporal.PlainDateTime.from()`
- `Temporal.PlainDateTime.prototype.toJSON()`
- `Temporal.PlainDateTime.prototype.toLocaleString()`
