---
title: "Temporal.Now.plainDateTimeISO()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/now/plaindatetimeiso/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.Now.plainDateTimeISO()

The **`Temporal.Now.plainDateTimeISO()`** static method returns the current date and time as a `Temporal.PlainDateTime` object, in the ISO 8601 calendar and the specified time zone.

## Syntax

```js
Temporal.Now.plainDateTimeISO()
Temporal.Now.plainDateTimeISO(timeZone)
```

### Parameters

- `timeZone` (optional)
    Either a string or a `Temporal.ZonedDateTime` instance representing the time zone to interpret the system time in. If a `Temporal.ZonedDateTime` instance, its time zone is used. If a string, it can be a named time zone identifier, an offset time zone identifier, or a date-time string containing a time zone identifier or an offset (see time zones and offsets for more information).

### Return value

The current date and time in the specified time zone, as a `Temporal.PlainDateTime` object using the ISO 8601 calendar. Has the same precision as `Temporal.Now.instant()`.

### Exceptions

- `RangeError`
    Thrown if the time zone is invalid.

## Examples

### Using Temporal.Now.plainDateTimeISO()

```js
// The current date and time in the system's time zone
const dateTime = Temporal.Now.plainDateTimeISO();
console.log(dateTime); // e.g.: 2021-10-01T06:12:34.567890123

// The current date and time in the "America/New_York" time zone
const dateTimeInNewYork = Temporal.Now.plainDateTimeISO("America/New_York");
console.log(dateTimeInNewYork); // e.g.: 2021-09-30T23:12:34.567890123
```

## See also

- `Temporal.Now`
- `Temporal.PlainDateTime`
