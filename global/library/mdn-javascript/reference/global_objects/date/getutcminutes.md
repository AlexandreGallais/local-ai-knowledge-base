---
title: "Date.prototype.getUTCMinutes()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/getutcminutes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date.prototype.getUTCMinutes()

The **`getUTCMinutes()`** method of `Date` instances returns the minutes for this date according to universal time.

```js
const date1 = new Date("1 January 2000 03:15:30 GMT+07:00");
const date2 = new Date("1 January 2000 03:15:30 GMT+03:30");

console.log(date1.getUTCMinutes()); // 31 Dec 1999 20:15:30 GMT
// Expected output: 15

console.log(date2.getUTCMinutes()); // 31 Dec 1999 23:45:30 GMT
// Expected output: 45
```

## Syntax

```js
getUTCMinutes()
```

### Parameters

None.

### Return value

An integer, between 0 and 59, representing the minutes for the given date according to universal time. Returns `NaN` if the date is invalid.

## Examples

### Using getUTCMinutes()

The following example assigns the minutes portion of the current time to the variable `minutes`.

```js
const today = new Date();
const minutes = today.getUTCMinutes();
```

## See also

- `Date.prototype.getMinutes()`
- `Date.prototype.setUTCMinutes()`
