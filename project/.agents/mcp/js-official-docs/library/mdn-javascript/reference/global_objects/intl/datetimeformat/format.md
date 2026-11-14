---
title: "Intl.DateTimeFormat.prototype.format()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/datetimeformat/format/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.DateTimeFormat.prototype.format()

The **`format()`** method of `Intl.DateTimeFormat` instances formats a date according to the locale and formatting options of this `Intl.DateTimeFormat` object.

```js
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const date = new Date(2012, 5);

const dateTimeFormat1 = new Intl.DateTimeFormat("sr-RS", options);
console.log(dateTimeFormat1.format(date));
// Expected output: "петак, 1. јун 2012."

const dateTimeFormat2 = new Intl.DateTimeFormat("en-GB", options);
console.log(dateTimeFormat2.format(date));
// Expected output: "Friday, 1 June 2012"

const dateTimeFormat3 = new Intl.DateTimeFormat("en-US", options);
console.log(dateTimeFormat3.format(date));
// Expected output: "Friday, June 1, 2012"
```

## Syntax

```js
format(date)
```

### Parameters

- `date`
    The date to format. Can be a `Date` or `Temporal.PlainDateTime` object. Additionally can be a `Temporal.PlainTime`, `Temporal.PlainDate`, `Temporal.PlainYearMonth`, or `Temporal.PlainMonthDay` object if the `DateTimeFormat` object was configured to print at least one relevant part of the date.

    > **Note:**
    > A `Temporal.ZonedDateTime` object will always throw a `TypeError`; use `Temporal.ZonedDateTime.prototype.toLocaleString()` or convert it to a `Temporal.PlainDateTime` object instead.

    Omitting it results in formatting the current date (as returned by `Date.now()`), which could be slightly confusing, so it is advisable to always explicitly pass a date.

### Return value

A string representing the given `date` formatted according to the locale and formatting options of this `Intl.DateTimeFormat` object.

> **Note:**
> Most of the time, the formatting returned by `format()` is consistent. However, the output may vary between implementations, even within the same locale — output variations are by design and allowed by the specification. It may also not be what you expect. For example, the string may use non-breaking spaces or be surrounded by bidirectional control characters. You should not compare the results of `format()` to hardcoded constants.

## Examples

### Using format

Use the `format` getter function for formatting a single date, here for
Serbia:

```js
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const dateTimeFormat = new Intl.DateTimeFormat("sr-RS", options);
console.log(dateTimeFormat.format(new Date()));
// "недеља, 7. април 2013."
```

### Using format with map

Use the `format` getter function for formatting all dates in an array. Note
that the function is bound to the `Intl.DateTimeFormat`
from which it was obtained, so it can be passed directly to
`Array.prototype.map()`.

```js
const a = [new Date(2012, 8), new Date(2012, 11), new Date(2012, 3)];
const options = { year: "numeric", month: "long" };
const dateTimeFormat = new Intl.DateTimeFormat("pt-BR", options);
const formatted = a.map(dateTimeFormat.format);
console.log(formatted.join("; "));
// "setembro de 2012; dezembro de 2012; abril de 2012"
```

## See also

- `Intl.DateTimeFormat`
