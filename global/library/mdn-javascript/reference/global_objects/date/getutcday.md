---
title: "Date.prototype.getUTCDay()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/getutcday/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date.prototype.getUTCDay()

The **`getUTCDay()`** method of `Date` instances returns the day of the week for this date according to universal time, where 0 represents Sunday.

```js
const date1 = new Date("August 19, 1975 23:15:30 GMT+11:00");
const date2 = new Date("August 19, 1975 23:15:30 GMT-11:00");

// Tuesday
console.log(date1.getUTCDay());
// Expected output: 2

// Wednesday
console.log(date2.getUTCDay());
// Expected output: 3
```

## Syntax

```js
getUTCDay()
```

### Parameters

None.

### Return value

An integer corresponding to the day of the week for the given date according to universal time: 0 for Sunday, 1 for Monday, 2 for Tuesday, and so on. Returns `NaN` if the date is invalid.

## Examples

### Using getUTCDay()

The following example assigns the weekday portion of the current date to the variable `weekday`.

```js
const today = new Date();
const weekday = today.getUTCDay();
```

## See also

- `Date.prototype.getUTCDate()`
- `Date.prototype.getDay()`
- `Date.prototype.setUTCDate()`
