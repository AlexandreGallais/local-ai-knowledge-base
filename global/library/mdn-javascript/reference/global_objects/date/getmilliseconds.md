---
title: "Date.prototype.getMilliseconds()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/getmilliseconds/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date.prototype.getMilliseconds()

The **`getMilliseconds()`** method of `Date` instances returns the milliseconds for this date according to local time.

```js
const moonLanding = new Date("July 20, 69 00:20:18");
moonLanding.setMilliseconds(123);

console.log(moonLanding.getMilliseconds());
// Expected output: 123
```

## Syntax

```js
getMilliseconds()
```

### Parameters

None.

### Return value

An integer, between 0 and 999, representing the milliseconds for the given date according to local time. Returns `NaN` if the date is invalid.

## Examples

### Using getMilliseconds()

The `milliseconds` variable has value `0`, based on the value of the `Date` object `xmas95`, which doesn't specify the milliseconds component, so it defaults to 0.

```js
const xmas95 = new Date("1995-12-25T23:15:30");
const milliseconds = xmas95.getMilliseconds();

console.log(milliseconds); // 0
```

## See also

- `Date.prototype.getUTCMilliseconds()`
- `Date.prototype.setMilliseconds()`
