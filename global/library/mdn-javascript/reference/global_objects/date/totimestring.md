---
title: "Date.prototype.toTimeString()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/totimestring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date.prototype.toTimeString()

The **`toTimeString()`** method of `Date` instances returns a string representing the time portion of this date interpreted in the local timezone.

```js
const event = new Date("August 19, 1975 23:15:30");

console.log(event.toTimeString());
// Expected output: "23:15:30 GMT+0200 (CEST)"
// Note: your timezone may vary
```

## Syntax

```js
toTimeString()
```

### Parameters

None.

### Return value

A string representing the time portion of the given date (see description for the format). Returns `"Invalid Date"` if the date is invalid.

## Description

`Date` instances refer to a specific point in time. `toTimeString()` interprets the date in the local timezone and formats the _time_ part in English. It always uses the format of `HH:mm:ss GMT±xxxx (TZ)`, where:

| Format String | Description                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------------ |
| `HH`          | Hour, as two digits with leading zero if required                                                      |
| `mm`          | Minute, as two digits with leading zero if required                                                    |
| `ss`          | Seconds, as two digits with leading zero if required                                                   |
| `±xxxx`       | The local timezone's offset — two digits for hours and two digits for minutes (e.g., `-0500`, `+0800`) |
| `TZ`          | The timezone's name (e.g., `PDT`, `PST`)                                                               |

For example: "04:42:04 GMT+0000 (Coordinated Universal Time)".

- If you only want to get the _date_ part, use `toDateString()`.
- If you want to get both the date and time, use `toString()`.
- If you want to make the date interpreted as UTC instead of local timezone, use `toUTCString()`.
- If you want to format the date in a more user-friendly format (e.g., localization), use `toLocaleTimeString()`.

## Examples

### Using toTimeString()

```js
const d = new Date(0);

console.log(d.toString()); // "Thu Jan 01 1970 00:00:00 GMT+0000 (Coordinated Universal Time)"
console.log(d.toTimeString()); // "00:00:00 GMT+0000 (Coordinated Universal Time)"
```

## See also

- `Date.prototype.toLocaleTimeString()`
- `Date.prototype.toDateString()`
- `Date.prototype.toString()`
