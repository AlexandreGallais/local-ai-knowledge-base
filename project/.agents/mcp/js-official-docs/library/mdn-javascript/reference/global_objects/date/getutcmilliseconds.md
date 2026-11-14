---
title: "Date.prototype.getUTCMilliseconds()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/getutcmilliseconds/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date.prototype.getUTCMilliseconds()

The **`getUTCMilliseconds()`** method of `Date` instances returns the milliseconds for this date according to universal time.

```js
const exampleDate = new Date("2018-01-02T03:04:05.678Z"); // 2 January 2018, 03:04:05.678 (UTC)

console.log(exampleDate.getUTCMilliseconds());
// Expected output: 678
```

## Syntax

```js
getUTCMilliseconds()
```

### Parameters

None.

### Return value

An integer, between 0 and 999, representing the milliseconds for the given date according to universal time. Returns `NaN` if the date is invalid.

Not to be confused with the timestamp. To get the total milliseconds since the epoch, use the `getTime()` method.

## Examples

### Using getUTCMilliseconds()

The following example assigns the milliseconds portion of the current time to the variable `milliseconds`.

```js
const today = new Date();
const milliseconds = today.getUTCMilliseconds();
```

## See also

- `Date.prototype.getMilliseconds()`
- `Date.prototype.setUTCMilliseconds()`
