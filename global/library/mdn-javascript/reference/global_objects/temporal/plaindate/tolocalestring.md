---
title: "Temporal.PlainDate.prototype.toLocaleString()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaindate/tolocalestring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainDate.prototype.toLocaleString()

The **`toLocaleString()`** method of `Temporal.PlainDate` instances returns a string with a language-sensitive representation of this date. In implementations with `Intl.DateTimeFormat` API support, this method delegates to `Intl.DateTimeFormat`.

Every time `toLocaleString` is called, it has to perform a search in a big database of localization strings, which is potentially inefficient. When the method is called many times with the same arguments, it is better to create an `Intl.DateTimeFormat` object and use its `format()` method, because a `DateTimeFormat` object remembers the arguments passed to it and may decide to cache a slice of the database, so future `format` calls can search for localization strings within a more constrained context.

## Syntax

```js
toLocaleString()
toLocaleString(locales)
toLocaleString(locales, options)
```

### Parameters

The `locales` and `options` parameters customize the behavior of the function and let applications specify the language whose formatting conventions should be used.

In implementations that support the `Intl.DateTimeFormat` API, these parameters correspond exactly to the `Intl.DateTimeFormat()` constructor's parameters. Implementations without `Intl.DateTimeFormat` support return the exact same string as `toString()`, ignoring both parameters.

- `locales` (optional)
    A string with a BCP 47 language tag, or an array of such strings. Corresponds to the `locales` parameter of the `Intl.DateTimeFormat()` constructor.
- `options` (optional)
    An object adjusting the output format. Corresponds to the `options` parameter of the `Intl.DateTimeFormat()` constructor. If this date's calendar is not `"iso8601"`, the `calendar` option must be provided with the same value; otherwise, if this date's calendar is `"iso8601"`, the `calendar` option can be any value. Regarding the date-time component options and the style shortcuts (`dateStyle` and `timeStyle`), the options should follow one of these forms:
    - Provide none of them: `year`, `month`, and `day` will default to `"numeric"`.
    - Provide `dateStyle` only: it expands to `weekday`, `era`, `year`, `month`, and `day` formats.
    - Provide some date-time component options, where at least one of them is a date option (`weekday`, `year`, `month`, `day`). Only the specified date components will be included in the output.

See the `Intl.DateTimeFormat()` constructor for details on these parameters and how to use them.

### Return value

A string representing the given date according to language-specific conventions.

In implementations with `Intl.DateTimeFormat`, this is equivalent to `new Intl.DateTimeFormat(locales, options).format(date)`, where `options` has been normalized as described above.

> **Note:**
> Most of the time, the formatting returned by `toLocaleString()` is consistent. However, the output may vary between implementations, even within the same locale — output variations are by design and allowed by the specification. It may also not be what you expect. For example, the string may use non-breaking spaces or be surrounded by bidirectional control characters. You should not compare the results of `toLocaleString()` to hardcoded constants.

### Exceptions

- `RangeError`
    Thrown if any of the options is invalid.
- `TypeError`
    Thrown if any of the options is not of the expected type.

## Examples

### Using toLocaleString()

Basic use of this method without specifying a `locale` returns a formatted string in the default locale and with default options.

```js
const date = Temporal.PlainDate.from("2021-08-01");

console.log(date.toLocaleString()); // 8/1/2021 (assuming en-US locale)
```

If the date's calendar doesn't match the locale's default calendar, and the date's calendar is not `iso8601`, an explicit `calendar` option must be provided with the same value.

```js
const date = Temporal.PlainDate.from("2021-08-01[u-ca=japanese]");
// The ja-JP locale uses the Gregorian calendar by default
date.toLocaleString("ja-JP", { calendar: "japanese" }); // R3/8/1
```

### Using toLocaleString() with options

You can customize which parts of the date are included in the output by providing the `options` parameter.

```js
const date = Temporal.PlainDate.from("2021-08-01");
date.toLocaleString("en-US", { dateStyle: "full" }); // Sunday, August 1, 2021
date.toLocaleString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
}); // August 1, 2021
date.toLocaleString("en-US", { year: "numeric", month: "long" }); // August 2021
```

## See also

- `Temporal.PlainDate`
- `Intl.DateTimeFormat`
- `Temporal.PlainDate.prototype.toJSON()`
- `Temporal.PlainDate.prototype.toString()`
