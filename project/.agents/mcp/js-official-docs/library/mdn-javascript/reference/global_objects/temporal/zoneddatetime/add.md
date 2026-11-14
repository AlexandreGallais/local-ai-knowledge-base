---
title: "Temporal.ZonedDateTime.prototype.add()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/zoneddatetime/add/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.ZonedDateTime.prototype.add()

The **`add()`** method of `Temporal.ZonedDateTime` instances returns a new `Temporal.ZonedDateTime` object representing this date-time moved forward by a given duration (in a form convertible by `Temporal.Duration.from()`).

## Syntax

```js
add(duration)
add(duration, options)
```

### Parameters

- `duration`
    A string, an object, or a `Temporal.Duration` instance representing a duration to add to this date-time. It is converted to a `Temporal.Duration` object using the same algorithm as `Temporal.Duration.from()`.
- `options` (optional)
    An object containing the following property:
    - `overflow` (optional)
        A string specifying the behavior when a date component is out of range. Possible values are:
        - `"constrain"` (default)
            The date component is clamped to the valid range.
        - `"reject"`
            A `RangeError` is thrown if the date component is out of range.

### Return value

A new `Temporal.ZonedDateTime` object representing the date-time specified by the original `ZonedDateTime`, plus the duration.

### Exceptions

- `RangeError`
    Thrown if the result is not in the representable range, which is ±108 days, or about ±273,972.6 years, from the Unix epoch.

## Description

For how calendar durations are added, see `Temporal.PlainDate.prototype.add()`.

Addition and subtraction are performed according to rules defined in RFC 5545 (iCalendar):

- Add/subtract the date portion of a duration using calendar arithmetic; in other words, add the date portion to its `PlainDateTime` using `Temporal.PlainDateTime.prototype.add()`, and then interpret the result in the same time zone. The result will automatically adjust for daylight saving time using the rules of this instance's `timeZone` field. For example, `2024-11-03T01:00:00-04:00[America/New_York]` plus one day is `2024-11-04T01:00:00-05:00[America/New_York]`, as if the day has 25 hours.
  - If the date-time is ambiguous or invalid due to a time zone offset transition, it is resolved using the `disambiguation: "compatible"` behavior: the later of the two possible instants will be used for time-skipped transitions and the earlier of the two possible instants will be used for time-repeated transitions. For example, `2024-03-09T02:05:00-05:00[America/New_York]` plus one day is supposedly `2024-03-10T02:05:00-05:00[America/New_York]`, but this time doesn't exist, so the wall-clock time one hour after, `2024-03-10T03:05:00-04:00[America/New_York]`, is returned. Similarly, both `2024-11-02T01:00:00-04:00[America/New_York]` plus one day and `2024-11-04T01:00:00-05:00[America/New_York]` minus one day produce `2024-11-03T01:00:00-04:00[America/New_York]`, the earlier of the two possible instants.
  - If the resulting date-time's components are out of bounds, they are resolved using the `overflow` option. For example, `2024-08-31` plus one month is `2024-09-31` which doesn't exist, so it is clamped to `2024-09-30` by default.
- Add/subtract the time portion of a duration using real-world time; in other words, add the time portion to its `Instant` using `Temporal.Instant.prototype.add()`, and then interpret the result in the same time zone. For example, `2024-11-03T01:00:00-04:00[America/New_York]` plus one hour is `2024-11-03T01:00:00-05:00[America/New_York]`.

These rules make arithmetic with `Temporal.ZonedDateTime` "DST-safe", which means that the results most closely match the expectations of both real-world users and implementers of other standards-compliant calendar applications. These expectations include:

- Adding or subtracting days should keep clock time consistent across DST transitions. For example, if you have an appointment on Saturday at 1:00PM and you ask to reschedule it 1 day later, you would expect the reschedule appointment to still be at 1:00PM, even if there was a DST transition overnight.
- Adding or subtracting the time portion of a duration should ignore DST transitions. For example, a friend you've asked to meet in 2 hours will be annoyed if you show up 1 hour or 3 hours later. There should be a consistent and relatively-unsurprising order of operations.
- If results are at or near a DST transition, ambiguities should be handled automatically (no crashing) and deterministically.

Adding a duration is equivalent to subtracting its negation.

## Examples

### Adding a duration

```js
const start = Temporal.ZonedDateTime.from(
  "2021-11-01T12:34:56-04:00[America/New_York]",
);
const end = start.add({
  years: 1,
  months: 2,
  weeks: 3,
  days: 4,
  hours: 5,
  minutes: 6,
  seconds: 7,
  milliseconds: 8,
});
console.log(end.toString()); // 2023-01-26T17:41:03.008-05:00[America/New_York]
```

For more examples, especially with how different calendars and the `overflow` option interact with calendar durations, see `Temporal.PlainDate.prototype.add()`.

## See also

- `Temporal.ZonedDateTime`
- `Temporal.Duration`
- `Temporal.ZonedDateTime.prototype.subtract()`
