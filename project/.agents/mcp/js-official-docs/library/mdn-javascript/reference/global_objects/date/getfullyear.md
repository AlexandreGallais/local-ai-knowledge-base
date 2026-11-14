---
title: "Date.prototype.getFullYear()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/getfullyear/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date.prototype.getFullYear()

The **`getFullYear()`** method of `Date` instances returns the year for this date according to local time.

Use this method instead of the `getYear()` method.

```js
const moonLanding = new Date("July 20, 69 00:20:18");

console.log(moonLanding.getFullYear());
// Expected output: 1969
```

## Syntax

```js
getFullYear()
```

### Parameters

None.

### Return value

An integer representing the year for the given date according to local time. Returns `NaN` if the date is invalid.

## Description

Unlike `getYear()`, the value returned by `getFullYear()` is an absolute number. For dates between the years 1000 and 9999, `getFullYear()` returns a four-digit number, for example, 1995. Use this function to make sure a year is compliant with years after 2000.

## Examples

### Using getFullYear()

The `fullYear` variable has value `1995`, based on the value of the `Date` object `xmas95`.

```js
const xmas95 = new Date("1995-12-25T23:15:30");
const fullYear = xmas95.getFullYear();

console.log(fullYear); // 1995
```

## See also

- `Date.prototype.getUTCFullYear()`
- `Date.prototype.setFullYear()`
- `Date.prototype.getYear()`
