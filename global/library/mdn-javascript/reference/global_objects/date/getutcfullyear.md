---
title: "Date.prototype.getUTCFullYear()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/getutcfullyear/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date.prototype.getUTCFullYear()

The **`getUTCFullYear()`** method of `Date` instances returns the year for this date according to universal time.

```js
const date1 = new Date("December 31, 1975, 23:15:30 GMT+11:00");
const date2 = new Date("December 31, 1975, 23:15:30 GMT-11:00");

console.log(date1.getUTCFullYear());
// Expected output: 1975

console.log(date2.getUTCFullYear());
// Expected output: 1976
```

## Syntax

```js
getUTCFullYear()
```

### Parameters

None.

### Return value

An integer representing the year for the given date according to universal time. Returns `NaN` if the date is invalid.

## Description

Unlike `getYear()`, the value returned by `getUTCFullYear()` is an absolute number. For dates between the years 1000 and 9999, `getFullYear()` returns a four-digit number, for example, 1995. Use this function to make sure a year is compliant with years after 2000.

## Examples

### Using getUTCFullYear()

The following example assigns the four-digit value of the current year to the variable `year`.

```js
const today = new Date();
const year = today.getUTCFullYear();
```

## See also

- `Date.prototype.getFullYear()`
- `Date.prototype.setFullYear()`
