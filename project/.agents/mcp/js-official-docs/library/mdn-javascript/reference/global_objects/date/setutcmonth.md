---
title: "Date.prototype.setUTCMonth()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/setutcmonth/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date.prototype.setUTCMonth()

The **`setUTCMonth()`** method of `Date` instances changes the month and/or day of the month for this date according to universal time.

```js
const event = new Date("December 31, 1975 23:15:30 GMT-3:00");

console.log(event.toUTCString());
// Expected output: "Thu, 01 Jan 1976 02:15:30 GMT"

console.log(event.getUTCMonth());
// Expected output: 0

event.setUTCMonth(11);

console.log(event.toUTCString());
// Expected output: "Wed, 01 Dec 1976 02:15:30 GMT"
```

## Syntax

```js
setUTCMonth(monthValue)
setUTCMonth(monthValue, dateValue)
```

### Parameters

- `monthValue`
    An integer representing the month: 0 for January, 1 for February, and so on.
- `dateValue` (optional)
    An integer from 1 to 31 representing the day of the month.

### Return value

Changes the `Date` object in place, and returns its new timestamp. If a parameter is `NaN` (or other values that get coerced to `NaN`, such as `undefined`), the date is set to Invalid Date and `NaN` is returned.

## Description

If you do not specify the `dateValue` parameter, the value returned from the
`getUTCDate()` method is used.

If a parameter you specify is outside of the expected range, `setUTCMonth()`
attempts to update the date information in the `Date` object accordingly.
For example, if you use 15 for `monthValue`, the year will be incremented by
1, and 3 will be used for month.

## Examples

### Using setUTCMonth()

```js
const theBigDay = new Date();
theBigDay.setUTCMonth(11);
```

## See also

- `Date.prototype.getUTCMonth()`
- `Date.prototype.setMonth()`
