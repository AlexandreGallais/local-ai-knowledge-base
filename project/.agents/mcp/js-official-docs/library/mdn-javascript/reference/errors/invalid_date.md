---
title: "RangeError: invalid date"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/invalid_date/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RangeError: invalid date

The JavaScript exception "invalid date" occurs when an invalid date is attempted to be converted to an ISO date string.

## Message

```plain
RangeError: Invalid time value (V8-based)
RangeError: invalid date (Firefox)
RangeError: Invalid Date (Safari)
```

## Error type

`RangeError`

## What went wrong?

You are converting an invalid date value to an ISO date string by calling the `toISOString()` method.

An _invalid date_ is produced when you attempt to parse an invalid date string, or set the timestamp to an out-of-bounds value. Invalid dates usually cause all date methods to return `NaN` or other special values. However, such dates do not have valid ISO string representations, so an error is thrown when you attempt to do so.

> **Note:**
> `toJSON()` does not throw this error. It checks whether the date is finite before formatting it, and returns `null` for an invalid date instead of calling `toISOString()`. `JSON.stringify()`, which calls `toJSON()`, therefore serializes an invalid date as `null` rather than throwing.

## Examples

### Invalid cases

```js
const invalid = new Date("nothing");
invalid.toISOString(); // RangeError: invalid date
```

However, most other methods return special values:

```js
invalid.toString(); // "Invalid Date"
invalid.getDate(); // NaN
invalid.toJSON(); // null
JSON.stringify({ date: invalid }); // '{"date":null}'
```

For more details, see the `Date.parse()` documentation.

### Valid cases

```js
new Date("05 October 2011 14:48 UTC").toISOString(); // "2011-10-05T14:48:00.000Z"
new Date(1317826080).toISOString(); // "2011-10-05T14:48:00.000Z"
```

## See also

- `Date`
- `Date.prototype.parse()`
- `Date.prototype.toISOString()`
