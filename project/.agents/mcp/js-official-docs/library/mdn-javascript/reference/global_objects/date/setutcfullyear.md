---
title: "Date.prototype.setUTCFullYear()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/setutcfullyear/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date.prototype.setUTCFullYear()

The **`setUTCFullYear()`** method of `Date` instances changes the year for this date according to universal time.

```js
const event = new Date("December 31, 1975 23:15:30 GMT-3:00");

console.log(event.getUTCFullYear());
// Expected output: 1976

console.log(event.toUTCString());
// Expected output: "Thu, 01 Jan 1976 02:15:30 GMT"

event.setUTCFullYear(1975);

console.log(event.toUTCString());
// Expected output: "Wed, 01 Jan 1975 02:15:30 GMT"
```

## Syntax

```js
setUTCFullYear(yearValue)
setUTCFullYear(yearValue, monthValue)
setUTCFullYear(yearValue, monthValue, dateValue)
```

### Parameters

- `yearValue`
    An integer representing the year. For example, 1995.
- `monthValue` (optional)
    An integer representing the month: 0 for January, 1 for February, and so on.
- `dateValue` (optional)
    An integer between 1 and 31 representing the day of the month. If you specify `dateValue`, you must also specify `monthValue`.

### Return value

Changes the `Date` object in place, and returns its new timestamp. If a parameter is `NaN` (or other values that get coerced to `NaN`, such as `undefined`), the date is set to Invalid Date and `NaN` is returned.

## Description

If you do not specify the `monthValue` and
`dateValue` parameters, the values returned from the
`getUTCMonth()` and
`getUTCDate()` methods are used.

If a parameter you specify is outside of the expected range,
`setUTCFullYear()` attempts to update the other parameters and the date
information in the `Date` object accordingly. For example, if you specify 15
for `monthValue`, the year is incremented by 1
(`yearValue + 1`), and 3 is used for the month.

## Examples

### Using setUTCFullYear()

```js
const theBigDay = new Date();
theBigDay.setUTCFullYear(1997);
```

## See also

- `Date.prototype.getUTCFullYear()`
- `Date.prototype.setFullYear()`
