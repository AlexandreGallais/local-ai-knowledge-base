---
title: "Date.prototype.getDay()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/getday/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date.prototype.getDay()

The **`getDay()`** method of `Date` instances returns the day of the week for this date according to local time, where 0 represents Sunday. For the day of the month, see `Date.prototype.getDate()`.

```js
const birthday = new Date("August 19, 1975 23:15:30");
const day1 = birthday.getDay();
// Sunday - Saturday : 0 - 6

console.log(day1);
// Expected output: 2
```

## Syntax

```js
getDay()
```

### Parameters

None.

### Return value

An integer, between 0 and 6, representing the day of the week for the given date according to local time: 0 for Sunday, 1 for Monday, 2 for Tuesday, and so on. Returns `NaN` if the date is invalid.

## Description

The return value of `getDay()` is zero-based, which is useful for indexing into arrays of days, for example:

```js
const valentines = new Date("1995-02-14");
const day = valentines.getDay();
const dayNames = ["Sunday", "Monday", "Tuesday" /* , … */];

console.log(dayNames[day]); // "Monday"
```

However, for the purpose of internationalization, you should prefer using `Intl.DateTimeFormat` with the `options` parameter instead.

```js
const options = { weekday: "long" };
console.log(new Intl.DateTimeFormat("en-US", options).format(valentines));
// "Monday"
console.log(new Intl.DateTimeFormat("de-DE", options).format(valentines));
// "Montag"
```

## Examples

### Using getDay()

The `weekday` variable has value `1`, based on the value of the `Date` object `xmas95`, because December 25, 1995 is a Monday.

```js
const xmas95 = new Date("1995-12-25T23:15:30");
const weekday = xmas95.getDay();

console.log(weekday); // 1
```

## See also

- `Date.prototype.getUTCDate()`
- `Date.prototype.getUTCDay()`
- `Date.prototype.setDate()`
