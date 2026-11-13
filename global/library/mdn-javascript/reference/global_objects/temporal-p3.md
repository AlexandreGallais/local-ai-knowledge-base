---
title: "Temporal (part 3 of 3)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal (part 3 of 3)

### Calendars

A calendar is a way to organize days, typically into periods of weeks, months, years, and eras. Most of the world uses the Gregorian calendar, but there are many other calendars in use, especially in religious and cultural contexts. By default, all calendar-aware `Temporal` objects use the ISO 8601 calendar system, which is based on the Gregorian calendar and defines additional week-numbering rules. `Intl.supportedValuesOf()` lists most of the calendars likely to be supported by browsers. Here we provide a brief overview of how calendar systems are formed to help you internalize what factors may vary between calendars.

There are three prominent periodic events on Earth: its rotation around the sun (365.242 days for one revolution), the moon's rotation around the Earth (29.53 days from new moon to new moon), and its rotation around its axis (24 hours from sunrise to sunrise). Every culture has the same measure of a "day", which is 24 hours. Occasional changes such as daylight saving time are not part of the calendar, but are part of the time zone's information.

- Some calendars primarily define one year as 365.242 days on average, by defining years to have 365 days, and adding an extra day, the _leap day_, about every 4 years. Then, the year may be further divided into parts called months. These calendars are called _solar calendars_. The Gregorian calendar and the Solar Hijri calendar are solar calendars.
- Some calendars primarily define one month as 29.5 days on average, by defining months to alternate between 29 and 30 days. Then, 12 months may be grouped into a year of 354 days. These calendars are called _lunar calendars_. The Islamic calendar is a lunar calendar. Because a lunar year is artificial and does not correlate with the season cycle, lunar calendars are generally rarer.
- Some calendars also primarily define months based on lunar cycles, like lunar calendars. Then, to compensate for the 11-day discrepancy with the solar year, an extra month, the _leap month_, is added about every 3 years. These calendars are called _lunisolar calendars_. The Hebrew calendar and the Chinese calendar are lunisolar calendars.

In `Temporal`, every date under one calendar system is uniquely identified by three components: `year`, `month`, and `day`. While `year` is typically a positive integer, it may also be zero or negative, and increases monotonically with time. The year `1` (or `0`, if it exists) is known as the calendar epoch, and is arbitrary for each calendar. `month` is a positive integer that increments by 1 every time, starting at `1` and ending at `date.monthsInYear`, then resetting back to `1` as the year advances. `day` is also a positive integer, but it may not start at 1 or increment by 1 every time, because political changes may cause days to be skipped or repeated. But in general, `day` monotonically increases and resets as the month advances.

In addition to `year`, a year can also be uniquely identified by the combination of `era` and `eraYear`, for calendars that use eras. For example, the Gregorian calendar uses the era "CE" (Common Era) and "BCE" (Before Common Era), and the year `-1` is the same as `{ era: "bce", eraYear: 2 }` (note that year `0` always exists for all calendars; for the Gregorian calendar, it corresponds to 1 BCE due to astronomical year numbering). `era` is a lowercase string, and `eraYear` is an arbitrary integer that may be zero or negative, or even decrease with time (usually for the oldest era).

> **Note:**
> Always use `era` and `eraYear` as a pair; don't use one property without also using the other. In addition, to avoid conflicts, don't combine `year` and `era`/`eraYear` when designating a year. Pick one year representation and use it consistently.
>
> Be careful of the following incorrect assumptions about years:
>
> - Don't assume that `era` and `eraYear` are always present; they may be `undefined`.
> - Don't assume that `era` is a user-friendly string; use `toLocaleString()` to format your date instead.
> - Don't assume that two `year` values from different calendars are comparable; use the `compare()` static method instead.
> - Don't assume that years have 365/366 days and 12 months; use `daysInYear` and `monthsInYear` instead.
> - Don't assume that leap years (`inLeapYear` is `true`) have one extra day; they may have an extra month.

In addition to `month`, a month in a year can also be uniquely identified by the `monthCode`. `monthCode` usually maps to the month's name, but `month` does not. For example, in the case of lunisolar calendars, two months with the same `monthCode`, where one belongs to a leap year and the other one does not, will have different `month` values if they come after the leap month, due to the insertion of an extra month.

> **Note:**
> To avoid conflicts, don't combine `month` and `monthCode` when designating a month. Pick one month representation and use it consistently. `month` is more useful if you need the order of months in a year (e.g., when looping through the months), while `monthCode` is more useful if you need the name of the month (e.g., when storing birthdays).
>
> Be careful of the following incorrect assumptions about months:
>
> - Don't assume that `monthCode` and `month` always correspond.
> - Don't assume the number of days in a month; use `daysInMonth` instead.
> - Don't assume that `monthCode` is a user-friendly string; use `toLocaleString()` to format your date instead.
> - Generally, don't cache the name of months in an array or object. Even though `monthCode` usually maps to the month's name within one calendar, we recommend always computing the month's name using, for example, `date.toLocaleString("en-US", { calendar: date.calendarId, month: "long" })`.

In addition to `day` (which is a month-based index), a day in a year can also be uniquely identified by the `dayOfYear`. `dayOfYear` is a positive integer that increments by 1 every time, starting at `1` and ending at `date.daysInYear`.

The concept of a "week" is not connected with any astronomical event, but is a cultural construct. While the most common length is `7` days, weeks can also have 4, 5, 6, 8, or more days — or even lack a fixed number of days altogether. To get the specific number of days of the week of a date, use the date's `daysInWeek`. `Temporal` identifies weeks by the combination of `weekOfYear` and `yearOfWeek`. `weekOfYear` is a positive integer that increments by 1 every time, starting at `1`, then resetting back to `1` as the year advances. `yearOfWeek` is generally the same as `year`, but may be different at the start or end of each year, because one week may cross two years, and `yearOfWeek` picks one of the two years based on the calendar's rules.

> **Note:**
> Always use `weekOfYear` and `yearOfWeek` as a pair; don't use `weekOfYear` and `year`.
>
> Be careful of the following incorrect assumptions about weeks:
>
> - Don't assume that `weekOfYear` and `yearOfWeek` are always present; they may be `undefined`.
> - Don't assume that weeks are always 7 days long; use `daysInWeek` instead.
> - Note that the current `Temporal` API does not support year-week dates, so you can't construct dates using these properties or serialize dates to year-week representations. They are only informational properties.

### RFC 9557 format

All `Temporal` classes can be serialized and deserialized using the format specified in RFC 9557, which is based on ISO 8601 / RFC 3339. The format, in its full form, is as follows (spaces are only for readability and should not be present in the actual string):

```plain
YYYY-MM-DD T HH:mm:ss.sssssssss Z/±HH:mm [time_zone_id] [u-ca=calendar_id]
```

Different classes have different requirements for the presence of each component, so you will find a section titled "RFC 9557 format" in each class's documentation, which specifies the format recognized by that class.

This is very similar to the date time string format used by `Date`, which is also based on ISO 8601. The main addition is the ability to specify micro- and nanosecond components, and the ability to specify the time zone and calendar system.

### Representable dates

All `Temporal` objects that represent a specific calendar date impose a similar limit on the range of representable dates, which is ±108 days (inclusive) from the Unix epoch, or the range of instants from `-271821-04-20T00:00:00` to `+275760-09-13T00:00:00`. This is the same range as valid dates. More specifically:

- `Temporal.Instant` and `Temporal.ZonedDateTime` apply this limit directly on its `epochNanoseconds` value.
- `Temporal.PlainDateTime` interprets the date-time in the UTC time zone and requires it to be ±(108 + 1) days (exclusive) from the Unix epoch, so its valid range is `-271821-04-19T00:00:00` to `+275760-09-14T00:00:00`, exclusive. This allows any `ZonedDateTime` to be converted to a `PlainDateTime` regardless of its offset.
- `Temporal.PlainDate` applies the same check as `PlainDateTime` to the noon (`12:00:00`) of that date, so its valid range is `-271821-04-19` to `+275760-09-13`. This allows any `PlainDateTime` to be converted to a `PlainDate` regardless of its time, and vice versa.
- `Temporal.PlainYearMonth` has the valid range of `-271821-04` to `+275760-09`. This allows any `PlainDate` to be converted to a `PlainYearMonth` regardless of its date (except if a non-ISO month's first day falls in the ISO month `-271821-03`).

The `Temporal` objects will refuse to construct an instance representing a date/time beyond this limit. This includes:

- Using the constructor or `from()` static method.
- Using the `with()` method to update calendar fields.
- Using `add()`, `subtract()`, `round()`, or any other method to derive new instances.

## Static properties

- `Temporal.Duration`
    Represents a difference between two time points, which can be used in date/time arithmetic. It is fundamentally represented as a combination of years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, and nanoseconds values.
- `Temporal.Instant`
    Represents a unique point in time, with nanosecond precision. It is fundamentally represented as the number of nanoseconds since the Unix epoch (midnight at the beginning of January 1, 1970, UTC), without any time zone or calendar system.
- `Temporal.Now`
    Provides methods for getting the current time in various formats.
- `Temporal.PlainDate`
    Represents a calendar date (a date without a time or time zone); for example, an event on a calendar which happens during the whole day no matter which time zone it's happening in. It is fundamentally represented as an ISO 8601 calendar date, with year, month, and day fields, and an associated calendar system.
- `Temporal.PlainDateTime`
    Represents a date (calendar date) and time (wall-clock time) without a time zone. It is fundamentally represented as a combination of a date (with an associated calendar system) and a time.
- `Temporal.PlainMonthDay`
    Represents the month and day of a calendar date, without a year or time zone; for example, an event on a calendar that recurs every year and happens during the whole day. It is fundamentally represented as an ISO 8601 calendar date, with year, month, and day fields, and an associated calendar system. The year is used to disambiguate the month-day in non-ISO calendar systems.
- `Temporal.PlainTime`
    Represents a time without a date or time zone; for example, a recurring event that happens at the same time every day. It is fundamentally represented as a combination of hour, minute, second, millisecond, microsecond, and nanosecond values.
- `Temporal.PlainYearMonth`
    Represents the year and month of a calendar date, without a day or time zone; for example, an event on a calendar that happens during the whole month. It is fundamentally represented as an ISO 8601 calendar date, with year, month, and day fields, and an associated calendar system. The day is used to disambiguate the year-month in non-ISO calendar systems.
- `Temporal.ZonedDateTime`
    Represents a date and time with a time zone. It is fundamentally represented as a combination of an instant, a time zone, and a calendar system.
- `Temporal[Symbol.toStringTag]`
    The initial value of the `[Symbol.toStringTag]` property is the string `"Temporal"`. This property is used in `Object.prototype.toString()`.

## See also

- `Intl.DateTimeFormat`
- `Intl.RelativeTimeFormat`
- `Intl.DurationFormat`
- Temporal polyfill by proposal champions
- Temporal polyfill by FullCalendar
