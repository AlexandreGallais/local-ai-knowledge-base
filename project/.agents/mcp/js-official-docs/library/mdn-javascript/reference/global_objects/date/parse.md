---
title: "Date.parse()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/parse/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date.parse()

The **`Date.parse()`** static method parses a string representation of a date, and returns the date's timestamp.

```js
// Standard date-time string format
const unixTimeZero = Date.parse("1970-01-01T00:00:00Z");
// Non-standard format resembling toUTCString()
const javaScriptRelease = Date.parse("04 Dec 1995 00:12:00 GMT");

console.log(unixTimeZero);
// Expected output: 0

console.log(javaScriptRelease);
// Expected output: 818035920000
```

## Syntax

```js
Date.parse(dateString)
```

### Parameters

- `dateString`
    A string in the date time string format. See the linked reference for caveats on using different formats.

### Return value

A number representing the timestamp of the given date. If `dateString` fails to be parsed as a valid date, `NaN` is returned.

## Description

This function is useful for setting date values based on string values, for example in conjunction with the `setTime()` method.

The formats that `parse()` can handle are not explicitly specified, but there are a few invariants:

- The date time string format (produced by `toISOString()`) must be supported.
- If `x` is any Date whose milliseconds amount is zero, then `x.valueOf()` should be equal to any of the following: `Date.parse(x.toString())`, `Date.parse(x.toUTCString())`, `Date.parse(x.toISOString())`. This means the formats produced by `toString()` and `toUTCString()` should be supported too.
- The spec does _not_ require support for the format produced by `toLocaleString()`. However, major engines all try to support `toLocaleString("en-US")` format.

Other formats are implementation-defined and may not work across all browsers. A library can help if many different formats are to be accommodated. In fact, the unreliability of `Date.parse()` is one of the motivations for the `Temporal` API to be introduced.

Because `parse()` is a static method of `Date`, you always use it as `Date.parse()`, rather than as a method of a `Date` object you created.

## Examples

### Using Date.parse()

The following calls all return `1546300800000`. The first will imply UTC time because it's date-only, and the others explicitly specify the UTC timezone.

```js
Date.parse("2019-01-01");
Date.parse("2019-01-01T00:00:00.000Z");
Date.parse("2019-01-01T00:00:00.000+00:00");
```

The following call, which does not specify a time zone will be set to 2019-01-01 at 00:00:00 in the local timezone of the system, because it has both date and time.

```js
Date.parse("2019-01-01T00:00:00");
```

### toString() and toUTCString() formats

Apart from the standard date time string format, the `toString()` and `toUTCString()` formats are supported:

```js
// toString() format
Date.parse("Thu Jan 01 1970 00:00:00 GMT-0500 (Eastern Standard Time)");
// 18000000 in all implementations in all timezones

// toUTCString() format
Date.parse("Thu, 01 Jan 1970 00:00:00 GMT");
// 0 in all implementations in all timezones
```

### Non-standard date strings

> **Note:**
> This section contains implementation-specific behavior that may be inconsistent across browsers or different versions of browsers. It is not meant to be a comprehensive browser compatibility table and you should always conduct your own tests before using any format in your code.

Implementations usually default to the local time zone when the date string is non-standard. For consistency, we will assume that the runtime uses the UTC timezone, and unless specified otherwise, the output will vary with the device's time zone. Daylight Saving Time (DST), of the local time zone, can also have an effect on this.

Here are some more examples of non-standard date strings. Browsers are very lenient when parsing date strings and may discard any part of a string that they cannot parse. For compatibility reasons, browsers often copy each other's behavior, so these handling patterns tend to propagate cross-browser. As previously stated, the following examples are for illustration only, and are not exhaustive by any means:

 | Description
 | Example
 | Chrome
 | Firefox
 | Safari

 | Single number
 | `0` (single-digit)
 | 946684800000 (Jan 01 2000); NaN in Firefox ≤122
 | -62167219200000 (Jan 01 0000)

 | `31` (two-digit)
 | NaN
 | -61188912000000 (Jan 01 0031)

 | `999` (three-/four-digit)
 | -30641733102000 (Jan 01 0999)

 | Date strings that use different separators
 | `1970-01-01` (standard)
 | 0 in all time zones

 | `1970/01/01`
 | 0

 | `1970,01,01`
 | 0
 | NaN

 | `1970 01 01`
 | 0
 | NaN

 | Strings that look like `toString()`
 | `Thu Jan 01 1970 00:00:00``Thu Jan 01 1970``Jan 01 1970 00:00:00``Jan 01 1970`
 | 0

 | Strings that look like `toUTCString()`
 | `Thu, 01 Jan 1970 00:00:00``Thu, 01 Jan 1970``01 Jan 1970 00:00:00``01 Jan 1970`
 | 0

 | First date component is 2-digit
 | `01-02-03` (first segment can be valid month)
 | 1041465600000 (Jan 02 2003)
 | -62132745600000 (Feb 03 0001)Note: Safari always assumes YY-MM-DD, but MM/DD/YY.

 | `27-02-03` (first segment can be valid day but not month)
 | NaN
 | -61312291200000 (Feb 03 0027)

 | `49-02-03` (first segment cannot be valid day and is <50)
 | 2495923200000 (Feb 03 2049)
 | -60617980800000 (Feb 03 0049)

 | `50-02-03` (first segment cannot be valid day and is ≥50)
 | -628300800000 (Feb 03 1950)
 | -60586444800000 (Feb 03 0050)

 | Out-of-bounds date components
 | `2014-25-23``Mar 32, 2014``2014/25/23`
 | NaN

 | `2014-02-30`
 | 1393718400000 (Mar 02 2014)
 | NaN

 | `02/30/2014`
 | 1393718400000

 | Extraneous characters after the month name
 | `04 Dec 1995``04 Decem 1995``04 December 1995`
 | 818031600000

 | `04 DecFoo 1995`
 | 818031600000Only the first three characters are read.Firefox ≤121 reads up to the valid month name, thus returning NaN when it sees "F".

 | `04 De 1995`
 | NaN

## See also

- `Date.UTC()`
