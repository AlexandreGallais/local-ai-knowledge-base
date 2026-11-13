---
title: "Date.prototype.setUTCMilliseconds()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/setutcmilliseconds/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date.prototype.setUTCMilliseconds()

The **`setUTCMilliseconds()`** method of `Date` instances changes the milliseconds for this date according to universal time.

```js
const date = new Date("2018-01-24T12:38:29.069Z");

console.log(date.getUTCMilliseconds());
// Expected output: 69

date.setUTCMilliseconds(420);

console.log(date.getUTCMilliseconds());
// Expected output: 420
```

## Syntax

```js
setUTCMilliseconds(millisecondsValue)
```

### Parameters

- `millisecondsValue`
    An integer between 0 and 999 representing the milliseconds.

### Return value

Changes the `Date` object in place, and returns its new timestamp. If `millisecondsValue` is `NaN` (or other values that get coerced to `NaN`, such as `undefined`), the date is set to Invalid Date and `NaN` is returned.

## Description

If a parameter you specify is outside of the expected range,
`setUTCMilliseconds()` attempts to update the date information in the
`Date` object accordingly. For example, if you use 1100 for
`millisecondsValue`, the seconds stored in the `Date`
object will be incremented by 1, and 100 will be used for milliseconds.

## Examples

### Using setUTCMilliseconds()

```js
const theBigDay = new Date();
theBigDay.setUTCMilliseconds(500);
```

## See also

- `Date.prototype.getUTCMilliseconds()`
- `Date.prototype.setMilliseconds()`
