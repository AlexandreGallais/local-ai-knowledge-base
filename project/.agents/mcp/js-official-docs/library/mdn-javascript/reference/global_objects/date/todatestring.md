---
title: "Date.prototype.toDateString()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/todatestring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date.prototype.toDateString()

The **`toDateString()`** method of `Date` instances returns a string representing the date portion of this date interpreted in the local timezone.

```js
const event = new Date(1993, 6, 28, 14, 39, 7);

console.log(event.toString());
// Expected output: "Wed Jul 28 1993 14:39:07 GMT+0200 (CEST)"
// Note: your timezone may vary

console.log(event.toDateString());
// Expected output: "Wed Jul 28 1993"
```

## Syntax

```js
toDateString()
```

### Parameters

None.

### Return value

A string representing the date portion of the given date (see description for the format). Returns `"Invalid Date"` if the date is invalid.

## Description

`Date` instances refer to a specific point in time. `toDateString()` interprets the date in the local timezone and formats the _date_ part in English. It always uses the following format, separated by spaces:

1. First three letters of the week day name
2. First three letters of the month name
3. Two-digit day of the month, padded on the left a zero if necessary
4. Four-digit year (at least), padded on the left with zeros if necessary. May have a negative sign

For example: "Thu Jan 01 1970".

- If you only want to get the _time_ part, use `toTimeString()`.
- If you want to get both the date and time, use `toString()`.
- If you want to make the date interpreted as UTC instead of local timezone, use `toUTCString()`.
- If you want to format the date in a more user-friendly format (e.g., localization), use `toLocaleDateString()`.

## Examples

### Using toDateString()

```js
const d = new Date(0);

console.log(d.toString()); // "Thu Jan 01 1970 00:00:00 GMT+0000 (Coordinated Universal Time)"
console.log(d.toDateString()); // "Thu Jan 01 1970"
```

## See also

- `Date.prototype.toLocaleDateString()`
- `Date.prototype.toTimeString()`
- `Date.prototype.toString()`
