---
title: "Date.prototype.getMonth()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/getmonth/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date.prototype.getMonth()

The **`getMonth()`** method of `Date` instances returns the month for this date according to local time, as a zero-based value (where zero indicates the first month of the year).

```js
const moonLanding = new Date("July 20, 69 00:20:18");

console.log(moonLanding.getMonth()); // (January gives 0)
// Expected output: 6
```

## Syntax

```js
getMonth()
```

### Parameters

None.

### Return value

An integer, between 0 and 11, representing the month for the given date according to local time: 0 for January, 1 for February, and so on. Returns `NaN` if the date is invalid.

## Description

The return value of `getMonth()` is zero-based, which is useful for indexing into arrays of months, for example:

```js
const valentines = new Date("1995-02-14");
const month = valentines.getMonth();
const monthNames = ["January", "February", "March" /* , … */];

console.log(monthNames[month]); // "February"
```

However, for the purpose of internationalization, you should prefer using `Intl.DateTimeFormat` with the `options` parameter instead.

```js
const options = { month: "long" };
console.log(new Intl.DateTimeFormat("en-US", options).format(valentines));
// "February"
console.log(new Intl.DateTimeFormat("de-DE", options).format(valentines));
// "Februar"
```

## Examples

### Using getMonth()

The `month` variable has value `11`, based on the value of the `Date` object `xmas95`.

```js
const xmas95 = new Date("1995-12-25T23:15:30");
const month = xmas95.getMonth();

console.log(month); // 11
```

## See also

- `Date.prototype.getUTCMonth()`
- `Date.prototype.setMonth()`
