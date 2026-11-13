---
title: "Temporal.PlainDateTime"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaindatetime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainDateTime

The **`Temporal.PlainDateTime`** object represents a date (calendar date) and time (wall-clock time) without a time zone. It is fundamentally represented as a combination of a date (with an associated calendar system) and a time.

## Description

A `PlainDateTime` is essentially the combination of a `Temporal.PlainDate` and a `Temporal.PlainTime`. Because the date and time information don't have much interaction, all general information about date properties is documented in the `PlainDate` object, and all general information about time properties is documented in the `PlainTime` object.

If the date-time represents a specific instant that should remain invariant across time zones, you should use the `Temporal.ZonedDateTime` object instead. Use `PlainDateTime` when you need to represent an event happening at a specific wall-clock time that may be a different instant in different time zones.

### RFC 9557 format

`PlainDateTime` objects can be serialized and parsed using the RFC 9557 format, an extension to the ISO 8601 / RFC 3339 format. The string has the following form (spaces are only for readability and should not be present in the actual string):

```plain
YYYY-MM-DD T HH:mm:ss.sssssssss [u-ca=calendar_id]
```

- `YYYY`
    Either a four-digit number, or a six-digit number with a `+` or `-` sign.
- `MM`
    A two-digit number from `01` to `12`.
- `DD`
    A two-digit number from `01` to `31`. The `YYYY`, `MM`, and `DD` components can be separated by `-` or nothing.
- `T` (optional)
    The date-time separator, which can be `T`, `t`, or a space. Present if and only if `HH` is present.
- `HH` (optional)
    A two-digit number from `00` to `23`. Defaults to `00`.
- `mm` (optional)
    A two-digit number from `00` to `59`. Defaults to `00`.
- `ss.sssssssss` (optional)
    A two-digit number from `00` to `59`. May optionally be followed by a `.` or `,` and one to nine digits. Defaults to `00`. The `HH`, `mm`, and `ss` components can be separated by `:` or nothing. You can omit either just `ss` or both `ss` and `mm`, so the time can be one of three forms: `HH`, `HH:mm`, or `HH:mm:ss.sssssssss`.
- `[u-ca=calendar_id]` (optional)
    Replace `calendar_id` with the calendar to use. See `Intl.supportedValuesOf()` for a list of commonly supported calendar types. Defaults to `[u-ca=iso8601]`. May have a _critical flag_ by prefixing the key with `!`: e.g., `[!u-ca=iso8601]`. This flag generally tells other systems that it cannot be ignored if they don't support it. The `Temporal` parser will throw an error if the annotations contain two or more calendar annotations and one of them is critical. Note that the `YYYY-MM-DD` is always interpreted as an ISO 8601 calendar date and then converted to the specified calendar.

As an input, you may optionally include the offset and time zone identifier, in the same format as `ZonedDateTime`, but they will be ignored. Note that the offset must _not_ be `Z`. Other annotations in the `[key=value]` format are also ignored, and they must not have the critical flag.

When serializing, you can configure the fractional second digits, whether to display the calendar ID, and whether to add a critical flag for it.

## Constructor

- `Temporal.PlainDateTime()`
    Creates a new `Temporal.PlainDateTime` object by directly supplying the underlying data.

## Static methods

- `Temporal.PlainDateTime.compare()`
    Returns a number (-1, 0, or 1) indicating whether the first date-time comes before, is the same as, or comes after the second date-time. Equivalent to first comparing their dates, then comparing their times if the dates are the same.
- `Temporal.PlainDateTime.from()`
    Creates a new `Temporal.PlainDateTime` object from another `Temporal.PlainDateTime` object, an object with date and time properties, or an RFC 9557 string.

## Instance properties

These properties are defined on `Temporal.PlainDateTime.prototype` and shared by all `Temporal.PlainDateTime` instances.

- `Temporal.PlainDateTime.prototype.calendarId`
    Returns a string representing the calendar used to interpret the internal ISO 8601 date.
- `Temporal.PlainDateTime.prototype.constructor`
    The constructor function that created the instance object. For `Temporal.PlainDateTime` instances, the initial value is the `Temporal.PlainDateTime()` constructor.
- `Temporal.PlainDateTime.prototype.day`
    Returns a positive integer representing the 1-based day index in the month of this date, which is the same day number you would see on a calendar. Calendar-dependent. Generally starts at 1 and is continuous, but not always.
- `Temporal.PlainDateTime.prototype.dayOfWeek`
    Returns a positive integer representing the 1-based day index in the week of this date. Days in a week are numbered sequentially from `1` to `daysInWeek`, with each number mapping to its name. Calendar-dependent. 1 usually represents Monday in the calendar, even when locales using the calendar may consider a different day as the first day of the week (see `Intl.Locale.prototype.getWeekInfo()`).
- `Temporal.PlainDateTime.prototype.dayOfYear`
    Returns a positive integer representing the 1-based day index in the year of this date. The first day of this year is `1`, and the last day is the `daysInYear`. Calendar-dependent.
- `Temporal.PlainDateTime.prototype.daysInMonth`
    Returns a positive integer representing the number of days in the month of this date. Calendar-dependent.
- `Temporal.PlainDateTime.prototype.daysInWeek`
    Returns a positive integer representing the number of days in the week of this date. Calendar-dependent. For the ISO 8601 calendar, this is always 7, but in other calendar systems it may differ from week to week.
- `Temporal.PlainDateTime.prototype.daysInYear`
    Returns a positive integer representing the number of days in the year of this date. Calendar-dependent. For the ISO 8601 calendar, this is 365, or 366 in a leap year.
- `Temporal.PlainDateTime.prototype.era`
    Returns a calendar-specific lowercase string representing the era of this date, or `undefined` if the calendar does not use eras (e.g., ISO 8601). `era` and `eraYear` together uniquely identify a year in a calendar, in the same way that `year` does. Calendar-dependent. For Gregorian, it is either `"ce"` or `"bce"`.
- `Temporal.PlainDateTime.prototype.eraYear`
    Returns a non-negative integer representing the year of this date within the era, or `undefined` if the calendar does not use eras (e.g., ISO 8601). The year index usually starts from 1 (more common) or 0, and years in an era can decrease with time (e.g., Gregorian BCE). `era` and `eraYear` together uniquely identify a year in a calendar, in the same way that `year` does. Calendar-dependent.
- `Temporal.PlainDateTime.prototype.hour`
    Returns an integer from 0 to 23 representing the hour component of this time.
- `Temporal.PlainDateTime.prototype.inLeapYear`
    Returns a boolean indicating whether this date is in a leap year. A leap year is a year that has more days (due to a leap day or leap month) than a common year. Calendar-dependent.
- `Temporal.PlainDateTime.prototype.microsecond`
    Returns an integer from 0 to 999 representing the microsecond (10-6 second) component of this time.
- `Temporal.PlainDateTime.prototype.millisecond`
    Returns an integer from 0 to 999 representing the millisecond (10-3 second) component of this time.
- `Temporal.PlainDateTime.prototype.minute`
    Returns an integer from 0 to 59 representing the minute component of this time.
- `Temporal.PlainDateTime.prototype.month`
    Returns a positive integer representing the 1-based month index in the year of this date. The first month of this year is `1`, and the last month is the `monthsInYear`. Calendar-dependent. Note that unlike `Date.prototype.getMonth()`, the index is 1-based. If the calendar has leap months, then the month with the same `monthCode` may have different `month` indexes for different years.
- `Temporal.PlainDateTime.prototype.monthCode`
    Returns a calendar-specific string representing the month of this date. Calendar-dependent. Usually it is `M` plus a two-digit month number. For leap months, it is the previous month's code followed by `L`. If the leap month is the first month of the year, the code is `M00L`.
- `Temporal.PlainDateTime.prototype.monthsInYear`
    Returns a positive integer representing the number of months in the year of this date. Calendar-dependent. For the ISO 8601 calendar, this is always 12, but in other calendar systems it may differ.
- `Temporal.PlainDateTime.prototype.nanosecond`
    Returns an integer from 0 to 999 representing the nanosecond (10-9 second) component of this time.
- `Temporal.PlainDateTime.prototype.second`
    Returns an integer from 0 to 59 representing the second component of this time.
- `Temporal.PlainDateTime.prototype.weekOfYear`
    Returns a positive integer representing the 1-based week index in the `yearOfWeek` of this date, or `undefined` if the calendar does not have a well-defined week system. The first week of the year is `1`. Calendar-dependent. Note that for ISO 8601, the first and last few days of the year may be attributed to the last week of the previous year or the first week of the next year.
- `Temporal.PlainDateTime.prototype.year`
    Returns an integer representing the number of years of this date relative to the start of a calendar-specific epoch year. Calendar-dependent. Usually year 1 is either the first year of the latest era or the ISO 8601 year `0001`. If the epoch is in the middle of the year, that year will have the same value before and after the start date of the era.
- `Temporal.PlainDateTime.prototype.yearOfWeek`
    Returns an integer representing the year to be paired with the `weekOfYear` of this date, or `undefined` if the calendar does not have a well-defined week system. Calendar-dependent. Usually this is the year of the date, but for ISO 8601, the first and last few days of the year may be attributed to the last week of the previous year or the first week of the next year, causing the `yearOfWeek` to differ by 1.
- `Temporal.PlainDateTime.prototype[Symbol.toStringTag]`
    The initial value of the `[Symbol.toStringTag]` property is the string `"Temporal.PlainDateTime"`. This property is used in `Object.prototype.toString()`.

## Instance methods

- `Temporal.PlainDateTime.prototype.add()`
    Returns a new `Temporal.PlainDateTime` object representing this date-time moved forward by a given duration (in a form convertible by `Temporal.Duration.from()`).
- `Temporal.PlainDateTime.prototype.equals()`
    Returns `true` if this date-time is equivalent in value to another date-time (in a form convertible by `Temporal.PlainDateTime.from()`), and `false` otherwise. They are compared both by their date and time values and their calendars, so two date-times from different calendars may be considered equal by `Temporal.PlainDateTime.compare()` but not by `equals()`.
- `Temporal.PlainDateTime.prototype.round()`
    Returns a new `Temporal.PlainDateTime` object representing this date-time rounded to the given unit.
- `Temporal.PlainDateTime.prototype.since()`
    Returns a new `Temporal.Duration` object representing the duration from another date-time (in a form convertible by `Temporal.PlainDateTime.from()`) to this date-time. The duration is positive if the other date-time is before this date-time, and negative if after.
- `Temporal.PlainDateTime.prototype.subtract()`
    Returns a new `Temporal.PlainDateTime` object representing this date-time moved backward by a given duration (in a form convertible by `Temporal.Duration.from()`).
- `Temporal.PlainDateTime.prototype.toJSON()`
    Returns a string representing this date-time in the same RFC 9557 format as calling `toString()`. Intended to be implicitly called by `JSON.stringify()`.
- `Temporal.PlainDateTime.prototype.toLocaleString()`
    Returns a string with a language-sensitive representation of this date-time.
- `Temporal.PlainDateTime.prototype.toPlainDate()`
    Returns a new `Temporal.PlainDate` object representing the date part (year, month, day) of this date-time in the same calendar system.
- `Temporal.PlainDateTime.prototype.toPlainTime()`
    Returns a new `Temporal.PlainTime` object representing the time part (hour, minute, second, and subsecond components) of this date-time.
- `Temporal.PlainDateTime.prototype.toString()`
    Returns a string representing this date-time in the RFC 9557 format.
- `Temporal.PlainDateTime.prototype.toZonedDateTime()`
    Returns a new `Temporal.ZonedDateTime` instance representing the same date-time as this plain date-time, but in the specified time zone.
- `Temporal.PlainDateTime.prototype.until()`
    Returns a new `Temporal.Duration` object representing the duration from this date-time to another date-time (in a form convertible by `Temporal.PlainDateTime.from()`). The duration is positive if the other date-time is after this date-time, and negative if before.
- `Temporal.PlainDateTime.prototype.valueOf()`
    Throws a `TypeError`, which prevents `Temporal.PlainDateTime` instances from being implicitly converted to primitives when used in arithmetic or comparison operations.
- `Temporal.PlainDateTime.prototype.with()`
    Returns a new `Temporal.PlainDateTime` object representing this date-time with some fields replaced by new values.
- `Temporal.PlainDateTime.prototype.withCalendar()`
    Returns a new `Temporal.PlainDateTime` object representing this date-time interpreted in the new calendar system.
- `Temporal.PlainDateTime.prototype.withPlainTime()`
    Returns a new `Temporal.PlainDateTime` object representing this date-time with the time part entirely replaced by the new time (in a form convertible by `Temporal.PlainTime.from()`).

## See also

- `Temporal`
- `Temporal.Duration`
- `Temporal.PlainDate`
- `Temporal.PlainTime`
- `Temporal.ZonedDateTime`
