---
title: "Temporal.ZonedDateTime() constructor"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/zoneddatetime/zoneddatetime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.ZonedDateTime() constructor

The **`Temporal.ZonedDateTime()`** constructor creates `Temporal.ZonedDateTime` objects.

This constructor allows you to create instances by directly supplying the underlying data. Like all other `Temporal` classes, you should usually construct `Temporal.ZonedDateTime` objects using the `Temporal.ZonedDateTime.from()` static method, which can handle a variety of input types.

## Syntax

```js
new Temporal.ZonedDateTime(epochNanoseconds, timeZone)
new Temporal.ZonedDateTime(epochNanoseconds, timeZone, calendar)
```

> **Note:**
> `Temporal.ZonedDateTime()` can only be constructed with `new`. Attempting to call it without `new` throws a `TypeError`.

### Parameters

- `epochNanoseconds`
    A BigInt that corresponds to the `epochNanoseconds` property.
- `timeZone`
    A string that corresponds to the `timeZoneId` property. Unlike all other `Temporal` APIs, it must be a valid time zone identifier (either named or offset) as-is, and cannot be a `Temporal.ZonedDateTime` instance or a date-time string.
- `calendar` (optional)
    A string that corresponds to the `calendarId` property. See `Intl.supportedValuesOf()` for a list of commonly supported calendar types. Defaults to `"iso8601"`.

### Return value

A new `Temporal.ZonedDateTime` object, representing the specific instant specified by the parameters.

### Exceptions

- `TypeError`
    Thrown if `timeZone` or `calendar` is not a string.
- `RangeError`
    Thrown in one of the following cases:
    - `epochNanoseconds` is not in the representable range, which is ±108 days, or about ±273,972.6 years, from the Unix epoch.
    - `timeZone` is not a valid time zone identifier.
    - `calendar` is not a valid calendar identifier.

## Examples

### Using Temporal.ZonedDateTime()

```js
const zdt = new Temporal.ZonedDateTime(0n, "America/New_York");
console.log(zdt.toString()); // '1969-12-31T19:00:00-05:00[America/New_York]'
```

## See also

- `Temporal.ZonedDateTime`
- `Temporal.ZonedDateTime.from()`
