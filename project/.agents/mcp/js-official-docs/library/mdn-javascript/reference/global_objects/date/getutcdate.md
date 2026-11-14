---
title: "Date.prototype.getUTCDate()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/getutcdate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date.prototype.getUTCDate()

The **`getUTCDate()`** method of `Date` instances returns the day of the month for this date according to universal time.

```js
const date1 = new Date("August 19, 1975 23:15:30 GMT+11:00");
const date2 = new Date("August 19, 1975 23:15:30 GMT-11:00");

console.log(date1.getUTCDate());
// Expected output: 19

console.log(date2.getUTCDate());
// Expected output: 20
```

## Syntax

```js
getUTCDate()
```

### Parameters

None.

### Return value

An integer, between 1 and 31, representing day of month for the given date according to universal time. Returns `NaN` if the date is invalid.

## Examples

### Using getUTCDate()

The following example assigns the day of month of the current date to the variable `dayOfMonth`.

```js
const today = new Date();
const dayOfMonth = today.getUTCDate();
```

## See also

- `Date.prototype.getUTCDay()`
- `Date.prototype.getDay()`
- `Date.prototype.setUTCDate()`
