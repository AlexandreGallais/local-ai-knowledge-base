---
title: "Representing dates & times (part 4 of 4)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/representing_dates_times/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Representing dates & times (part 4 of 4)

## Deriving new times

So far, we've used dates to create an instant or a plain date-time (to various degrees of precision), store it in a variable, and display it to the user. The `Temporal` API can also derive new instants or plain date-times using arithmetic. We've already shown `compare()`, `add()`/`subtract()`, `since()`/`until()`, etc.; let's properly introduce the arithmetic methods on each `Temporal` object.

 |
 | `Instant`
 | `ZonedDateTime`
 | `PlainDateTime`
 | `PlainDate`
 | `PlainTime`
 | `PlainYearMonth`
 | `PlainMonthDay`

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

Addition and subtraction involve another object, `Temporal.Duration`, representing the difference between two times. Its interface is relatively straightforward: it stores the number of `years`, `months`, `days`, etc., all the way to `nanoseconds`. It can be either positive or negative. You can combine it with other times or durations:

- <code>duration1.add(duration2)</code>, <code>duration1.subtract(duration2)</code>: Calculate new durations
- <code>time.add(duration)</code>, <code>time.subtract(duration)</code>: Calculate new times (we show `ZonedDateTime` examples, but other time classes like `PlainDateTime` work similarly)
- <code>time1.since(time2)</code>, <code>time1.until(time2)</code>: Calculate new durations (we show `ZonedDateTime` examples, but other time classes like `PlainDateTime` work similarly)

> **Note:**
> You can't do arithmetic with `PlainMonthDay` objects because they represent recurring dates, not a unique date/time.

For example, you can calculate the difference between two zoned date-times using `since()` and `until()`, which both give you `Temporal.Duration` objects. By default, the duration only uses units of hours or smaller:

```js
const mdnCreation = Temporal.ZonedDateTime.from(
  "2020-09-15T11:43:01-04:00[America/New_York]",
);
const bastilleFall = Temporal.ZonedDateTime.from(
  "1789-07-14T17:00:00Z[Europe/Paris]",
);

const timeDiff = mdnCreation.since(bastilleFall);
console.log(
  `mdn/content was created ${timeDiff.toLocaleString("en-US")} after the fall of the Bastille!`,
);
// mdn/content was created 2,026,414 hr, 43 min, 1 sec after the fall of the Bastille!

const timeDiff2 = bastilleFall.until(mdnCreation);
console.log(Temporal.Duration.compare(timeDiff, timeDiff2)); // 0 (equal)
```

Be aware that different `Temporal` classes have different restrictions on the durations they can process. For example, `Instant` has no calendar, so it cannot process calendar duration units like months; it also has no time zone, so it cannot process day units (because they may not be 24 hours long during offset transitions). `PlainYearMonth` is only accurate to whole months; durations less than a month are rounded off.

You can compare two times using the static `compare()` method, for example `Temporal.ZonedDateTime.compare(a, b)`. This method returns a number with the same sign as `a.epochNanoseconds - b.epochNanoseconds`:

```js
if (Temporal.ZonedDateTime.compare(mdnCreation, bastilleFall) > 0) {
  console.log("mdn/content was created after the fall of the Bastille!");
} else {
  console.log(
    "What...? mdn/content is at least as old as the fall of the Bastille!",
  );
}
```

> **Note:**
> `PlainMonthDay` objects are also not orderable.

Alternatively, you can use the `equals()` method to test if two objects store the same underlying data (this is stricter than just testing that they represent the same date/time). For `ZonedDateTime`, this requires their time zones and calendars to match; to compare only their instants, use `Temporal.ZonedDateTime.compare(a, b) === 0`.

```js
if (mdnCreation.equals(bastilleFall)) {
  // This won't execute, because the ZDTs both represent different instants
  // and have different time zone IDs
  console.log(
    "mdn/content was created at the exact same instant as the fall of the Bastille!",
  );
}
```

Finally, for objects carrying time components (`Instant`, `ZonedDateTime`, `PlainDateTime`, `PlainTime`), the `round()` method allows you to round off time units:

```js
const mdnCreationHour = mdnCreation.round({ smallestUnit: "hours" });
console.log(
  `mdn/content was created at approximately ${mdnCreationHour.toLocaleString("en-US")}`,
);
// mdn/content was created at approximately 9/15/2020, 12:00:00 PM EDT
```

All `Temporal` objects are immutable, so the same object always has the exact same underlying data. If you want to replace a single component or change the calendar or time zone, each class provides "with" methods to create new objects.

```js
const mdnCreationNoon = mdnCreation.with({ hour: 12, minute: 0, second: 0 });
const mdnCreationChi = mdnCreation.withCalendar("chinese");
const mdnCreationParis = mdnCreation.withTimeZone("Europe/Paris");
```

> **Note:**
> If you can, prefer using arithmetic methods like `add()`/`subtract()` instead of manually setting components. This avoids dealing with overflows, time zone transitions, etc.

### The Temporal.Now object

We've already shown `Temporal.Now.timeZoneId()`, which gives you the time zone ID of the current environment. You can also get the current time in various forms:

| Method                                        | Type                                 |
| --------------------------------------------- | ------------------------------------ |
| `Temporal.Now.instant()`          | `Temporal.Instant`       |
| `Temporal.Now.zonedDateTimeISO()` | `Temporal.ZonedDateTime` |
| `Temporal.Now.plainDateTimeISO()` | `Temporal.PlainDateTime` |
| `Temporal.Now.plainDateISO()`     | `Temporal.PlainDate`     |
| `Temporal.Now.plainTimeISO()`     | `Temporal.PlainTime`     |

For example, you can get the current time in Paris, regardless of what time zone your system is in:

```js
const parisNow = Temporal.Now.zonedDateTimeISO("Europe/Paris");
```

## The legacy Date object

> **Note:**
> The `Date` object is now considered legacy and should be avoided in new code. This section is purely for those working with legacy code.

To create a `Date` object:

```js
const dateObjectName = new Date();
```

You can pass <example-value> of various types:

- Nothing: creates today's date and time. For example, `today = new Date();`.
- A string representing a date, in many different forms. The exact forms supported differ among engines, but the following form is always supported: `YYYY-MM-DDTHH:mm:ss.sssZ`. For example, `xmas95 = new Date("1995-12-25")`. If you omit hours, minutes, or seconds, the value will be set to zero.
- A set of integer values for year, month, and day. For example, `xmas95 = new Date(1995, 11, 25)`.
- A set of integer values for year, month, day, hour, minute, and seconds. For example, `xmas95 = new Date(1995, 11, 25, 9, 30, 0);`.

The `Date` object is similar to a `Temporal.ZonedDateTime` object, storing a millisecond epoch offset with the ISO 8601 calendar assumed. It represents the same instant in UTC and the local time zone. Methods for handling dates and times fall into these broad categories:

- "set" methods, for setting date and time values in `Date` objects.
- "get" methods, for getting date and time values from `Date` objects.
- "to" methods, for returning string values from `Date` objects.
- parse and UTC methods, for parsing `Date` strings.

For example, suppose you define the following date:

```js
const xmas95 = new Date("1995-12-25");
```

Then `xmas95.getMonth()` returns 11, and `xmas95.getFullYear()` returns 1995.

The `getTime` and `setTime` methods are useful for comparing dates. The `getTime` method returns the number of milliseconds since the epoch for a `Date` object.

For example, the following code displays the number of days left in the current year:

```js
const today = new Date();
const endYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);
const msPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds per day
let daysLeft = (endYear.getTime() - today.getTime()) / msPerDay;
daysLeft = Math.round(daysLeft); // Returns days left in the year
```

This example creates a `Date` object named `today` that contains today's date. It then creates a `Date` object named `endYear` representing the end of the current year. Then, using the number of milliseconds per day, it computes the number of days between `today` and `endYear`, using `getTime` and rounding to a whole number of days.

The `parse` method is useful for assigning values from date strings to existing `Date` objects. For example, the following code uses `parse` and `setTime` to assign a date value to the `ipoDate` object:

```js
const ipoDate = new Date();
ipoDate.setTime(Date.parse("Aug 9, 1995"));
```

There are many undesirable aspects of `Date` that led to it being abandoned. For example, `Date` objects are mutable; the string format accepted by the constructor and `Date.parse()` can't be standardized; it doesn't accept other fixed time zones, etc. The `Temporal` object is built from the ground up and represents standard industry practices for handling dates. Use `Temporal`, and install a polyfill if your environment doesn't support it.

## Cookbook

You can find snippets for handling common use cases in our Temporal cookbook.
