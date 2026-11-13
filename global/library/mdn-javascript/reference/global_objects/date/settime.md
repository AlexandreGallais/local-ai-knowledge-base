---
title: "Date.prototype.setTime()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/settime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date.prototype.setTime()

The **`setTime()`** method of `Date` instances changes the timestamp for this date, which is the number of milliseconds since the epoch, defined as the midnight at the beginning of January 1, 1970, UTC.

```js
const launchDate = new Date("July 1, 1999, 12:00:00");
const futureDate = new Date();
futureDate.setTime(launchDate.getTime());

console.log(futureDate);
// Expected output: "Thu Jul 01 1999 12:00:00 GMT+0200 (CEST)"

const fiveMinutesInMs = 5 * 60 * 1000;
futureDate.setTime(futureDate.getTime() + fiveMinutesInMs);

console.log(futureDate);
// Expected output: "Thu Jul 01 1999 12:05:00 GMT+0200 (CEST)"
// Note: your timezone may vary
```

## Syntax

```js
setTime(timeValue)
```

### Parameters

- `timeValue`
    An integer representing the new timestamp — the number of milliseconds since the midnight at the beginning of January 1, 1970, UTC.

### Return value

Changes the `Date` object in place, and returns its new timestamp. If `timeValue` is `NaN` (or other values that get coerced to `NaN`, such as `undefined`), the date is set to Invalid Date and `NaN` is returned.

## Examples

### Using setTime()

```js
const theBigDay = new Date("1999-07-01");
const sameAsBigDay = new Date();
sameAsBigDay.setTime(theBigDay.getTime());
```

## See also

- `Date.prototype.getTime()`
- `Date.prototype.setUTCHours()`
