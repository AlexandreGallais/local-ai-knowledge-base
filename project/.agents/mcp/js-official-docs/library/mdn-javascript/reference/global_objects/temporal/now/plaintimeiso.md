---
title: "Temporal.Now.plainTimeISO()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/now/plaintimeiso/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.Now.plainTimeISO()

The **`Temporal.Now.plainTimeISO()`** static method returns the current time as a `Temporal.PlainTime` object, in the specified time zone.

Note that although the method contains "ISO" in its name, `Temporal.PlainTime` objects do not have associated calendars, as the time format is not calendar-dependent.

## Syntax

```js
Temporal.Now.plainTimeISO()
Temporal.Now.plainTimeISO(timeZone)
```

### Parameters

- `timeZone` (optional)
    Either a string or a `Temporal.ZonedDateTime` instance representing the time zone to interpret the system time in. If a `Temporal.ZonedDateTime` instance, its time zone is used. If a string, it can be a named time zone identifier, an offset time zone identifier, or a date-time string containing a time zone identifier or an offset (see time zones and offsets for more information).

### Return value

The current time in the specified time zone, as a `Temporal.PlainTime` object. Has the same precision as `Temporal.Now.instant()`.

### Exceptions

- `RangeError`
    Thrown if the time zone is invalid.

## Examples

### Using Temporal.Now.plainTimeISO()

```js
// The current time in the system's time zone
const time = Temporal.Now.plainTimeISO();
console.log(time); // e.g.: 06:12:34.567890123

// The current time in the "America/New_York" time zone
const timeInNewYork = Temporal.Now.plainTimeISO("America/New_York");
console.log(timeInNewYork); // e.g.: 23:12:34.567890123
```

## See also

- `Temporal.Now`
- `Temporal.PlainTime`
