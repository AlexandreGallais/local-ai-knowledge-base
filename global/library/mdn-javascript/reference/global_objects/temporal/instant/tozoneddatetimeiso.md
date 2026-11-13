---
title: "Temporal.Instant.prototype.toZonedDateTimeISO()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/instant/tozoneddatetimeiso/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.Instant.prototype.toZonedDateTimeISO()

The **`toZonedDateTimeISO()`** method of `Temporal.Instant` instances returns a new `Temporal.ZonedDateTime` object representing this instant in the specified time zone using the ISO 8601 calendar system.

## Syntax

```js
toZonedDateTimeISO(timeZone)
```

### Parameters

- `timeZone`
    Either a string or a `Temporal.ZonedDateTime` instance representing the time zone to use. If a `Temporal.ZonedDateTime` instance, its time zone is used. If a string, it can be a named time zone identifier, an offset time zone identifier, or a date-time string containing a time zone identifier or an offset (see time zones and offsets for more information).

### Return value

A new `Temporal.ZonedDateTime` object representing this instant in the specified time zone using the ISO 8601 calendar system.

### Exceptions

- `RangeError`
    Thrown if the time zone name is invalid.
- `TypeError`
    Thrown if `timeZone` is not a string or a `Temporal.ZonedDateTime` instance.

## Examples

### Using toZonedDateTimeISO()

```js
const instant = Temporal.Instant.from("2021-08-01T12:34:56.123456789Z");
const zonedDateTime = instant.toZonedDateTimeISO("America/New_York");
console.log(zonedDateTime.toString()); // 2021-08-01T08:34:56.123456789-04:00[America/New_York]

const localDateTime = instant.toZonedDateTimeISO(Temporal.Now.timeZoneId());
console.log(localDateTime.toString()); // This instant in your timezone
```

## See also

- `Temporal.Instant`
- `Temporal.ZonedDateTime`
- `Temporal.ZonedDateTime.prototype.toInstant()`
