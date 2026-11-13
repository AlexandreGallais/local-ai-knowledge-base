---
title: "Date.prototype.toUTCString()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/toutcstring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date.prototype.toUTCString()

The **`toUTCString()`** method of `Date` instances returns a string representing this date in the RFC 7231 format, with negative years allowed. The timezone is always UTC. `toGMTString()` is an alias of this method.

```js
const event = new Date("14 Jun 2017 00:00:00 PDT");

console.log(event.toUTCString());
// Expected output: "Wed, 14 Jun 2017 07:00:00 GMT"
```

## Syntax

```js
toUTCString()
```

### Parameters

None.

### Return value

A string representing the given date using the UTC time zone (see description for the format). Returns `"Invalid Date"` if the date is invalid.

## Description

The value returned by `toUTCString()` is a string in the form `Www, dd Mmm yyyy HH:mm:ss GMT`, where:

| Format String | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| `Www`         | Day of week, as three letters (e.g., `Sun`, `Mon`)           |
| `dd`          | Day of month, as two digits with leading zero if required    |
| `Mmm`         | Month, as three letters (e.g., `Jan`, `Feb`)                 |
| `yyyy`        | Year, as four or more digits with leading zeroes if required |
| `HH`          | Hour, as two digits with leading zero if required            |
| `mm`          | Minute, as two digits with leading zero if required          |
| `ss`          | Seconds, as two digits with leading zero if required         |

### Aliasing

JavaScript's `Date` API was inspired by Java's `java.util.Date` library (while the latter had become de facto legacy since Java 1.1 in 1997). In particular, the Java `Date` class had a method called `toGMTString` — which was poorly named, because the Greenwich Mean Time is not equivalent to the Coordinated Universal Time, while JavaScript dates always operate by UTC time. For web compatibility reasons, `toGMTString` remains as an alias to `toUTCString`, and they refer to the exact same function object. This means:

```js
Date.prototype.toGMTString.name === "toUTCString";
```

## Examples

### Using toUTCString()

```js
const d = new Date(0);
console.log(d.toUTCString()); // 'Thu, 01 Jan 1970 00:00:00 GMT'
```

## See also

- `Date.prototype.toLocaleString()`
- `Date.prototype.toString()`
- `Date.prototype.toISOString()`
