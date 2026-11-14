---
title: "Temporal.Now.plainDateISO()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/now/plaindateiso/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.Now.plainDateISO()

The **`Temporal.Now.plainDateISO()`** static method returns the current date as a `Temporal.PlainDate` object, in the ISO 8601 calendar and the specified time zone.

## Syntax

```js
Temporal.Now.plainDateISO()
Temporal.Now.plainDateISO(timeZone)
```

### Parameters

- `timeZone` (optional)
    Either a string or a `Temporal.ZonedDateTime` instance representing the time zone to interpret the system time in. If a `Temporal.ZonedDateTime` instance, its time zone is used. If a string, it can be a named time zone identifier, an offset time zone identifier, or a date-time string containing a time zone identifier or an offset (see time zones and offsets for more information).

### Return value

The current date in the specified time zone, as a `Temporal.PlainDate` object using the ISO 8601 calendar.

### Exceptions

- `RangeError`
    Thrown if the time zone is invalid.

## Examples

### Using Temporal.Now.plainDateISO()

```js
// The current date in the system's time zone
const date = Temporal.Now.plainDateISO();
console.log(date); // e.g.: 2021-10-01

// The current date in the "America/New_York" time zone
const dateInNewYork = Temporal.Now.plainDateISO("America/New_York");
console.log(dateInNewYork); // e.g.: 2021-09-30
```

## See also

- `Temporal.Now`
- `Temporal.PlainDate`
