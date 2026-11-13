---
title: "Date (part 1 of 2)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date

JavaScript **`Date`** objects represent a single moment in time in a platform-independent format. `Date` objects encapsulate an integral number that represents milliseconds since the midnight at the beginning of January 1, 1970, UTC (the _epoch_).

> **Note:**
> With the introduction of the `Temporal` API, the `Date` object is considered a legacy feature. Consider using `Temporal` for new code and migrate existing code over to it if possible (check the browser compatibility. Read the Representing dates & times guide for the `Temporal` object, and the Temporal cookbook for snippets that implement common use cases (including how to migrate from `Date` to `Temporal`).

## Description

### The epoch, timestamps, and invalid date

A JavaScript date is fundamentally specified as the time in milliseconds that has elapsed since the epoch, which is defined as the midnight at the beginning of January 1, 1970, UTC (equivalent to the UNIX epoch). This timestamp is _timezone-agnostic_ and uniquely defines an instant in history.

> **Note:**
> While the time value at the heart of a Date object is UTC, the basic <example-value> to fetch the date and time or its components all work in the local (i.e., host system) time zone and offset.

The maximum timestamp representable by a `Date` object is slightly smaller than the maximum safe integer (`Number.MAX_SAFE_INTEGER`, which is 9,007,199,254,740,991). A `Date` object can represent a maximum of ±8,640,000,000,000,000 milliseconds, or ±100,000,000 (one hundred million) days, relative to the epoch. This is the range from April 20, 271821 BC to September 13, 275760 AD. Any attempt to represent a time outside this range results in the `Date` object holding a timestamp value of `NaN`, which is an "Invalid Date".

```js
console.log(new Date(8.64e15).toString()); // "Sat Sep 13 275760 00:00:00 GMT+0000 (Coordinated Universal Time)"
console.log(new Date(8.64e15 + 1).toString()); // "Invalid Date"
```

There are various methods that allow you to interact with the timestamp stored in the date:

- You can interact with the timestamp value directly using the `getTime()` and `setTime()` methods.
- The `valueOf()` and `[Symbol.toPrimitive]()` (when passed `"number"`) methods — which are automatically called in number coercion — return the timestamp, causing `Date` objects to behave like their timestamps when used in number contexts.
- All static methods (`Date.now()`, `Date.parse()`, and `Date.UTC()`) return timestamps instead of `Date` objects.
- The `Date()` constructor can be called with a timestamp as the only argument.

### Date components and time zones

A date is represented internally as a single number, the _timestamp_. When interacting with it, the timestamp needs to be interpreted as a structured date-and-time representation. There are always two ways to interpret a timestamp: as a local time or as a Coordinated Universal Time (UTC), the global standard time defined by the World Time Standard. The local timezone is not stored in the date object, but is determined by the host environment (user's device).

> **Note:**
> UTC should not be confused with the Greenwich Mean Time (GMT), because they are not always equal — this is explained in more detail in the linked Wikipedia page.

For example, the timestamp 0 represents a unique instant in history, but it can be interpreted in two ways:

- As a UTC time, it is midnight at the beginning of January 1, 1970, UTC,
- As a local time in New York (UTC-5), it is 19:00:00 on December 31, 1969.

The `getTimezoneOffset()` method returns the difference between UTC and the local time in minutes. Note that the timezone offset does not only depend on the current timezone, but also on the time represented by the `Date` object, because of daylight saving time and historical changes. In essence, the timezone offset is the offset from UTC time, at the time represented by the `Date` object and at the location of the host environment.

There are two groups of `Date` methods: one group gets and sets various date components by interpreting the timestamp as a local time, while the other uses UTC.

       | Component
       | Local
       | UTC

       | Get
       | Set
       | Get
       | Set

       | Year
       | `getFullYear()`
       | `setFullYear()`
       | `getUTCFullYear()`
       | `setUTCFullYear()`

       | Month
       | `getMonth()`
       | `setMonth()`
       | `getUTCMonth()`
       | `setUTCMonth()`

       | Date (of month)
       | `getDate()`
       | `setDate()`
       | `getUTCDate()`
       | `setUTCDate()`

       | Hours
       | `getHours()`
       | `setHours()`
       | `getUTCHours()`
       | `setUTCHours()`

       | Minutes
       | `getMinutes()`
       | `setMinutes()`
       | `getUTCMinutes()`
       | `setUTCMinutes()`

       | Seconds
       | `getSeconds()`
       | `setSeconds()`
       | `getUTCSeconds()`
       | `setUTCSeconds()`

       | Milliseconds
       | `getMilliseconds()`
       | `setMilliseconds()`
       | `getUTCMilliseconds()`
       | `setUTCMilliseconds()`

       | Day (of week)
       | `getDay()`
       | N/A
       | `getUTCDay()`
       | N/A

The `Date()` constructor can be called with two or more arguments, in which case they are interpreted as the year, month, day, hour, minute, second, and millisecond, respectively, in local time. `Date.UTC()` works similarly, but it interprets the components as UTC time and also accepts a single argument representing the year.

> **Note:**
> Some methods, including the `Date()` constructor, `Date.UTC()`, and the deprecated `getYear()`/`setYear()` methods, interpret a two-digit year as a year in the 1900s. For example, `new Date(99, 5, 24)` is interpreted as June 24, 1999, not June 24, 99. See Interpretation of two-digit years for more information.

When a segment overflows or underflows its expected range, it usually "carries over to" or "borrows from" the higher segment. For example, if the month is set to 12 (months are zero-based, so December is 11), it becomes the January of the next year. If the day of month is set to 0, it becomes the last day of the previous month. This also applies to dates specified with the date time string format.

When attempting to set the local time to a time falling within an offset transition (usually daylight saving time), the exact time is derived using the same behavior as `Temporal`'s `disambiguation: "compatible"` option. That is, if the local time corresponds to two instants, the earlier one is chosen; if the local time does not exist (there is a gap), we go forward by the gap duration.

```js
// Assume America/New_York local time zone
// 2024-03-10 02:30 is within the spring-forward transition and does not exist
// 01:59 (UTC-5) jumps to 03:00 (UTC-4), so 02:30 moves forward by one hour
console.log(new Date(2024, 2, 10, 2, 30).toString());
// Sun Mar 10 2024 03:30:00 GMT-0400 (Eastern Daylight Time)

// 2024-11-03 01:30 is within the fall-back transition and exists twice
// 01:59 (UTC-4) jumps to 01:00 (UTC-5), so the earlier 01:30 (UTC-4) is chosen
console.log(new Date(2024, 10, 3, 1, 30).toString());
// Sun Nov 03 2024 01:30:00 GMT-0400 (Eastern Daylight Time)
```

### Date time string format

There are many ways to format a date as a string. The JavaScript specification only specifies one format to be universally supported: the _date time string format_, a simplification of the ISO 8601 calendar date extended format. The format is as follows:

```plain
YYYY-MM-DDTHH:mm:ss.sssZ
```

- `YYYY` is the year, with four digits (`0000` to `9999`), or as an _expanded year_ of `+` or `-` followed by six digits. The sign is required for expanded years. `-000000` is explicitly disallowed as a valid year.
- `MM` is the month, with two digits (`01` to `12`). Defaults to `01`.
- `DD` is the day of the month, with two digits (`01` to `31`). Defaults to `01`.
- `T` is a literal character, which indicates the beginning of the _time_ part of the string. The `T` is required when specifying the time part.
- `HH` is the hour, with two digits (`00` to `23`). As a special case, `24:00:00` is allowed, and is interpreted as midnight at the beginning of the next day. Defaults to `00`.
- `mm` is the minute, with two digits (`00` to `59`). Defaults to `00`.
- `ss` is the second, with two digits (`00` to `59`). Defaults to `00`.
- `sss` is the millisecond, with three digits (`000` to `999`). Defaults to `000`.
- `Z` is the timezone offset, which can either be the literal character `Z` (indicating UTC), or `+` or `-` followed by `HH:mm`, the offset in hours and minutes from UTC.

Various components can be omitted, so the following are all valid:

- Date-only form: `YYYY`, `YYYY-MM`, `YYYY-MM-DD`
- Date-time form: one of the above date-only forms, followed by `T`, followed by `HH:mm`, `HH:mm:ss`, or `HH:mm:ss.sss`. Each combination can be followed by a time zone offset.

For example, `"2011-10-10"` (_date-only_ form), `"2011-10-10T14:48:00"` (_date-time_ form), or `"2011-10-10T14:48:00.000+09:00"` (_date-time_ form with milliseconds and time zone) are all valid date time strings.

When the time zone offset is absent, **date-only forms are interpreted as a UTC time and date-time forms are interpreted as a local time.** The interpretation as a UTC time is due to a historical spec error that was not consistent with ISO 8601 but could not be changed due to web compatibility. See Broken Parser – A Web Reality Issue.

`Date.parse()` and the `Date()` constructor both accept strings in the date time string format as input. Furthermore, implementations are allowed to support other date formats when the input fails to match this format.

The `toISOString()` method returns a string representation of the date in the date time string format, with the time zone offset always set to `Z` (UTC).

> **Note:**
> You are encouraged to make sure your input conforms to the date time string format above for maximum compatibility, because support for other formats is not guaranteed. However, there are some formats that are supported in all major implementations — like  format — in which case their usage can be acceptable. Always conduct cross-browser tests to ensure your code works in all target browsers. A library can help if many different formats are to be accommodated.

Non-standard strings can be parsed in any way as desired by the implementation, including the time zone — most implementations use the local time zone by default. Implementations are not required to return invalid date for out-of-bounds date components, although they usually do. A string may have in-bounds date components (with the bounds defined above), but does not represent a date in reality (for example, "February 30"). Implementations behave inconsistently in this case. The `Date.parse()` page offers more examples about these non-standard cases.

### Other ways to format a date

- `toISOString()` returns a string in the format `1970-01-01T00:00:00.000Z` (the date time string format introduced above, which is simplified ISO 8601). `toJSON()` calls `toISOString()` and returns the result.
- `toString()` returns a string in the format `Thu Jan 01 1970 00:00:00 GMT+0000 (Coordinated Universal Time)`, while `toDateString()` and `toTimeString()` return the date and time parts of the string, respectively. `[Symbol.toPrimitive]()` (when passed `"string"` or `"default"`) calls `toString()` and returns the result.
- `toUTCString()` returns a string in the format `Thu, 01 Jan 1970 00:00:00 GMT` (generalized ).
- `toLocaleDateString()`, `toLocaleTimeString()`, and `toLocaleString()` use locale-specific date and time formats, usually provided by the `Intl` API.

See the Formats of `toString` method return values section for examples.

## Constructor

- `Date()`
    When called as a constructor, returns a new `Date` object. When called as a function, returns a string representation of the current date and time.

## Static methods

- `Date.now()`
    Returns the numeric value corresponding to the current time—the number of milliseconds since January 1, 1970 00:00:00 UTC, with leap seconds ignored.
- `Date.parse()`
    Parses a string representation of a date and returns the number of milliseconds since January 1, 1970 00:00:00 UTC, with leap seconds ignored.
- `Date.UTC()`
    Accepts the same parameters as the longest form of the constructor (i.e., 2 to 7) and returns the number of milliseconds since January 1, 1970 00:00:00 UTC, with leap seconds ignored.

## Instance properties

These properties are defined on `Date.prototype` and shared by all `Date` instances.

- `Date.prototype.constructor`
    The constructor function that created the instance object. For `Date` instances, the initial value is the `Date` constructor.
