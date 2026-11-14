---
title: "Date (part 2 of 2)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date (part 2 of 2)

## Instance methods

- `Date.prototype.getDate()`
    Returns the day of the month (`1` – `31`) for the specified date according to local time.
- `Date.prototype.getDay()`
    Returns the day of the week (`0` – `6`) for the specified date according to local time.
- `Date.prototype.getFullYear()`
    Returns the year (4 digits for 4-digit years) of the specified date according to local time.
- `Date.prototype.getHours()`
    Returns the hour (`0` – `23`) in the specified date according to local time.
- `Date.prototype.getMilliseconds()`
    Returns the milliseconds (`0` – `999`) in the specified date according to local time.
- `Date.prototype.getMinutes()`
    Returns the minutes (`0` – `59`) in the specified date according to local time.
- `Date.prototype.getMonth()`
    Returns the month (`0` – `11`) in the specified date according to local time.
- `Date.prototype.getSeconds()`
    Returns the seconds (`0` – `59`) in the specified date according to local time.
- `Date.prototype.getTime()`
    Returns the numeric value of the specified date as the number of milliseconds since January 1, 1970 00:00:00 UTC. (Negative values are returned for prior times.)
- `Date.prototype.getTimezoneOffset()`
    Returns the time-zone offset in minutes for the current locale.
- `Date.prototype.getUTCDate()`
    Returns the day (date) of the month (`1` – `31`) in the specified date according to universal time.
- `Date.prototype.getUTCDay()`
    Returns the day of the week (`0` – `6`) in the specified date according to universal time.
- `Date.prototype.getUTCFullYear()`
    Returns the year (4 digits for 4-digit years) in the specified date according to universal time.
- `Date.prototype.getUTCHours()`
    Returns the hours (`0` – `23`) in the specified date according to universal time.
- `Date.prototype.getUTCMilliseconds()`
    Returns the milliseconds (`0` – `999`) in the specified date according to universal time.
- `Date.prototype.getUTCMinutes()`
    Returns the minutes (`0` – `59`) in the specified date according to universal time.
- `Date.prototype.getUTCMonth()`
    Returns the month (`0` – `11`) in the specified date according to universal time.
- `Date.prototype.getUTCSeconds()`
    Returns the seconds (`0` – `59`) in the specified date according to universal time.
- `Date.prototype.getYear()` (deprecated)
    Returns the year (usually 2–3 digits) in the specified date according to local time. Use `getFullYear()` instead.
- `Date.prototype.setDate()`
    Sets the day of the month for a specified date according to local time.
- `Date.prototype.setFullYear()`
    Sets the full year (e.g., 4 digits for 4-digit years) for a specified date according to local time.
- `Date.prototype.setHours()`
    Sets the hours for a specified date according to local time.
- `Date.prototype.setMilliseconds()`
    Sets the milliseconds for a specified date according to local time.
- `Date.prototype.setMinutes()`
    Sets the minutes for a specified date according to local time.
- `Date.prototype.setMonth()`
    Sets the month for a specified date according to local time.
- `Date.prototype.setSeconds()`
    Sets the seconds for a specified date according to local time.
- `Date.prototype.setTime()`
    Sets the `Date` object to the time represented by the number of milliseconds since January 1, 1970 00:00:00 UTC. Use negative numbers for times prior.
- `Date.prototype.setUTCDate()`
    Sets the day of the month for a specified date according to universal time.
- `Date.prototype.setUTCFullYear()`
    Sets the full year (e.g., 4 digits for 4-digit years) for a specified date according to universal time.
- `Date.prototype.setUTCHours()`
    Sets the hour for a specified date according to universal time.
- `Date.prototype.setUTCMilliseconds()`
    Sets the milliseconds for a specified date according to universal time.
- `Date.prototype.setUTCMinutes()`
    Sets the minutes for a specified date according to universal time.
- `Date.prototype.setUTCMonth()`
    Sets the month for a specified date according to universal time.
- `Date.prototype.setUTCSeconds()`
    Sets the seconds for a specified date according to universal time.
- `Date.prototype.setYear()` (deprecated)
    Sets the year (usually 2–3 digits) for a specified date according to local time. Use `setFullYear()` instead.
- `Date.prototype.toDateString()`
    Returns the "date" portion of the `Date` as a human-readable string like `'Thu Apr 12 2018'`.
- `Date.prototype.toISOString()`
    Converts a date to a string following the ISO 8601 Extended Format.
- `Date.prototype.toJSON()`
    Returns a string representing the `Date` using `toISOString()`. Intended to be implicitly called by `JSON.stringify()`.
- `Date.prototype.toLocaleDateString()`
    Returns a string with a locality sensitive representation of the date portion of this date based on system settings.
- `Date.prototype.toLocaleString()`
    Returns a string with a locality-sensitive representation of this date. Overrides the `Object.prototype.toLocaleString()` method.
- `Date.prototype.toLocaleTimeString()`
    Returns a string with a locality-sensitive representation of the time portion of this date, based on system settings.
- `Date.prototype.toString()`
    Returns a string representing the specified `Date` object. Overrides the `Object.prototype.toString()` method.
- `Date.prototype.toTemporalInstant()`
    Returns a new `Temporal.Instant` object with the same `epochMilliseconds` value as this date's timestamp.
- `Date.prototype.toTimeString()`
    Returns the "time" portion of the `Date` as a human-readable string.
- `Date.prototype.toUTCString()`
    Converts a date to a string using the UTC timezone.
- `Date.prototype.valueOf()`
    Returns the primitive value of a `Date` object. Overrides the `Object.prototype.valueOf()` method.
- `Date.prototype[Symbol.toPrimitive]()`
    Converts this `Date` object to a primitive value.

## Examples

### Several ways to create a Date object

The following examples show several ways to create JavaScript dates:

> **Note:**
> Creating a date from a string has a lot of behavior inconsistencies. See date time string format for caveats on using different formats.

```js
const today = new Date();
const birthday = new Date("December 17, 1995 03:24:00"); // DISCOURAGED: may not work in all runtimes
const birthday2 = new Date("1995-12-17T03:24:00"); // This is standardized and will work reliably
const birthday3 = new Date(1995, 11, 17); // the month is 0-indexed
const birthday4 = new Date(1995, 11, 17, 3, 24, 0);
const birthday5 = new Date(628021800000); // passing epoch timestamp
```

### Formats of toString method return values

```js
const date = new Date("2020-05-12T23:50:21.817Z");
date.toString(); // Tue May 12 2020 18:50:21 GMT-0500 (Central Daylight Time)
date.toDateString(); // Tue May 12 2020
date.toTimeString(); // 18:50:21 GMT-0500 (Central Daylight Time)
date[Symbol.toPrimitive]("string"); // Tue May 12 2020 18:50:21 GMT-0500 (Central Daylight Time)

date.toISOString(); // 2020-05-12T23:50:21.817Z
date.toJSON(); // 2020-05-12T23:50:21.817Z

date.toUTCString(); // Tue, 12 May 2020 23:50:21 GMT

date.toLocaleString(); // 5/12/2020, 6:50:21 PM
date.toLocaleDateString(); // 5/12/2020
date.toLocaleTimeString(); // 6:50:21 PM
```

### To get Date, Month and Year or Time

```js
const date = new Date("2000-01-17T16:45:30");
const [month, day, year] = [
  date.getMonth(),
  date.getDate(),
  date.getFullYear(),
];
// [0, 17, 2000] as month are 0-indexed
const [hour, minutes, seconds] = [
  date.getHours(),
  date.getMinutes(),
  date.getSeconds(),
];
// [16, 45, 30]
```

### Interpretation of two-digit years

`new Date()` exhibits legacy undesirable, inconsistent behavior with two-digit year values; specifically, when a `new Date()` call is given a two-digit year value, that year value does not get treated as a literal year and used as-is but instead gets interpreted as a relative offset — in some cases as an offset from the year `1900`, but in other cases, as an offset from the year `2000`.

```js
let date = new Date(98, 1); // Sun Feb 01 1998 00:00:00 GMT+0000 (GMT)
date = new Date(22, 1); // Wed Feb 01 1922 00:00:00 GMT+0000 (GMT)
date = new Date("2/1/22"); // Tue Feb 01 2022 00:00:00 GMT+0000 (GMT)

// Legacy method; always interprets two-digit year values as relative to 1900
date.setYear(98);
date.toString(); // Sun Feb 01 1998 00:00:00 GMT+0000 (GMT)
date.setYear(22);
date.toString(); // Wed Feb 01 1922 00:00:00 GMT+0000 (GMT)
```

So, to create and get dates between the years `0` and `99`, instead use the preferred `setFullYear()` and `getFullYear()` methods:.

```js
// Preferred method; never interprets any value as being a relative offset,
// but instead uses the year value as-is
date.setFullYear(98);
date.getFullYear(); // 98 (not 1998)
date.setFullYear(22);
date.getFullYear(); // 22 (not 1922, not 2022)
```

### Calculating elapsed time

The following examples show how to determine the elapsed time between two JavaScript dates in milliseconds.

Due to the differing lengths of days (due to daylight saving changeover), months, and years, expressing elapsed time in units greater than hours, minutes, and seconds requires addressing a number of issues, and should be thoroughly researched before being attempted.

```js
// Using Date objects
const start = Date.now();

// The event to time goes here:
doSomethingForALongTime();
const end = Date.now();
const elapsed = end - start; // elapsed time in milliseconds
```

```js
// Using built-in methods
const start = new Date();

// The event to time goes here:
doSomethingForALongTime();
const end = new Date();
const elapsed = end.getTime() - start.getTime(); // elapsed time in milliseconds
```

```js
// To test a function and get back its return
function printElapsedTime(testFn) {
  const startTime = Date.now();
  const result = testFn();
  const endTime = Date.now();

  console.log(`Elapsed time: ${String(endTime - startTime)} milliseconds`);
  return result;
}

const yourFunctionReturn = printElapsedTime(yourFunction);
```

> **Note:**
> In browsers that support the `Performance API`'s high-resolution time feature, `Performance.now()` can provide more reliable and precise measurements of elapsed time than `Date.now()`.

### Get the number of seconds since the ECMAScript Epoch

```js
const seconds = Math.floor(Date.now() / 1000);
```

In this case, it's important to return only an integer—so a simple division won't do. It's also important to only return actually elapsed seconds. (That's why this code uses `Math.floor()`, and _not_ `Math.round()`.)

## See also

- `Date()`
