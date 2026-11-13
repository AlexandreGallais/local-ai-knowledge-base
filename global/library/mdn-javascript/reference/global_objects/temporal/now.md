---
title: "Temporal.Now"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/now/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.Now

The **`Temporal.Now`** namespace object contains static methods for getting the current time in various formats.

## Description

Unlike most global objects, `Temporal.Now` is not a constructor. You cannot use it with the `new` operator or invoke the `Temporal.Now` object as a function. All properties and methods of `Temporal.Now` are static (just like the `Math` object).

Most fundamentally, the system time is returned by the operating system as a time since the Unix epoch. `Temporal.Now.instant()` returns this time as a `Temporal.Instant` object. Although this object can represent nanoseconds, the resolution of the current time depends on the system clock and browser settings.

An instant can be interpreted in a time zone (which is the system time zone `Temporal.Now.timeZoneId()` by default) in the same fashion as `Temporal.Instant.prototype.toZonedDateTimeISO()`. To get a `Temporal.ZonedDateTime` object, you can use `Temporal.Now.zonedDateTimeISO()`. You can also get different parts of the date and time, using `Temporal.Now.plainDateISO()`, `Temporal.Now.plainTimeISO()`, and `Temporal.Now.plainDateTimeISO()`.

For example, if the computer is set to the time zone "America/New_York", `Temporal.Now.zonedDateTimeISO()` returns a zoned date-time like: `2021-08-01T10:40:12.345-04:00[America/New_York]`. In this case, `Temporal.Now.plainTimeISO()` would return the time part of this zoned date-time: `10:40:12.345`. However, if you call `Temporal.Now.plainTimeISO("UTC")`, it returns the time part of the zoned date-time in the UTC time zone: `14:40:12.345`. This is especially useful for cross-system communication where the other end may be expecting the time in a different time zone.

### Reduced time precision

To offer protection against timing attacks and fingerprinting, the precision of the current time returned by the `Temporal.Now` methods may be reduced depending on browser settings.

In Chrome, the rounding interval is 0.1 ms, or 0.005 ms in cross-origin-isolated contexts.

In Firefox, these methods obtain the current time in the same way as `Date.now()`. They inherit the precision of that clock reading without introducing additional inaccuracy. The timestamp is always an integer number of milliseconds, so its resolution is limited to 1 ms in all contexts. Accessing `epochNanoseconds` does not increase its precision.

## Static properties

- `Temporal.Now[Symbol.toStringTag]`
    The initial value of the `[Symbol.toStringTag]` property is the string `"Temporal.Now"`. This property is used in `Object.prototype.toString()`.

## Static methods

- `Temporal.Now.instant()`
    Returns the current time as a `Temporal.Instant` object.
- `Temporal.Now.plainDateISO()`
    Returns the current date as a `Temporal.PlainDate` object, in the ISO 8601 calendar and the specified time zone.
- `Temporal.Now.plainDateTimeISO()`
    Returns the current date and time as a `Temporal.PlainDateTime` object, in the ISO 8601 calendar and the specified time zone.
- `Temporal.Now.plainTimeISO()`
    Returns the current time as a `Temporal.PlainTime` object, in the specified time zone.
- `Temporal.Now.timeZoneId()`
    Returns a time zone identifier representing the system's current time zone.
- `Temporal.Now.zonedDateTimeISO()`
    Returns the current date and time as a `Temporal.ZonedDateTime` object, in the ISO 8601 calendar and the specified time zone.

## See also

- `Temporal`
- `Temporal.Instant`
- `Temporal.PlainDate`
- `Temporal.PlainDateTime`
- `Temporal.PlainTime`
- `Temporal.ZonedDateTime`
