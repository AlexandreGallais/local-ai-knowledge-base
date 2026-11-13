---
title: "Date.prototype.getSeconds()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/getseconds/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date.prototype.getSeconds()

The **`getSeconds()`** method of `Date` instances returns the seconds for this date according to local time.

```js
const moonLanding = new Date("July 20, 69 00:20:18");

console.log(moonLanding.getSeconds());
// Expected output: 18
```

## Syntax

```js
getSeconds()
```

### Parameters

None.

### Return value

An integer, between 0 and 59, representing the seconds for the given date according to local time. Returns `NaN` if the date is invalid.

## Examples

### Using getSeconds()

The `seconds` variable has value `30`, based on the value of the `Date` object `xmas95`.

```js
const xmas95 = new Date("1995-12-25T23:15:30");
const seconds = xmas95.getSeconds();

console.log(seconds); // 30
```

## See also

- `Date.prototype.getUTCSeconds()`
- `Date.prototype.setSeconds()`
