---
title: "Temporal.PlainDateTime.from()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaindatetime/from/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainDateTime.from()

The **`Temporal.PlainDateTime.from()`** static method creates a new `Temporal.PlainDateTime` object from another `Temporal.PlainDateTime` object, an object with date and time properties, or an RFC 9557 string.

## Syntax

```js
Temporal.PlainDateTime.from(info)
Temporal.PlainDateTime.from(info, options)
```

### Parameters

- `info`
    One of the following:
    - A `Temporal.PlainDateTime` instance, which creates a copy of the instance.
    - An RFC 9557 string containing a date, optionally a time, and optionally a calendar.
    - An object containing properties that are recognized by either `Temporal.PlainDate.from()` (`calendar`, `era`, `eraYear`, `year`, `month`, `monthCode`, `day`) or `Temporal.PlainTime.from()` (`hour`, `minute`, `second`, `millisecond`, `microsecond`, `nanosecond`). The info should explicitly specify a year (as `year` or `era` and `eraYear`), a month (as `month` or `monthCode`), and a day; others are optional and will be set to their default values.
- `options` (optional)
    An object containing the following property:
    - `overflow` (optional)
        A string specifying the behavior when a date component is out of range (when using the object `info`). Possible values are:
        - `"constrain"` (default)
            The date component is clamped to the valid range.
        - `"reject"`
            A `RangeError` is thrown if the date component is out of range.

### Return value

A new `Temporal.PlainDateTime` object, representing the date and time specified by `info` in the specified `calendar`.

### Exceptions

- `TypeError`
    Thrown in one of the following cases:
    - `info` is not an object or a string.
    - `options` is not an object or `undefined`.
    - The provided properties are insufficient to unambiguously determine a date. You usually need to provide a `year` (or `era` and `eraYear`), a `month` (or `monthCode`), and a `day`.
- `RangeError`
    Thrown in one of the following cases:
    - The provided properties that specify the same component are inconsistent.
    - The provided non-numerical properties are not valid; for example, if `monthCode` is never a valid month code in this calendar.
    - The provided numerical properties are out of range, and `options.overflow` is set to `"reject"`.
    - The info is not in the representable range, which is ±(108 + 1) days, or about ±273,972.6 years, from the Unix epoch.

## Examples

### Creating a PlainDateTime from an object

```js
// Year + month + day + hour + minute + second
const dt = Temporal.PlainDateTime.from({
  year: 2021,
  month: 7,
  day: 1,
  hour: 12,
  minute: 34,
  second: 56,
});
console.log(dt.toString()); // "2021-07-01T12:34:56"
```

### Creating a PlainDateTime from a string

```js
const dt = Temporal.PlainDateTime.from("2021-07-01T12:34:56");
console.log(dt.toLocaleString()); // "7/1/2021, 12:34:56 PM" (assuming en-US locale)
```

For more examples, especially regarding different calendars and overflow settings, see `Temporal.PlainDate.from()` and `Temporal.PlainTime.from()`.

## See also

- `Temporal.PlainDateTime`
- `Temporal.PlainDateTime()`
- `Temporal.PlainDateTime.prototype.with()`
