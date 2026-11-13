---
title: "Date.prototype.getUTCMonth()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/getutcmonth/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date.prototype.getUTCMonth()

The **`getUTCMonth()`** method of `Date` instances returns the month for this date according to universal time, as a zero-based value (where zero indicates the first month of the year).

```js
const date1 = new Date("December 31, 1975, 23:15:30 GMT+11:00");
const date2 = new Date("December 31, 1975, 23:15:30 GMT-11:00");

// December
console.log(date1.getUTCMonth());
// Expected output: 11

// January
console.log(date2.getUTCMonth());
// Expected output: 0
```

## Syntax

```js
getUTCMonth()
```

### Parameters

None.

### Return value

An integer, between 0 and 11, representing the month for the given date according to universal time: 0 for January, 1 for February, and so on. Returns `NaN` if the date is invalid.

## Examples

### Using getUTCMonth()

The following example assigns the month portion of the current date to the variable `month`.

```js
const today = new Date();
const month = today.getUTCMonth();
```

## See also

- `Date.prototype.getMonth()`
- `Date.prototype.setUTCMonth()`
