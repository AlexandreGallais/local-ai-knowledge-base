---
title: "Temporal.ZonedDateTime (part 3 of 4)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/zoneddatetime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.ZonedDateTime (part 3 of 4)

### Ambiguity and gaps from local time to UTC time

Given a time zone, conversion from UTC to local time is straightforward: you first get the offset using the time zone name and the instant, then add the offset to the instant. The reverse is not true: conversion from local time to UTC time, without an explicit offset, is ambiguous, because one local time can correspond to zero, one, or many UTC times. Consider the most common cause: daylight saving time transitions. Take New York as an example. Its standard offset is UTC-5, but during DST, all clocks are set forward by an hour, so the offset becomes UTC-4. In the US, transitions happen at 2:00 AM local time, so consider these two transition days:

| UTC time             | New York time             |
| -------------------- | ------------------------- |
| 2024-03-10T06:58:00Z | 2024-03-10T01:58:00-05:00 |
| 2024-03-10T06:59:00Z | 2024-03-10T01:59:00-05:00 |
| 2024-03-10T07:00:00Z | 2024-03-10T03:00:00-04:00 |
| ---                  | ---                       |
| 2024-11-03T05:58:00Z | 2024-11-03T01:58:00-04:00 |
| 2024-11-03T05:59:00Z | 2024-11-03T01:59:00-04:00 |
| 2024-11-03T06:00:00Z | 2024-11-03T01:00:00-05:00 |

As you can see, in March, one hour disappeared from the local time, and in November, we have two hours that have the same wall-clock time. Suppose that we stored a `PlainDateTime` that says "2024-03-10T02:05:00", and we want to interpret it in the `America/New_York` time zone, there will be no time that corresponds to it, while a `PlainDateTime` that says "2024-11-03T01:05:00" can correspond to two different instants.

When constructing a `ZonedDateTime` from a local time (using `Temporal.ZonedDateTime.from()`, `Temporal.ZonedDateTime.prototype.with()`, `Temporal.PlainDateTime.prototype.toZonedDateTime()`), the behavior for ambiguity and gaps is configurable via the `disambiguation` option:

- `earlier`
    If there are two possible instants, choose the earlier one. If there is a gap, go back by the gap duration.
- `later`
    If there are two possible instants, choose the later one. If there is a gap, go forward by the gap duration.
- `compatible` (default)
    Same behavior as `Date`: use `later` for gaps and `earlier` for ambiguities.
- `reject`
    Throw a `RangeError` whenever there is an ambiguity or a gap.

There are several cases where there's no ambiguity when constructing a `ZonedDateTime`:

- If the time is specified in UTC via the `Z` offset.
- If the offset is explicitly provided and used (see below).

### Offset ambiguity

We already demonstrated how ambiguity may arise from interpreting a local time in a time zone, without providing an explicit offset. However, if you provide an explicit offset, then another conflict arises: between the offset as specified, and the offset as calculated from the time zone and the local time. This is an unavoidable real-world issue: if you store a time in the future, with an anticipated offset, then before that time comes, the time zone definition may have changed due to political reasons. For example, suppose in 2018, we set a reminder at the time `2019-12-23T12:00:00-02:00[America/Sao_Paulo]` (which is a daylight saving time; Brazil is in the southern hemisphere, so it enters DST in October and exits in February). But before that time comes, in early 2019, Brazil decides to stop observing DST, so the real offset becomes `-03:00`. Should the reminder now still fire at noon (keeping the local time), or should it fire at 11:00 AM (keeping the exact time)?

For offset ambiguity to exist, a timestamp string must be parsed using different IANA Time Zone Database rules than the rules used when the timestamp was originally generated. This will never happen when timestamps are generated during the same execution of a JavaScript program, because the ECMAScript specification requires that IANA Time Zone Database rules must be consistent for the lifetime of a JavaScript program.

However, offset ambiguity may exist when a JavaScript program is parsing timestamps that were stored earlier, as in the `America/Sao_Paulo` example above, and the IANA Time Zone Database has been updated since the timestamp was originally generated. It can also happen when communicating timestamps between computers (or, rarely, between different software on the same computer!) that use different versions of the IANA Time Zone Database. The IANA Time Zone Database also has build options (for example, using or not using deprecated rules in `backzone`) that can cause offset ambiguity when communicating timestamps between computers using different software, even when the IANA Time Zone Database version is the same.

Offset ambiguity is rarely encountered and will almost always apply only to timestamps before 1970 or for timestamps that are months or years in the future. But when this problem happens, a `RangeError` will be thrown by default. When constructing a `ZonedDateTime` with `Temporal.ZonedDateTime.from()` or when updating it using the `with()` method, you can prevent this exception by using the `offset` option to decide whether the offset or the time zone identifier "wins":

- `use`
    Use the offset to calculate the exact time. This option "uses" the offset to decide the instant intended by the timestamp string, even if the offset at that instant has changed. The time zone identifier is still used to then infer the (possibly updated) offset and use that offset to convert the exact time to local time. In the `2019-12-23T12:00:00-02:00[America/Sao_Paulo]` example above, this option would cause the reminder to fire at 11:00 AM local time.
- `ignore`
    Use the time zone identifier to re-calculate the offset, ignoring the offset that's specified in the string. This option keeps the same local time as originally calculated when we stored the time, but may result in a different instant. Note that by ignoring the offset, the same local time interpretation ambiguity may arise, which is resolved using the `disambiguation` option. In the `2019-12-23T12:00:00-02:00[America/Sao_Paulo]` example above, this option would cause the reminder to fire at 12:00 PM local time.
- `reject`
    Throw a `RangeError` whenever there is a conflict between the offset and the time zone identifier. This is the default for `Temporal.ZonedDateTime.from()`.
- `prefer`
    Use the offset if it's valid, otherwise calculate the offset from the time zone identifier. This is the default for `Temporal.ZonedDateTime.prototype.with()` (see that method for more details). This is different from `ignore` because in the case of local time ambiguity, the offset is used to resolve it rather than the `disambiguation` option.

If you know in advance how you want to handle offset ambiguity, consider using the `offset` option to avoid exceptions that are thrown by default. For example, a calendar application likely wants the time zone identifier to "win" so that recurring meetings are shown in the most up-to-date local time for that time zone, so `offset: "ignore"` is appropriate. On the other hand, a task scheduler application that executes a task exactly 3 hours from now should probably pick `offset: "use"` because changes to time zone rules shouldn't change the meaning of "3 hours from now".

In some cases, you may not know which `offset` option is the correct one without getting input from the user. In these cases, you may want to catch the `RangeError` and then ask your user which local time is the correct one, and then retry parsing using a different `offset` option corresponding to the user's choice.

Note that the `Z` offset is not equivalent to `+00:00`. The `Z` offset means "the time in UTC is known, but the offset to local time is unknown", as per RFC 9557. When the time string uses the `Z` offset, the `offset` option is ignored, and the offset is derived from the time zone ID. On the other hand, the `+00:00` offset is interpreted as a local time offset that happens to match UTC and is validated against the time zone ID.

> **Note:**
> Although `Temporal.Instant.from()` also takes an RFC 9557 string in the same form, there is no ambiguity because it always ignores the time zone identifier and reads the offset only.

## Constructor

- `Temporal.ZonedDateTime()`
    Creates a new `Temporal.ZonedDateTime` object by directly supplying the underlying data.

## Static methods

- `Temporal.ZonedDateTime.compare()`
    Returns a number (-1, 0, or 1) indicating whether the first date-time comes before, is the same as, or comes after the second date-time. Equivalent to comparing the `epochNanoseconds` of the two date-times.
- `Temporal.ZonedDateTime.from()`
    Creates a new `Temporal.ZonedDateTime` object from another `Temporal.ZonedDateTime` object, an object with date, time, and time zone properties, or an RFC 9557 string.
