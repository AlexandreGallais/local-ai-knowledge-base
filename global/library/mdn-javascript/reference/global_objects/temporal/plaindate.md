---
title: "Temporal.PlainDate"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaindate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainDate

The **`Temporal.PlainDate`** object represents a calendar date (a date without a time or time zone); for example, an event on a calendar which happens during the whole day no matter which time zone it's happening in. It is fundamentally represented as an ISO 8601 calendar date, with year, month, and day fields, and an associated calendar system.

## Description

A `PlainDate` is essentially the date part of a `Temporal.PlainDateTime` object, with the time information removed. Because the date and time information don't have much interaction, all general information about date properties is documented here.

### RFC 9557 format

`PlainDate` objects can be serialized and parsed using the RFC 9557 format, an extension to the ISO 8601 / RFC 3339 format. The string has the following form (spaces are only for readability and should not be present in the actual string):

```plain
YYYY-MM-DD [u-ca=calendar_id]
```

- `YYYY`
    Either a four-digit number, or a six-digit number with a `+` or `-` sign.
- `MM`
    A two-digit number from `01` to `12`.
- `DD`
    A two-digit number from `01` to `31`. The `YYYY`, `MM`, and `DD` components can be separated by `-` or nothing.
- `[u-ca=calendar_id]` (optional)
    Replace `calendar_id` with the calendar to use. See `Intl.supportedValuesOf()` for a list of commonly supported calendar types. Defaults to `[u-ca=iso8601]`. May have a _critical flag_ by prefixing the key with `!`: e.g., `[!u-ca=iso8601]`. This flag generally tells other systems that it cannot be ignored if they don't support it. The `Temporal` parser will throw an error if the annotations contain two or more calendar annotations and one of them is critical. Note that the `YYYY-MM-DD` is always interpreted as an ISO 8601 calendar date and then converted to the specified calendar.

As an input, you may optionally include the time, offset, and time zone identifier, in the same format as `PlainDateTime`, but they will be ignored. Other annotations in the `[key=value]` format are also ignored, and they must not have the critical flag.

When serializing, you can configure whether to display the calendar ID, and whether to add a critical flag for it.

### Invalid date clamping

The `Temporal.PlainDate.from()`, `Temporal.PlainDate.prototype.with()`, `Temporal.PlainDate.prototype.add()`, `Temporal.PlainDate.prototype.subtract()` methods, and their counterparts in other `Temporal` objects, allow constructing dates using calendar-specific properties. The date components may be out of range. In the ISO calendar, this is always an _overflow_, such as the month being greater than 12 or the day being greater than the number of days, and fixing it would only involve clamping the value to the maximum allowed value. In other calendars, the invalid case may be more complex. When using the `overflow: "constrain"` option, invalid dates are fixed to a valid one in the following way:

- If the day doesn't exist but the month does: pick the closest day in the same month. If there are two equally-close dates in that month, pick the later one.
- If the month is a leap month that doesn't exist in the year: pick another date according to the cultural conventions of that calendar's users. Usually this will result in the same day in the month before or after where that month would normally fall in a leap year.
- If the month doesn't exist in the year for other reasons: pick the closest date that is still in the same year. If there are two equally-close dates in that year, pick the later one.
- If the entire year doesn't exist: pick the closest date in a different year. If there are two equally-close dates, pick the later one.

## Constructor

- `Temporal.PlainDate()`
    Creates a new `Temporal.PlainDate` object by directly supplying the underlying data.

## Static methods

- `Temporal.PlainDate.compare()`
    Returns a number (-1, 0, or 1) indicating whether the first date comes before, is the same as, or comes after the second date. Equivalent to comparing the year, month, and day fields of the underlying ISO 8601 dates.
- `Temporal.PlainDate.from()`
    Creates a new `Temporal.PlainDate` object from another `Temporal.PlainDate` object, an object with date properties, or an RFC 9557 string.

## Instance properties

These properties are defined on `Temporal.PlainDate.prototype` and shared by all `Temporal.PlainDate` instances.

- `Temporal.PlainDate.prototype.calendarId`
    Returns a string representing the calendar used to interpret the internal ISO 8601 date.
- `Temporal.PlainDate.prototype.constructor`
    The constructor function that created the instance object. For `Temporal.PlainDate` instances, the initial value is the `Temporal.PlainDate()` constructor.
- `Temporal.PlainDate.prototype.day`
    Returns a positive integer representing the 1-based day index in the month of this date, which is the same day number you would see on a calendar. Calendar-dependent. Generally starts at 1 and is continuous, but not always.
- `Temporal.PlainDate.prototype.dayOfWeek`
    Returns a positive integer representing the 1-based day index in the week of this date. Days in a week are numbered sequentially from `1` to `daysInWeek`, with each number mapping to its name. Calendar-dependent. 1 usually represents Monday in the calendar, even when locales using the calendar may consider a different day as the first day of the week (see `Intl.Locale.prototype.getWeekInfo()`).
- `Temporal.PlainDate.prototype.dayOfYear`
    Returns a positive integer representing the 1-based day index in the year of this date. The first day of this year is `1`, and the last day is the `daysInYear`. Calendar-dependent.
- `Temporal.PlainDate.prototype.daysInMonth`
    Returns a positive integer representing the number of days in the month of this date. Calendar-dependent.
- `Temporal.PlainDate.prototype.daysInWeek`
    Returns a positive integer representing the number of days in the week of this date. Calendar-dependent. For the ISO 8601 calendar, this is always 7, but in other calendar systems it may differ from week to week.
- `Temporal.PlainDate.prototype.daysInYear`
    Returns a positive integer representing the number of days in the year of this date. Calendar-dependent. For the ISO 8601 calendar, this is 365, or 366 in a leap year.
- `Temporal.PlainDate.prototype.era`
    Returns a calendar-specific lowercase string representing the era of this date, or `undefined` if the calendar does not use eras (e.g., ISO 8601). `era` and `eraYear` together uniquely identify a year in a calendar, in the same way that `year` does. Calendar-dependent. For Gregorian, it is either `"ce"` or `"bce"`.
- `Temporal.PlainDate.prototype.eraYear`
    Returns a non-negative integer representing the year of this date within the era, or `undefined` if the calendar does not use eras (e.g., ISO 8601). The year index usually starts from 1 (more common) or 0, and years in an era can decrease with time (e.g., Gregorian BCE). `era` and `eraYear` together uniquely identify a year in a calendar, in the same way that `year` does. Calendar-dependent.
- `Temporal.PlainDate.prototype.inLeapYear`
    Returns a boolean indicating whether this date is in a leap year. A leap year is a year that has more days (due to a leap day or leap month) than a common year. Calendar-dependent.
- `Temporal.PlainDate.prototype.month`
    Returns a positive integer representing the 1-based month index in the year of this date. The first month of this year is `1`, and the last month is the `monthsInYear`. Calendar-dependent. Note that unlike `Date.prototype.getMonth()`, the index is 1-based. If the calendar has leap months, then the month with the same `monthCode` may have different `month` indexes for different years.
- `Temporal.PlainDate.prototype.monthCode`
    Returns a calendar-specific string representing the month of this date. Calendar-dependent. Usually it is `M` plus a two-digit month number. For leap months, it is the previous month's code followed by `L`. If the leap month is the first month of the year, the code is `M00L`.
- `Temporal.PlainDate.prototype.monthsInYear`
    Returns a positive integer representing the number of months in the year of this date. Calendar-dependent. For the ISO 8601 calendar, this is always 12, but in other calendar systems it may differ.
- `Temporal.PlainDate.prototype.weekOfYear`
    Returns a positive integer representing the 1-based week index in the `yearOfWeek` of this date, or `undefined` if the calendar does not have a well-defined week system. The first week of the year is `1`. Calendar-dependent. Note that for ISO 8601, the first and last few days of the year may be attributed to the last week of the previous year or the first week of the next year.
- `Temporal.PlainDate.prototype.year`
    Returns an integer representing the number of years of this date relative to the start of a calendar-specific epoch year. Calendar-dependent. Usually year 1 is either the first year of the latest era or the ISO 8601 year `0001`. If the epoch is in the middle of the year, that year will have the same value before and after the start date of the era.
- `Temporal.PlainDate.prototype.yearOfWeek`
    Returns an integer representing the year to be paired with the `weekOfYear` of this date, or `undefined` if the calendar does not have a well-defined week system. Calendar-dependent. Usually this is the year of the date, but for ISO 8601, the first and last few days of the year may be attributed to the last week of the previous year or the first week of the next year, causing the `yearOfWeek` to differ by 1.
- `Temporal.PlainDate.prototype[Symbol.toStringTag]`
    The initial value of the `[Symbol.toStringTag]` property is the string `"Temporal.PlainDate"`. This property is used in `Object.prototype.toString()`.

## Instance methods

- `Temporal.PlainDate.prototype.add()`
    Returns a new `Temporal.PlainDate` object representing this date moved forward by a given duration (in a form convertible by `Temporal.Duration.from()`).
- `Temporal.PlainDate.prototype.equals()`
    Returns `true` if this date is equivalent in value to another date (in a form convertible by `Temporal.PlainDate.from()`), and `false` otherwise. They are compared both by their date values and their calendars.
- `Temporal.PlainDate.prototype.since()`
    Returns a new `Temporal.Duration` object representing the duration from another date (in a form convertible by `Temporal.PlainDate.from()`) to this date. The duration is positive if the other date is before this date, and negative if after.
- `Temporal.PlainDate.prototype.subtract()`
    Returns a new `Temporal.PlainDate` object representing this date moved backward by a given duration (in a form convertible by `Temporal.Duration.from()`).
- `Temporal.PlainDate.prototype.toJSON()`
    Returns a string representing this date in the same RFC 9557 format as calling `toString()`. Intended to be implicitly called by `JSON.stringify()`.
- `Temporal.PlainDate.prototype.toLocaleString()`
    Returns a string with a language-sensitive representation of this date.
- `Temporal.PlainDate.prototype.toPlainDateTime()`
    Returns a new `Temporal.PlainDateTime` object representing this date and a supplied time in the same calendar system.
- `Temporal.PlainDate.prototype.toPlainMonthDay()`
    Returns a new `Temporal.PlainMonthDay` object representing the `monthCode` and `day` of this date in the same calendar system.
- `Temporal.PlainDate.prototype.toPlainYearMonth()`
    Returns a new `Temporal.PlainYearMonth` object representing the `year` and `month` of this date in the same calendar system.
- `Temporal.PlainDate.prototype.toString()`
    Returns a string representing this date in the RFC 9557 format.
- `Temporal.PlainDate.prototype.toZonedDateTime()`
    Returns a new `Temporal.ZonedDateTime` object representing this date, a supplied time, and a supplied time zone, in the same calendar system.
- `Temporal.PlainDate.prototype.until()`
    Returns a new `Temporal.Duration` object representing the duration from this date to another date (in a form convertible by `Temporal.PlainDate.from()`). The duration is positive if the other date is after this date, and negative if before.
- `Temporal.PlainDate.prototype.valueOf()`
    Throws a `TypeError`, which prevents `Temporal.PlainDate` instances from being implicitly converted to primitives when used in arithmetic or comparison operations.
- `Temporal.PlainDate.prototype.with()`
    Returns a new `Temporal.PlainDate` object representing this date with some fields replaced by new values.
- `Temporal.PlainDate.prototype.withCalendar()`
    Returns a new `Temporal.PlainDate` object representing this date interpreted in the new calendar system.

## See also

- `Temporal`
- `Temporal.Duration`
- `Temporal.PlainDateTime`
- `Temporal.PlainMonthDay`
- `Temporal.PlainYearMonth`
- `Temporal.ZonedDateTime`
