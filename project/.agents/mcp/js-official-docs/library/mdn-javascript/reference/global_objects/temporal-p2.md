---
title: "Temporal (part 2 of 3)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal (part 2 of 3)

## Description

Unlike most global objects, `Temporal` is not a constructor. You cannot use it with the `new` operator or invoke the `Temporal` object as a function. All properties and methods of `Temporal` are static (just like the `Math` object).

`Temporal` has an intricate and powerful API. It exposes over 200 utility methods via several classes, so it could appear very complex. We will provide a high-level overview of how these APIs are related to each other. You can read the Representing dates & times guide for the `Temporal` object, and the Temporal cookbook for snippets that implement common use cases (including how to migrate from `Date` to `Temporal`).

### Background and concepts

JavaScript has had the `Date` object for handling date and time since its first days. However, the `Date` API is based on the poorly designed `java.util.Date` class from Java, which was replaced in the early 2010s; but, because of JavaScript's goal of backward compatibility, `Date` sticks around in the language.

The important lesson to preface the whole introduction is that **date handling is complex**. Most of the problems of `Date` are fixable by adding more methods, but a fundamental design flaw remains: it exposes so many methods on the same object that developers are often confused about what to use, leading to unexpected pitfalls. A well-designed API not only needs to do more, but also should do _less_ with each level of abstraction, because preventing misuse is as important as enabling use cases.

`Date` objects wear two hats simultaneously:

- As a timestamp: the number of milliseconds or nanoseconds elapsed since a fixed point in time (known as the _epoch_).
- As a combination of components: year, month, day, hour, minute, second, millisecond, and nanosecond. The year, month, and day identifiers only make sense with reference to a _calendar system_. The whole combination maps to a unique instant in history when associated with a time zone. `Date` objects provide methods for reading and modifying these components.

Time zones underlie a significant number of date-related bugs. When interacting with a `Date` via the "combination of components" model, the time can only be in two time zones: UTC and local (device), and there's no way to specify an arbitrary time zone. Also lacking is the concept of "no time zone": this is known as a _calendar date_ (for dates) or _wall-clock time_ (for times), which is a time you "read off a calendar or clock". For example, if you are setting a daily wake up alarm, you will want to set it to "8:00AM" regardless of whether it is daylight saving time or not, whether you have traveled to a different time zone, etc.

A second feature lacking from `Date` is a calendar system. Most people may be familiar with the Gregorian calendar, where there are two eras, BC and AD; there are 12 months; each month has a different number of days; there's a leap year every 4 years; and so on. However, some of these concepts may not apply when you are working with another calendar system, such as the Hebrew calendar, the Chinese calendar, the Japanese calendar, etc. With `Date`, you can only work with the Gregorian calendar model.

There are many other undesirable legacies about `Date`, such as all setters being mutating (which often causes unwanted side effects), the date time string format being impossible to parse in a consistent way, etc. In the end, the best solution is to build a new API from scratch, which is what `Temporal` is.

### API overview

`Temporal` is a namespace, like `Intl`. It contains several classes and namespaces, each of which is designed to handle a specific aspect of date and time management. The classes can be grouped as such:

- Representing a time duration (a difference between two time points): `Temporal.Duration`
- Representing a time point:
  - Representing a unique instant in history:
    - As a timestamp: `Temporal.Instant`
    - As a date-time component combination paired with a time zone: `Temporal.ZonedDateTime`
  - Representing a time-zone-unaware date/time (which are all prefixed with "Plain"):
    - Date (year, month, day) + time (hour, minute, second, millisecond, microsecond, nanosecond): `Temporal.PlainDateTime` (Note: `ZonedDateTime` is equivalent to `PlainDateTime` plus a time zone)
      - Date (year, month, day): `Temporal.PlainDate`
        - Year, month: `Temporal.PlainYearMonth`
        - Month, day: `Temporal.PlainMonthDay`
      - Time (hour, minute, second, millisecond, microsecond, nanosecond): `Temporal.PlainTime`

Furthermore, there's also another utility namespace, `Temporal.Now`, which provides methods for getting the current time in various formats.

### Shared class interface

There are many classes in the `Temporal` namespace, but they share many similar methods. The following table lists all methods of each class (except conversion methods):

 |
 | `Instant`
 | `ZonedDateTime`
 | `PlainDateTime`
 | `PlainDate`
 | `PlainTime`
 | `PlainYearMonth`
 | `PlainMonthDay`

 | Construction
 | `Instant()``Instant.from()``Instant.fromEpochMilliseconds()``Instant.fromEpochNanoseconds()`
 | `ZonedDateTime()``ZonedDateTime.from()`
 | `PlainDateTime()``PlainDateTime.from()`
 | `PlainDate()``PlainDate.from()`
 | `PlainTime()``PlainTime.from()`
 | `PlainYearMonth()``PlainYearMonth.from()`
 | `PlainMonthDay()``PlainMonthDay.from()`

 | Updater
 | N/A
 | `with()``withCalendar()``withTimeZone()``withPlainTime()`
 | `with()``withCalendar()``withPlainTime()`
 | `with()``withCalendar()`
 | `with()`
 | `with()`
 | `with()`

 | Arithmetic
 | `add()``subtract()``since()``until()`
 | `add()``subtract()``since()``until()`
 | `add()``subtract()``since()``until()`
 | `add()``subtract()``since()``until()`
 | `add()``subtract()``since()``until()`
 | `add()``subtract()``since()``until()`
 | N/A

 | Rounding
 | `round()`
 | `round()`
 | `round()`
 | N/A
 | `round()`
 | N/A
 | N/A

 | Comparison
 | `equals()``Instant.compare()`
 | `equals()``ZonedDateTime.compare()`
 | `equals()``PlainDateTime.compare()`
 | `equals()``PlainDate.compare()`
 | `equals()``PlainTime.compare()`
 | `equals()``PlainYearMonth.compare()`
 | `equals()`

 | Serialization
 | `toJSON()``toLocaleString()``toString()``valueOf()`
 | `toJSON()``toLocaleString()``toString()``valueOf()`
 | `toJSON()``toLocaleString()``toString()``valueOf()`
 | `toJSON()``toLocaleString()``toString()``valueOf()`
 | `toJSON()``toLocaleString()``toString()``valueOf()`
 | `toJSON()``toLocaleString()``toString()``valueOf()`
 | `toJSON()``toLocaleString()``toString()``valueOf()`

The following table summarizes which properties are available on each class, giving you a sense of what information each class can represent.

 |
 | `Instant`
 | `ZonedDateTime`
 | `PlainDateTime`
 | `PlainDate`
 | `PlainTime`
 | `PlainYearMonth`
 | `PlainMonthDay`

 | Calendar
 | N/A
 | `calendarId`
 | `calendarId`
 | `calendarId`
 | N/A
 | `calendarId`
 | `calendarId`

 | Year-related
 | N/A
 | `era``eraYear``year``inLeapYear``monthsInYear``daysInYear`
 | `era``eraYear``year``inLeapYear``monthsInYear``daysInYear`
 | `era``eraYear``year``inLeapYear``monthsInYear``daysInYear`
 | N/A
 | `era``eraYear``year``inLeapYear``monthsInYear``daysInYear`
 | N/A

 | Month-related
 | N/A
 | `month``monthCode``daysInMonth`
 | `month``monthCode``daysInMonth`
 | `month``monthCode``daysInMonth`
 | N/A
 | `month``monthCode``daysInMonth`
 | `monthCode`

 | Week-related
 | N/A
 | `weekOfYear``yearOfWeek``daysInWeek`
 | `weekOfYear``yearOfWeek``daysInWeek`
 | `weekOfYear``yearOfWeek``daysInWeek`
 | N/A
 | N/A
 | N/A

 | Day-related
 | N/A
 | `day``dayOfWeek``dayOfYear`
 | `day``dayOfWeek``dayOfYear`
 | `day``dayOfWeek``dayOfYear`
 | N/A
 | N/A
 | `day`

 | Time components
 | N/A
 | `hour``minute``second``millisecond``microsecond``nanosecond`
 | `hour``minute``second``millisecond``microsecond``nanosecond`
 | N/A
 | `hour``minute``second``millisecond``microsecond``nanosecond`
 | N/A
 | N/A

 | Time zone
 | N/A
 | `timeZoneId``offset``offsetNanoseconds``hoursInDay``getTimeZoneTransition()``startOfDay()`
 | N/A
 | N/A
 | N/A
 | N/A
 | N/A

 | Epoch time
 | `epochMilliseconds``epochNanoseconds`
 | `epochMilliseconds``epochNanoseconds`
 | N/A
 | N/A
 | N/A
 | N/A
 | N/A

### Conversion between classes

The table below summarizes all conversion methods that exist on each class.

 |
 | How to convert from...

 | `Instant`
 | `ZonedDateTime`
 | `PlainDateTime`
 | `PlainDate`
 | `PlainTime`
 | `PlainYearMonth`
 | `PlainMonthDay`

 | to... | `Instant` | / | `toInstant()` | Convert to `ZonedDateTime` first

 | `ZonedDateTime` | `toZonedDateTimeISO()` | / | `toZonedDateTime()` | `toZonedDateTime()` | `PlainDate#toZonedDateTime()` (pass as argument) | Convert to `PlainDate` first

 | `PlainDateTime` | Convert to `ZonedDateTime` first | `toPlainDateTime()` | / | `toPlainDateTime()` | `PlainDate#toPlainDateTime()` (pass as argument)

 | `PlainDate` | `toPlainDate()` | `toPlainDate()` | / | No overlap in information | `toPlainDate()` | `toPlainDate()`

 | `PlainTime` | `toPlainTime()` | `toPlainTime()` | No overlap in information | / | No overlap in information

 | `PlainYearMonth` | Convert to `PlainDate` first | `toPlainYearMonth()` | No overlap in information | / | Convert to `PlainDate` first

 | `PlainMonthDay` | `toPlainMonthDay()` | Convert to `PlainDate` first | /

With these tables, you should have a basic idea of how to navigate the `Temporal` API.
