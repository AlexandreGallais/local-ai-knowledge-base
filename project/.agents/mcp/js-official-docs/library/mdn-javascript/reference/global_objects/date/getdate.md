---
title: "Date.prototype.getDate()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/getdate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date.prototype.getDate()

The **`getDate()`** method of `Date` instances returns the day of the month for this date according to local time.

```js
const birthday = new Date("August 19, 1975 23:15:30");
const date = birthday.getDate();

console.log(date);
// Expected output: 19
```

## Syntax

```js
getDate()
```

### Parameters

None.

### Return value

An integer, between 1 and 31, representing the day of the month for the given date according to local time. Returns `NaN` if the date is invalid.

## Examples

### Using getDate()

The `day` variable has value `25`, based on the value of the `Date` object `xmas95`.

```js
const xmas95 = new Date("1995-12-25T23:15:30");
const day = xmas95.getDate();

console.log(day); // 25
```

## See also

- `Date.prototype.getUTCDate()`
- `Date.prototype.getUTCDay()`
- `Date.prototype.setDate()`
