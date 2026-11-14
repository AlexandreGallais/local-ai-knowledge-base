---
title: "Date.prototype.getUTCHours()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/getutchours/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date.prototype.getUTCHours()

The **`getUTCHours()`** method of `Date` instances returns the hours for this date according to universal time.

```js
const date1 = new Date("December 31, 1975, 23:15:30 GMT+11:00");
const date2 = new Date("December 31, 1975, 23:15:30 GMT-11:00");

console.log(date1.getUTCHours());
// Expected output: 12

console.log(date2.getUTCHours());
// Expected output: 10
```

## Syntax

```js
getUTCHours()
```

### Parameters

None.

### Return value

An integer, between 0 and 23, representing the hours for the given date according to universal time. Returns `NaN` if the date is invalid.

## Examples

### Using getUTCHours()

The following example assigns the hours portion of the current time to the variable `hours`.

```js
const today = new Date();
const hours = today.getUTCHours();
```

## See also

- `Date.prototype.getHours()`
- `Date.prototype.setUTCHours()`
