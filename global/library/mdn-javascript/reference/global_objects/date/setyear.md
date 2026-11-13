---
title: "Date.prototype.setYear()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/setyear/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date.prototype.setYear()

The **`setYear()`** method of `Date` instances sets the year for a specified date according to local time.

However, the way the legacy `setYear()` method sets year values is different from how the preferred `setFullYear()` method sets year values — and in some cases, also different from how `new Date()` and `Date.parse()` set year values. Specifically, given two-digit numbers, such as `22` and `61`:

- `setYear()` interprets any two-digit number as an offset to `1900`; so `date.setYear(22)` results in the year value being set to `1922`, and `date.setYear(61)` results in the year value being set to `1961`. (In contrast, while `new Date(61, 1)` also results in the year value being set to `1961`, `new Date("2/1/22")` results in the year value being set to `2022`; and similarly for `Date.parse()`).

- `setFullYear()` does no special interpretation but instead uses the literal two-digit value as-is to set the year; so `date.setFullYear(61)` results in the year value being set to `0061`, and `date.setFullYear(22)` results in the year value being set to `0022`.

Because of those differences in behavior, you should no longer use the legacy `setYear()` method, but should instead use the preferred `setFullYear()` method.

## Syntax

```js
setYear(yearValue)
```

### Parameters

- `yearValue`
    An integer.

### Return value

Changes the `Date` object in place, and returns its new timestamp. If `yearValue` is `NaN` (or other values that get coerced to `NaN`, such as `undefined`), the date is set to Invalid Date and `NaN` is returned.

## Description

If `yearValue` is a number between 0 and 99 (inclusive), then the year for
`dateObj` is set to `1900 + yearValue`. Otherwise, the year for
`dateObj` is set to `yearValue`.

## Examples

### Using setYear()

The first two lines set the year to 1996. The third sets the year to 2000.

```js
const theBigDay = new Date();

theBigDay.setYear(96);
theBigDay.setYear(1996);
theBigDay.setYear(2000);
```

## See also

- Polyfill of `Date.prototype.setYear` in `core-js`
- `Date.prototype.getFullYear()`
- `Date.prototype.getUTCFullYear()`
- `Date.prototype.setFullYear()`
- `Date.prototype.setUTCFullYear()`
