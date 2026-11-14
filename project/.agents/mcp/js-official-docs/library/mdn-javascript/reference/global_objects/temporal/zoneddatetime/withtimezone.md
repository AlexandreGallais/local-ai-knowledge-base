---
title: "Temporal.ZonedDateTime.prototype.withTimeZone()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/zoneddatetime/withtimezone/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.ZonedDateTime.prototype.withTimeZone()

The **`withTimeZone()`** method of `Temporal.ZonedDateTime` instances returns a new `Temporal.ZonedDateTime` object representing the same instant as this date-time but in the new time zone. Because all `Temporal` objects are designed to be immutable, this method essentially functions as the setter for the date-time's `timeZoneId` property.

To replace the date-time component properties, use the `with()` method. To replace its calendar, use the `withCalendar()` method.

## Syntax

```js
withTimeZone(timeZone)
```

### Parameters

- `timeZone`
    Either a string or a `Temporal.ZonedDateTime` instance representing the time zone to use. If a `Temporal.ZonedDateTime` instance, its time zone is used. If a string, it can be a named time zone identifier, an offset time zone identifier, or a date-time string containing a time zone identifier or an offset (see time zones and offsets for more information).

### Return value

A new `Temporal.ZonedDateTime` object representing the same instant as this date-time but in the new time zone.

### Exceptions

- `TypeError`
    Thrown if `timeZone` is not a string or a `Temporal.ZonedDateTime` instance.
- `RangeError`
    Thrown if the time zone name is invalid.

## Examples

### Using withTimeZone()

```js
const meetingTime = Temporal.ZonedDateTime.from(
  "2021-08-01T12:00[America/New_York]",
);
const meetingTimeInParis = meetingTime.withTimeZone("Europe/Paris");
console.log(meetingTimeInParis.toString()); // 2021-08-01T18:00:00+02:00[Europe/Paris]
```

### Replacing the time zone while keeping the same wall-clock time

In the rare case where you want to keep the wall-clock time the same but change the time zone (and result in a different instant), convert it to a `Temporal.PlainDateTime` first:

```js
const meetingTime = Temporal.ZonedDateTime.from(
  "2021-08-01T12:00[America/New_York]",
);
const meetingTimeInParis = meetingTime
  .toPlainDateTime()
  .toZonedDateTime("Europe/Paris");
console.log(meetingTimeInParis.toString()); // 2021-08-01T12:00:00+02:00[Europe/Paris]
```

## See also

- `Temporal.ZonedDateTime`
- `Temporal.ZonedDateTime.prototype.with()`
- `Temporal.ZonedDateTime.prototype.withCalendar()`
- `Temporal.ZonedDateTime.prototype.withPlainTime()`
- `Temporal.ZonedDateTime.from()`
- `Temporal.ZonedDateTime.prototype.timeZoneId`
