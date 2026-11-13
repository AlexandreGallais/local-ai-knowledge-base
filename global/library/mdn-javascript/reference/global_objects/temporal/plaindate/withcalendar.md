---
title: "Temporal.PlainDate.prototype.withCalendar()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaindate/withcalendar/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainDate.prototype.withCalendar()

The **`withCalendar()`** method of `Temporal.PlainDate` instances returns a new `Temporal.PlainDate` object representing this date interpreted in the new calendar system. Because all `Temporal` objects are designed to be immutable, this method essentially functions as the setter for the date's `calendarId` property.

To replace the date component properties, use the `with()` method instead.

## Syntax

```js
withCalendar(calendar)
```

### Parameters

- `calendar`
    A string that corresponds to the `calendarId` property. See `Intl.supportedValuesOf()` for a list of commonly supported calendar types.

### Return value

A new `Temporal.PlainDate` object, representing the date specified by the original `PlainDate`, interpreted in the new calendar system.

### Exceptions

- `TypeError`
    Thrown if `calendar` is not a string.
- `RangeError`
    Thrown if `calendar` is not a valid calendar identifier.

## Examples

### Using withCalendar()

```js
const date = Temporal.PlainDate.from("2021-07-01");
const newDate = date.withCalendar("islamic-umalqura");
console.log(newDate.toLocaleString("en-US", { calendar: "islamic-umalqura" }));
// 11/21/1442 AH
```

## See also

- `Temporal.PlainDate`
- `Temporal.PlainDate.prototype.with()`
- `Temporal.PlainDate.from()`
- `Temporal.PlainDate.prototype.calendarId`
