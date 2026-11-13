---
title: "Date.prototype.getMinutes()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/getminutes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date.prototype.getMinutes()

The **`getMinutes()`** method of `Date` instances returns the minutes for this date according to local time.

```js
const birthday = new Date("March 13, 08 04:20");

console.log(birthday.getMinutes());
// Expected output: 20
```

## Syntax

```js
getMinutes()
```

### Parameters

None.

### Return value

An integer, between 0 and 59, representing the minutes for the given date according to local time. Returns `NaN` if the date is invalid.

## Examples

### Using getMinutes()

The `minutes` variable has value `15`, based on the value of the `Date` object `xmas95`.

```js
const xmas95 = new Date("1995-12-25T23:15:30");
const minutes = xmas95.getMinutes();

console.log(minutes); // 15
```

## See also

- `Date.prototype.getUTCMinutes()`
- `Date.prototype.setMinutes()`
