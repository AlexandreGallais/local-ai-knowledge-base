---
title: "Temporal cookbook (part 1 of 4)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/representing_dates_times/cookbook/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal cookbook

> **Note:**
> This document is based on the Cookbook in the original TC39 proposal docs.

This guide provides snippets for common use cases of `Temporal`. Read the Representing dates & times guide first to understand the fundamental concepts and API surface of `Temporal`, if needed.

## Current date and time

```js
const date = Temporal.Now.plainDateISO(); // Gets the current date
date.toString(); // returns the date in ISO 8601 date format

// If you additionally want the time:
Temporal.Now.plainDateTimeISO().toString(); // date and time in ISO 8601 format
```

Note that if you just want the date and not the time, you should use `Temporal.PlainDate`. If you want both, use `Temporal.PlainDateTime`.

## Unix timestamp

```js
const timeStamp = Temporal.Now.instant();

// Timestamp in milliseconds
timeStamp.epochMilliseconds;

// Timestamp in seconds
Math.floor(timeStamp.epochMilliseconds / 1000);
```

## Converting between Temporal types and legacy Date

### Legacy Date to Temporal.Instant and/or Temporal.ZonedDateTime

Here's how to convert legacy `Date` into a `Temporal.Instant` or `Temporal.ZonedDateTime` instance corresponding to the same instant in exact time.

If you need a `ZonedDateTime`, use the `toZonedDateTimeISO()` method of the resulting `Instant`. You will need to specify a time zone, because legacy `Date` only stores an exact time, and does not store a time zone.

When calling methods on a legacy `Date` instance, you must decide whether you want that exact time interpreted as a UTC value (using methods containing "UTC" in their names) or in the current system time zone (using other methods). This is confusing, so `Temporal` has a more explicit way to do this.

To use the system's local time zone, which corresponds to using legacy `Date`'s `getFullYear()`, `getMonth()`, etc. methods, pass `Temporal.Now.timeZoneId()` as the time zone. In a browser, this will be the user's time zone, but on a server the value may not be what you expect, so avoid doing this in a server context.

```js
const legacyDate = new Date("1970-01-01T00:00:01Z");
const instant = legacyDate.toTemporalInstant();

console.log(instant.epochMilliseconds === legacyDate.getTime()); // true
console.log(instant.toString()); // '1970-01-01T00:00:01Z'

const zoned = instant.toZonedDateTimeISO(Temporal.Now.timeZoneId());

console.log(zoned.epochMilliseconds === legacyDate.getTime()); // true
```

Here's an example of using a particular time zone. Especially in a server context, you would be getting this time zone from elsewhere in the data that you are processing. If the legacy `Date` instance was accessed using the `getUTCFullYear()`, `getUTCMonth()`, etc. methods, consider just using `Instant`. If you have to use `ZonedDateTime`, the specific time zone may need to be `"UTC"`.

```js
const zoned2 = instant.toZonedDateTimeISO("Asia/Shanghai");

console.log(zoned2.epochMilliseconds === legacyDate.getTime()); // true
console.log(zoned2.timeZoneId); // 'Asia/Shanghai'
```

### Date-only values: legacy Date to Temporal.PlainDate

A common bug arises from a simple question: what date (year, month, and day) is represented by this `Date`? The problem: the answer depends on the time zone. The same `Date` can be December 31 in San Francisco but January 1 in London or Tokyo.

Therefore, it's critical to interpret the `Date` in context of the correct time zone _before_ trying to extract the year, month, or day, or before doing calculations like "did this happen yesterday?" involving date units. For this reason, `Temporal.Instant` (which is the `Temporal` equivalent of `Date`) does not have `year`, `month`, `day` properties. To access date or time units in `Temporal`, a time zone must be provided, as described in the code example above.

Another bug-prone case is when `Date` is (ab)used to store a date-only value, like a user's date of birth. With `Date` these values are typically stored with midnight times, but to read back the date correctly you need to know which time zone's midnight was used to create the `Date`. For example, `new Date(2000, 0, 1)` uses the caller's time zone, while `new Date("2000-01-01")` uses UTC.

To correctly convert a date-only `Date` to a `Temporal.PlainDate` without being vulnerable to off-by-one-day bugs, you must determine which time zone's midnight was used to construct the `Date`, and then use that same time zone when converting from `Temporal.Instant` to `Temporal.PlainDate`.

```js
// Convert a year/month/day `Date` to a `Temporal.PlainDate`. Uses the caller's time zone.
let date = new Date(2000, 0, 1);
// Sat Jan 01 2000 00:00:00 GMT-0800 (Pacific Standard Time)
let plainDate = date
  .toTemporalInstant() // 2000-01-01T08:00:00Z
  .toZonedDateTimeISO(Temporal.Now.timeZoneId()) // 2000-01-01T00:00:00-08:00[America/Los_Angeles]
  .toPlainDate(); // 2000-01-01

console.log(plainDate.toString()); // '2000-01-01'

// Convert a year/month/day `Date` to a `Temporal.PlainDate`. Uses UTC.
date = new Date(Date.UTC(2000, 0, 1));
// Fri Dec 31 1999 16:00:00 GMT-0800 (Pacific Standard Time)
date = new Date("2000-01-01T00:00Z");
// Fri Dec 31 1999 16:00:00 GMT-0800 (Pacific Standard Time)
plainDate = date
  .toTemporalInstant() // 2000-01-01T00:00:00Z
  .toZonedDateTimeISO("UTC") // 2000-01-01T00:00:00+00:00[UTC]
  .toPlainDate(); // 2000-01-01

console.log(plainDate.toString()); // '2000-01-01'
```

### Temporal types to legacy Date

Legacy `Date` represents an exact time, so it's straightforward to convert a `Temporal.Instant` or `Temporal.ZonedDateTime` instance into a legacy `Date` instance that corresponds to it. To convert `Instant` to legacy `Date`, use the `epochMilliseconds` property.

```js
const instant = Temporal.Instant.from("2020-01-01T00:00:01.000999Z");
const result = new Date(instant.epochMilliseconds);

console.log(result.getTime()); // 1577836801000 // ms since Unix epoch
console.log(result.toISOString()); // '2020-01-01T00:00:01.000Z'
```

Same thing for `ZonedDateTime`. Note that legacy `Date` will not preserve the `ZonedDateTime`'s time zone.

```js
const zoned = Temporal.ZonedDateTime.from(
  "2020-01-01T00:00:01.001[Asia/Tokyo]",
);
const result2 = new Date(zoned.epochMilliseconds);

console.log(result2.getTime()); // 1577804401001 // note, different time
console.log(result2.toISOString()); // '2019-12-31T15:00:01.001Z'
```

For most use cases, `new Date(x.epochMilliseconds)` is fine. You may need to add an extra `round()` step if you want other rounding behavior than truncation. For example, here the 999 microseconds is rounded to 1 millisecond.

```js
const result3 = new Date(
  instant.round({ smallestUnit: "millisecond" }).epochMilliseconds,
);

console.log(result3.getTime()); // 1577836801001
console.log(result3.toISOString()); // '2020-01-01T00:00:01.001Z'
```

## Construction

### Calendar input element

You can use `Temporal` objects to set properties on a calendar control. Here is an example using an HTML `` element with any day beyond "today" disabled and not selectable.

(To get a `Temporal` object back out of the calendar control, see the Future Date example.)

```html
<input type="date" id="calendar-input" />
```

```js
const datePicker = document.getElementById("calendar-input");
const today = Temporal.Now.plainDateISO();
datePicker.max = today;
datePicker.value = today;
```

## Converting between types

### Noon on a particular date

An example of combining a calendar date (`Temporal.PlainDate`) and a wall-clock time (`Temporal.PlainTime`) into a `Temporal.PlainDateTime`.

```js
const date = Temporal.PlainDate.from("2020-05-14");

const noonOnDate = date.toPlainDateTime(Temporal.PlainTime.from({ hour: 12 }));

console.log(noonOnDate.toString()); // '2020-05-14T12:00:00'
```

### Birthday in 2030

An example of combining a day on the calendar (`Temporal.PlainMonthDay`) and a year into a `Temporal.PlainDate`.

```js
const birthday = Temporal.PlainMonthDay.from("12-15");

const birthdayIn2030 = birthday.toPlainDate({ year: 2030 });
birthdayIn2030.dayOfWeek; // 7

console.log(birthdayIn2030.toString()); // '2030-12-15'
```

## Serialization

### Zoned instant from instant and time zone

To serialize an exact-time `Temporal.Instant` into a string, use `toString()`. Without any arguments, this gives you a string in UTC time.

```js
const instant = Temporal.Instant.from("2020-01-03T10:41:51Z");

const result = instant.toString();

console.log(result); // '2020-01-03T10:41:51Z'
console.log(instant.equals(Temporal.Instant.from(result))); // true
```

If you need your string to include a UTC offset, then use the `timeZone` option of `Temporal.Instant.prototype.toString()` which will return a string serialization of the wall-clock time in that time zone corresponding to the exact time.

```js
const result2 = instant.toString({ timeZone: "America/Yellowknife" });

console.log(result2); // '2020-01-03T03:41:51-07:00'
console.log(instant.equals(Temporal.Instant.from(result2))); // true
```

This loses the information about which time zone the string was in, because it only preserves the UTC offset from the time zone at that particular exact time. If you need your string to include the time zone name, use `Temporal.ZonedDateTime` instead, which retains this information.

```js
const zoned = instant.toZonedDateTimeISO("Asia/Seoul");
const result3 = zoned.toString();

console.log(result3); // '2020-01-03T19:41:51+09:00[Asia/Seoul]'
console.log(instant.equals(Temporal.Instant.from(result3))); // true
console.log(zoned.equals(Temporal.ZonedDateTime.from(result3))); // true
```

## Sorting

Each `Temporal` type except `Temporal.PlainMonthDay` has a `compare()` static method, which can be passed to `Array.prototype.sort()` as the compare function in order to sort an array of `Temporal` types.

### Sort PlainDateTime values

Sort a list of `Temporal.PlainDateTime`s, for example in order to get a conference schedule in the correct order. Sorting other `Temporal` types would work exactly the same way. The following function returns a sorted copy of the array, with an optional `reverse` argument for descending order.

```js
function getSortedLocalDateTimes(dateTimes, reverse = false) {
  let newDateTimes = Array.from(dateTimes).sort(Temporal.PlainDateTime.compare);

  return reverse ? newDateTimes.reverse() : newDateTimes;
}

// Sorting some conferences without timezones for example vue.js Amsterdam 2020
const a = Temporal.PlainDateTime.from({
  year: 2020,
  day: 20,
  month: 2,
  hour: 8,
  minute: 45,
}); // Introduction
const b = Temporal.PlainDateTime.from({
  year: 2020,
  day: 21,
  month: 2,
  hour: 13,
  minute: 10,
}); // Lunch Break
const c = Temporal.PlainDateTime.from({
  year: 2020,
  day: 20,
  month: 2,
  hour: 15,
  minute: 30,
}); // Coffee Break
const results = getSortedLocalDateTimes([a, b, c]);
console.log(results.map((x) => x.toString()));
// ['2020-02-20T08:45:00', '2020-02-20T15:30:00', '2020-02-21T13:10:00']
```

### Sort ISO date/time strings

Sort a list of ISO 8601 or RFC 9557 date/time strings, for example to place log entries in order. The following function takes an array of strings parseable as `Temporal.Instant` values and returns a copy sorted by exact time, with an optional `reverse` argument for descending order.

```js
function sortInstantStrings(strings, reverse = false) {
  const sortedInstants = strings
    .map((v) => [v, Temporal.Instant.from(v)])
    .sort(([, i1], [, i2]) => Temporal.Instant.compare(i1, i2))
    .map(([str]) => str);

  return reverse ? sortedInstants.reverse() : sortedInstants;
}

// simple string comparison order would not be correct here:
const a = "2020-01-23T17:04:36.491865121-08:00";
const b = "2020-02-10T17:04:36.491865121-08:00";
const c = "2020-04-01T05:01:00-04:00[America/New_York]";
const d = "2020-04-01T10:00:00+01:00[Europe/London]";
const e = "2020-04-01T11:02:00+02:00[Europe/Berlin]";

const results = sortInstantStrings([a, b, c, d, e]);

// results will have correct order
console.log(results);
// [
//   '2020-01-23T17:04:36.491865121-08:00',
//   '2020-02-10T17:04:36.491865121-08:00',
//   '2020-04-01T10:00:00+01:00[Europe/London]',
//   '2020-04-01T05:01:00-04:00[America/New_York]',
//   '2020-04-01T11:02:00+02:00[Europe/Berlin]'
// ]
```

## Rounding

### Round a time down to whole hours

Use the `round()` method of each `Temporal` type if you want to round the time fields. Here's an example of rounding a time _down_ to the previously occurring whole hour:

```js
const time = Temporal.PlainTime.from("12:38:28.138818731");

const wholeHour = time.round({ smallestUnit: "hour", roundingMode: "floor" });

console.log(wholeHour.toString()); // '12:00:00'
```

### Round a date to the nearest start of the month

Rounding is only defined for time fields. Rounding a date field can be ambiguous, so date-only types such as `Temporal.PlainDate` don't have a `round()` method. If you need to round a date to the nearest month, for example, then you must explicitly pick what kind of rounding you want. Here is an example of rounding to the nearest start of a month, rounding up in case of a tie:

```js
const date = Temporal.PlainDate.from("2018-09-16");

const firstOfCurrentMonth = date.with({ day: 1 });
const firstOfNextMonth = firstOfCurrentMonth.add({ months: 1 });

const sinceCurrent = date.since(firstOfCurrentMonth);
const untilNext = date.until(firstOfNextMonth);

const isCloserToNextMonth =
  Temporal.Duration.compare(sinceCurrent, untilNext) >= 0;
const nearestMonth = isCloserToNextMonth
  ? firstOfNextMonth
  : firstOfCurrentMonth;

console.log(nearestMonth.toString()); // '2018-10-01'
```

See also Push back a launch date for an easier way to round up unconditionally to the _next_ start of a month.
