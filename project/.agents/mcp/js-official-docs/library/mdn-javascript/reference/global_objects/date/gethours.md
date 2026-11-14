---
title: "Date.prototype.getHours()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/gethours/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date.prototype.getHours()

The **`getHours()`** method of `Date` instances returns the hours for this date according to local time.

```js
const birthday = new Date("March 13, 08 04:20");

console.log(birthday.getHours());
// Expected output: 4
```

## Syntax

```js
getHours()
```

### Parameters

None.

### Return value

An integer, between 0 and 23, representing the hours for the given date according to local time. Returns `NaN` if the date is invalid.

## Examples

### Using getHours()

The `hours` variable has value `23`, based on the value of the `Date` object `xmas95`.

```js
const xmas95 = new Date("1995-12-25T23:15:30");
const hours = xmas95.getHours();

console.log(hours); // 23
```

## See also

- `Date.prototype.getUTCHours()`
- `Date.prototype.setHours()`
