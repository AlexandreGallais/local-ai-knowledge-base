---
title: "Temporal.ZonedDateTime.from()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/zoneddatetime/from/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.ZonedDateTime.from()

The **`Temporal.ZonedDateTime.from()`** static method creates a new `Temporal.ZonedDateTime` object from another `Temporal.ZonedDateTime` object, an object with date, time, and time zone properties, or an RFC 9557 string.

## Syntax

```js
Temporal.ZonedDateTime.from(info)
Temporal.ZonedDateTime.from(info, options)
```

### Parameters

- `info`
    One of the following:
    - A `Temporal.ZonedDateTime` instance, which creates a copy of the instance.
    - An RFC 9557 format string containing a date, optionally a time, optionally an offset, a time zone annotation, and optionally a calendar.
    - An object containing properties that are accepted by either `Temporal.PlainDate.from()` (`calendar`, `era`, `eraYear`, `year`, `month`, `monthCode`, `day`) or `Temporal.PlainTime.from()` (`hour`, `minute`, `second`, `millisecond`, `microsecond`, `nanosecond`). The info should explicitly specify a year (as `year` or as `era` and `eraYear`), a month (as `month` or `monthCode`), and a day; others are optional and will be set to their default values. The following properties should be provided too:
      - `timeZone`
          Either a string or a `Temporal.ZonedDateTime` instance representing the time zone to use. If a `Temporal.ZonedDateTime` instance, its time zone is used. If a string, it can be a named time zone identifier, an offset time zone identifier, or a date-time string containing a time zone identifier or an offset (see time zones and offsets for more information). The time properties are interpreted in this time zone.
      - `offset` (optional)
          An offset string, in the same format as the RFC 9557 offset but with optional seconds and subsecond components (`±HH:mm:ss.sssssssss`), representing the offset from UTC. If omitted, it will be calculated from the time zone and the date-time. `"Z"` is not allowed.
- `options` (optional)
    An object containing some or all of the following properties (in the order they are retrieved and validated):
    - `disambiguation` (optional)
        What to do if the local date-time is ambiguous in the given time zone (there are more than one instants with such local time, or the local time does not exist). Possible values are `"compatible"`, `"earlier"`, `"later"`, and `"reject"`. Defaults to `"compatible"`. For more information about these values, see ambiguity and gaps from local time to UTC time.
    - `offset` (optional)
        What to do if the offset is explicitly provided in `info` but the offset is invalid for the given time zone in the given local time. Possible values are `"use"`, `"ignore"`, `"reject"`, and `"prefer"`. Defaults to `"reject"`. For more information about these values, see offset ambiguity.
    - `overflow` (optional)
        A string specifying the behavior when a date component is out of range (when using the object `info`). Possible values are:
        - `"constrain"` (default)
            The date component is clamped to the valid range.
        - `"reject"`
            A `RangeError` is thrown if the date component is out of range.

### Return value

A new `Temporal.ZonedDateTime` object, representing the date and time specified by `info` in the specified `calendar` and `timeZone`.

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
    - The wall-clock time is ambiguous in the time zone, and `options.disambiguation` is set to `"reject"`.
    - The info is not in the representable range, which is ±108 days, or about ±273,972.6 years, from the Unix epoch.

## Examples

### Creating a ZonedDateTime from an object

```js
// Year + month + day + hour + minute + second
const zdt = Temporal.ZonedDateTime.from({
  timeZone: "America/New_York",
  year: 2021,
  month: 7,
  day: 1,
  hour: 12,
  minute: 34,
  second: 56,
});
console.log(zdt.toString()); // "2021-07-01T12:34:56-04:00[America/New_York]"
```

### Creating a ZonedDateTime from a string

```js
const zdt = Temporal.ZonedDateTime.from(
  "2021-07-01T12:34:56-04:00[America/New_York]",
);
console.log(zdt.toLocaleString()); // "7/1/2021, 12:34:56 PM EDT" (assuming en-US locale)

// Time given as UTC, and converted to local
const zdt2 = Temporal.ZonedDateTime.from(
  "2021-07-01T12:34:56Z[America/New_York]",
);
console.log(zdt2.toString()); // "2021-07-01T08:34:56-04:00[America/New_York]"
```

### Creating a ZonedDateTime from an ISO 8601 / RFC 3339 string

Note that `Temporal.ZonedDateTime.from()` rejects ISO 8601 strings, which do not include a time zone identifier. This is to ensure that the time zone is always known and can be used to derive different offsets as the local time changes.

If you want to parse an ISO 8601 string, first construct a `Temporal.Instant` object and then convert it to a `Temporal.ZonedDateTime` object. You can provide any time zone, even if it doesn't match the offset originally given in the string, and the local time will be adjusted accordingly.

```js
const isoString = "2021-07-01T12:34:56+02:00";
const instant = Temporal.Instant.from(isoString);
const zdt = instant.toZonedDateTimeISO("America/New_York");
console.log(zdt.toString()); // "2021-07-01T06:34:56-04:00[America/New_York]"
```

### Local time disambiguation

See ambiguity and gaps from local time to UTC time for an introduction to this situation.

```js
const localTimeNotExist = "2024-03-10T02:05:00[America/New_York]";
// For non-existent times, "compatible" is equivalent to "later"
const zdt = Temporal.ZonedDateTime.from(localTimeNotExist);
console.log(zdt.toString()); // "2024-03-10T03:05:00-04:00[America/New_York]"

const zdt2 = Temporal.ZonedDateTime.from(localTimeNotExist, {
  disambiguation: "earlier",
});
console.log(zdt2.toString()); // "2024-03-10T01:05:00-05:00[America/New_York]"

const localTimeAmbiguous = "2024-11-03T01:05:00[America/New_York]";
// For ambiguous times, "compatible" is equivalent to "earlier"
const zdt3 = Temporal.ZonedDateTime.from(localTimeAmbiguous);
console.log(zdt3.toString()); // "2024-11-03T01:05:00-04:00[America/New_York]"

const zdt4 = Temporal.ZonedDateTime.from(localTimeAmbiguous, {
  disambiguation: "later",
});
console.log(zdt4.toString()); // "2024-11-03T01:05:00-05:00[America/New_York]"
```

### Resolving offset ambiguity

See offset ambiguity for an introduction to this situation.

```js
const offsetAmbiguous = "2019-12-23T12:00:00-02:00[America/Sao_Paulo]";

Temporal.ZonedDateTime.from(offsetAmbiguous);
// RangeError: date-time can't be represented in the given time zone
Temporal.ZonedDateTime.from(offsetAmbiguous, { offset: "use" }).toString();
// "2019-12-23T11:00:00-03:00[America/Sao_Paulo]"
Temporal.ZonedDateTime.from(offsetAmbiguous, { offset: "ignore" }).toString();
// "2019-12-23T12:00:00-03:00[America/Sao_Paulo]"
```

For more examples, especially regarding different calendars and overflow settings, see `Temporal.PlainDate.from()` and `Temporal.PlainTime.from()`.

## See also

- `Temporal.ZonedDateTime`
- `Temporal.ZonedDateTime()`
- `Temporal.ZonedDateTime.prototype.with()`
