---
title: "Temporal.ZonedDateTime.prototype.withCalendar()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/zoneddatetime/withcalendar/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.ZonedDateTime.prototype.withCalendar()

The **`withCalendar()`** method of `Temporal.ZonedDateTime` instances returns a new `Temporal.ZonedDateTime` object representing this date-time interpreted in the new calendar system. Because all `Temporal` objects are designed to be immutable, this method essentially functions as the setter for the date-time's `calendarId` property.

To replace the date-time component properties, use the `with()` method. To replace its time zone, use the `withTimeZone()` method.

## Syntax

```js
withCalendar(calendar)
```

### Parameters

- `calendar`
    A string that corresponds to the `calendarId` property. See `Intl.supportedValuesOf()` for a list of commonly supported calendar types.

### Return value

A new `Temporal.ZonedDateTime` object, representing the date-time specified by the original `ZonedDateTime`, interpreted in the new calendar system.

### Exceptions

- `TypeError`
    Thrown if `calendar` is not a string.
- `RangeError`
    Thrown if `calendar` is not a valid calendar identifier.

## Examples

### Using withCalendar()

```js
const zdt = Temporal.ZonedDateTime.from(
  "2021-07-01T12:34:56[America/New_York]",
);
const newZDT = zdt.withCalendar("islamic-umalqura");
console.log(newZDT.toLocaleString("en-US", { calendar: "islamic-umalqura" }));
// 11/21/1442 AH, 12:34:56 PM EDT
```

## See also

- `Temporal.ZonedDateTime`
- `Temporal.ZonedDateTime.prototype.with()`
- `Temporal.ZonedDateTime.prototype.withTimeZone()`
- `Temporal.ZonedDateTime.prototype.withPlainTime()`
- `Temporal.ZonedDateTime.from()`
- `Temporal.ZonedDateTime.prototype.calendarId`
