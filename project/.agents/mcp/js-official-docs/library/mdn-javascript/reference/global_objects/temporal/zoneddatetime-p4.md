---
title: "Temporal.ZonedDateTime (part 4 of 4)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/zoneddatetime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.ZonedDateTime (part 4 of 4)

## Instance properties

These properties are defined on `Temporal.ZonedDateTime.prototype` and shared by all `Temporal.ZonedDateTime` instances.

- `Temporal.ZonedDateTime.prototype.calendarId`
    Returns a string representing the calendar used to interpret the internal ISO 8601 date.
- `Temporal.ZonedDateTime.prototype.constructor`
    The constructor function that created the instance object. For `Temporal.ZonedDateTime` instances, the initial value is the `Temporal.ZonedDateTime()` constructor.
- `Temporal.ZonedDateTime.prototype.day`
    Returns a positive integer representing the 1-based day index in the month of this date, which is the same day number you would see on a calendar. Calendar-dependent. Generally starts at 1 and is continuous, but not always.
- `Temporal.ZonedDateTime.prototype.dayOfWeek`
    Returns a positive integer representing the 1-based day index in the week of this date. Days in a week are numbered sequentially from `1` to `daysInWeek`, with each number mapping to its name. Calendar-dependent. 1 usually represents Monday in the calendar, even when locales using the calendar may consider a different day as the first day of the week (see `Intl.Locale.prototype.getWeekInfo()`).
- `Temporal.ZonedDateTime.prototype.dayOfYear`
    Returns a positive integer representing the 1-based day index in the year of this date. The first day of this year is `1`, and the last day is the `daysInYear`. Calendar-dependent.
- `Temporal.ZonedDateTime.prototype.daysInMonth`
    Returns a positive integer representing the number of days in the month of this date. Calendar-dependent.
- `Temporal.ZonedDateTime.prototype.daysInWeek`
    Returns a positive integer representing the number of days in the week of this date. Calendar-dependent. For the ISO 8601 calendar, this is always 7, but in other calendar systems it may differ from week to week.
- `Temporal.ZonedDateTime.prototype.daysInYear`
    Returns a positive integer representing the number of days in the year of this date. Calendar-dependent. For the ISO 8601 calendar, this is 365, or 366 in a leap year.
- `Temporal.ZonedDateTime.prototype.epochMilliseconds`
    Returns an integer representing the number of milliseconds elapsed since the Unix epoch (midnight at the beginning of January 1, 1970, UTC) to this instant. Equivalent to dividing `epochNanoseconds` by `1e6` and flooring the result.
- `Temporal.ZonedDateTime.prototype.epochNanoseconds`
    Returns a `BigInt` representing the number of nanoseconds elapsed since the Unix epoch (midnight at the beginning of January 1, 1970, UTC) to this instant.
- `Temporal.ZonedDateTime.prototype.era`
    Returns a calendar-specific lowercase string representing the era of this date, or `undefined` if the calendar does not use eras (e.g., ISO 8601). `era` and `eraYear` together uniquely identify a year in a calendar, in the same way that `year` does. Calendar-dependent. For Gregorian, it is either `"ce"` or `"bce"`.
- `Temporal.ZonedDateTime.prototype.eraYear`
    Returns a non-negative integer representing the year of this date within the era, or `undefined` if the calendar does not use eras (e.g., ISO 8601). The year index usually starts from 1 (more common) or 0, and years in an era can decrease with time (e.g., Gregorian BCE). `era` and `eraYear` together uniquely identify a year in a calendar, in the same way that `year` does. Calendar-dependent.
- `Temporal.ZonedDateTime.prototype.hour`
    Returns an integer from 0 to 23 representing the hour component of this time.
- `Temporal.ZonedDateTime.prototype.hoursInDay`
    Returns a positive integer representing the number of hours in the day of this date in the time zone. It may be more or less than 24 in the case of offset changes such as daylight saving time.
- `Temporal.ZonedDateTime.prototype.inLeapYear`
    Returns a boolean indicating whether this date is in a leap year. A leap year is a year that has more days (due to a leap day or leap month) than a common year. Calendar-dependent.
- `Temporal.ZonedDateTime.prototype.microsecond`
    Returns an integer from 0 to 999 representing the microsecond (10-6 second) component of this time.
- `Temporal.ZonedDateTime.prototype.millisecond`
    Returns an integer from 0 to 999 representing the millisecond (10-3 second) component of this time.
- `Temporal.ZonedDateTime.prototype.minute`
    Returns an integer from 0 to 59 representing the minute component of this time.
- `Temporal.ZonedDateTime.prototype.month`
    Returns a positive integer representing the 1-based month index in the year of this date. The first month of this year is `1`, and the last month is the `monthsInYear`. Calendar-dependent. Note that unlike `Date.prototype.getMonth()`, the index is 1-based. If the calendar has leap months, then the month with the same `monthCode` may have different `month` indexes for different years.
- `Temporal.ZonedDateTime.prototype.monthCode`
    Returns a calendar-specific string representing the month of this date. Calendar-dependent. Usually it is `M` plus a two-digit month number. For leap months, it is the previous month's code followed by `L`. If the leap month is the first month of the year, the code is `M00L`.
- `Temporal.ZonedDateTime.prototype.monthsInYear`
    Returns a positive integer representing the number of months in the year of this date. Calendar-dependent. For the ISO 8601 calendar, this is always 12, but in other calendar systems it may differ.
- `Temporal.ZonedDateTime.prototype.nanosecond`
    Returns an integer from 0 to 999 representing the nanosecond (10-9 second) component of this time.
- `Temporal.ZonedDateTime.prototype.offset`
    Returns a string representing the offset used to interpret the internal instant, in the form `±HH:mm` (or `±HH:mm:ss.sssssssss` with as much subminute precision as necessary).
- `Temporal.ZonedDateTime.prototype.offsetNanoseconds`
    Returns an integer representing the offset used to interpret the internal instant, as a number of nanoseconds (positive or negative).
- `Temporal.ZonedDateTime.prototype.second`
    Returns an integer from 0 to 59 representing the second component of this time.
- `Temporal.ZonedDateTime.prototype.timeZoneId`
    Returns a string representing the time zone identifier used to interpret the internal instant. It uses the same string used when constructing the `Temporal.ZonedDateTime` object, which is either an IANA time zone name or a fixed offset.
- `Temporal.ZonedDateTime.prototype.weekOfYear`
    Returns a positive integer representing the 1-based week index in the `yearOfWeek` of this date, or `undefined` if the calendar does not have a well-defined week system. The first week of the year is `1`. Calendar-dependent. Note that for ISO 8601, the first and last few days of the year may be attributed to the last week of the previous year or the first week of the next year.
- `Temporal.ZonedDateTime.prototype.year`
    Returns an integer representing the number of years of this date relative to the start of a calendar-specific epoch year. Calendar-dependent. Usually year 1 is either the first year of the latest era or the ISO 8601 year `0001`. If the epoch is in the middle of the year, that year will have the same value before and after the start date of the era.
- `Temporal.ZonedDateTime.prototype.yearOfWeek`
    Returns an integer representing the year to be paired with the `weekOfYear` of this date, or `undefined` if the calendar does not have a well-defined week system. Calendar-dependent. Usually this is the year of the date, but for ISO 8601, the first and last few days of the year may be attributed to the last week of the previous year or the first week of the next year, causing the `yearOfWeek` to differ by 1.
- `Temporal.ZonedDateTime.prototype[Symbol.toStringTag]`
    The initial value of the `[Symbol.toStringTag]` property is the string `"Temporal.ZonedDateTime"`. This property is used in `Object.prototype.toString()`.

## Instance methods

- `Temporal.ZonedDateTime.prototype.add()`
    Returns a new `Temporal.ZonedDateTime` object representing this date-time moved forward by a given duration (in a form convertible by `Temporal.Duration.from()`).
- `Temporal.ZonedDateTime.prototype.equals()`
    Returns `true` if this date-time is equivalent in value to another date-time (in a form convertible by `Temporal.ZonedDateTime.from()`), and `false` otherwise. They are compared both by their instant values, time zones, and their calendars, so two date-times from different calendars or time zones may be considered equal by `Temporal.ZonedDateTime.compare()` but not by `equals()`.
- `Temporal.ZonedDateTime.prototype.getTimeZoneTransition()`
    Returns a `Temporal.ZonedDateTime` object representing the first instant after or before this instant at which the time zone's UTC offset changes, or `null` if there is no such transition. This is useful for finding out the offset rules of a time zone, such as its daylight saving time pattern.
- `Temporal.ZonedDateTime.prototype.round()`
    Returns a new `Temporal.ZonedDateTime` object representing this date-time rounded to the given unit.
- `Temporal.ZonedDateTime.prototype.since()`
    Returns a new `Temporal.Duration` object representing the duration from another date-time (in a form convertible by `Temporal.ZonedDateTime.from()`) to this date-time. The duration is positive if the other date-time is before this date-time, and negative if after.
- `Temporal.ZonedDateTime.prototype.startOfDay()`
    Returns a `Temporal.ZonedDateTime` object representing the first instant of this date in the time zone. It usually has a time of `00:00:00`, but may be different if the midnight doesn't exist due to offset changes, in which case the first time that exists is returned.
- `Temporal.ZonedDateTime.prototype.subtract()`
    Returns a new `Temporal.ZonedDateTime` object representing this date-time moved backward by a given duration (in a form convertible by `Temporal.Duration.from()`).
- `Temporal.ZonedDateTime.prototype.toInstant()`
    Returns a new `Temporal.Instant` object representing the instant of this date-time.
- `Temporal.ZonedDateTime.prototype.toJSON()`
    Returns a string representing this date-time in the same RFC 9557 format as calling `toString()`. Intended to be implicitly called by `JSON.stringify()`.
- `Temporal.ZonedDateTime.prototype.toLocaleString()`
    Returns a string with a language-sensitive representation of this date-time.
- `Temporal.ZonedDateTime.prototype.toPlainDate()`
    Returns a new `Temporal.PlainDate` object representing the date portion of this date-time.
- `Temporal.ZonedDateTime.prototype.toPlainDateTime()`
    Returns a new `Temporal.PlainDateTime` object representing the date and time portions of this date-time. Only the time zone information is removed.
- `Temporal.ZonedDateTime.prototype.toPlainTime()`
    Returns a new `Temporal.PlainTime` object representing the time portion of this date-time.
- `Temporal.ZonedDateTime.prototype.toString()`
    Returns a string representing this date-time in the RFC 9557 format.
- `Temporal.ZonedDateTime.prototype.until()`
    Returns a new `Temporal.Duration` object representing the duration from this date-time to another date-time (in a form convertible by `Temporal.ZonedDateTime.from()`). The duration is positive if the other date-time is after this date-time, and negative if before.
- `Temporal.ZonedDateTime.prototype.valueOf()`
    Throws a `TypeError`, which prevents `Temporal.ZonedDateTime` instances from being implicitly converted to primitives when used in arithmetic or comparison operations.
- `Temporal.ZonedDateTime.prototype.with()`
    Returns a new `Temporal.ZonedDateTime` object representing this date-time with some fields replaced by new values.
- `Temporal.ZonedDateTime.prototype.withCalendar()`
    Returns a new `Temporal.ZonedDateTime` object representing this date-time interpreted in the new calendar system.
- `Temporal.ZonedDateTime.prototype.withPlainTime()`
    Returns a new `Temporal.ZonedDateTime` object representing this date-time with the time part entirely replaced by the new time (in a form convertible by `Temporal.PlainTime.from()`)
- `Temporal.ZonedDateTime.prototype.withTimeZone()`
    Returns a new `Temporal.ZonedDateTime` object representing the same instant as this date-time but in the new time zone.

## See also

- `Temporal`
- `Temporal.Duration`
- `Temporal.Instant`
- `Temporal.PlainDateTime`
- `Temporal.PlainDate`
- `Temporal.PlainTime`
