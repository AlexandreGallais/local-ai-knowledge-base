---
title: "Date.prototype.toISOString()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/toisostring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date.prototype.toISOString()

The **`toISOString()`** method of `Date` instances returns a string representing this date in the date time string format, a _simplified_ format based on ISO 8601, which is always 24 or 27 characters long (`YYYY-MM-DDTHH:mm:ss.sssZ` or `±YYYYYY-MM-DDTHH:mm:ss.sssZ`, respectively). The timezone is always UTC, as denoted by the suffix `Z`.

```js
const event = new Date("05 October 2011 14:48 UTC");
console.log(event.toString());
// Expected output: "Wed Oct 05 2011 16:48:00 GMT+0200 (CEST)"
// Note: your timezone may vary

console.log(event.toISOString());
// Expected output: "2011-10-05T14:48:00.000Z"
```

## Syntax

```js
toISOString()
```

### Parameters

None.

### Return value

A string representing the given date in the date time string format according to universal time. It's the same format as the one required to be recognized by `Date.parse()`.

### Exceptions

- `RangeError`
    Thrown if the date is invalid or if it corresponds to a year that cannot be represented in the date string format.

## Examples

### Using toISOString()

```js
const d = new Date(0);

console.log(d.toISOString()); // "1970-01-01T00:00:00.000Z"
```

## See also

- `Date.prototype.toLocaleDateString()`
- `Date.prototype.toString()`
- `Date.prototype.toUTCString()`
