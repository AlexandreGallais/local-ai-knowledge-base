---
title: "Date.prototype.getUTCSeconds()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/getutcseconds/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date.prototype.getUTCSeconds()

The **`getUTCSeconds()`** method of `Date` instances returns the seconds in the specified date according to universal time.

```js
const moonLanding = new Date("July 20, 1969, 20:18:04 UTC");

console.log(moonLanding.getUTCSeconds());
// Expected output: 4
```

## Syntax

```js
getUTCSeconds()
```

### Parameters

None.

### Return value

An integer, between 0 and 59, representing the seconds for the given date according to universal time. Returns `NaN` if the date is invalid.

## Examples

### Using getUTCSeconds()

The following example assigns the seconds portion of the current time to the variable `seconds`.

```js
const today = new Date();
const seconds = today.getUTCSeconds();
```

## See also

- `Date.prototype.getSeconds()`
- `Date.prototype.setUTCSeconds()`
