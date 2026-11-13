---
title: "Temporal.PlainMonthDay.prototype.toLocaleString()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plainmonthday/tolocalestring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainMonthDay.prototype.toLocaleString()

The **`toLocaleString()`** method of `Temporal.PlainMonthDay` instances returns a string with a language-sensitive representation of this month-day. In implementations with `Intl.DateTimeFormat` API support, this method delegates to `Intl.DateTimeFormat`.

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
    An object adjusting the output format. Corresponds to the `options` parameter of the `Intl.DateTimeFormat()` constructor. The `calendar` option must be provided with the same value as this month-day's calendar. Regarding the date-time component options and the style shortcuts (`dateStyle` and `timeStyle`), the options should follow one of these forms:
    - Provide none of them: `month` and `day` will default to `"numeric"`.
    - Provide `dateStyle` only: it expands to `month` and `day` formats.
    - Provide some date-time component options, where at least one of them is `month` or `day`. Only the specified date components will be included in the output.

See the `Intl.DateTimeFormat()` constructor for details on these parameters and how to use them.

### Return value

A string representing the given month-day according to language-specific conventions.

In implementations with `Intl.DateTimeFormat`, this is equivalent to `new Intl.DateTimeFormat(locales, options).format(monthDay)`, where `options` has been normalized as described above.

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
// Note that just specifying "08-01" defaults to the ISO 8601 calendar,
// which throws an error if the locale's default calendar is not ISO 8601.
const md = Temporal.PlainMonthDay.from("2021-08-01[u-ca=gregory]");

console.log(md.toLocaleString()); // 8/1 (assuming en-US locale and Gregorian calendar)
```

If the month-day's calendar doesn't match the locale's default calendar, even when its calendar is `iso8601`, an explicit `calendar` option must be provided with the same value.

```js
const md = Temporal.PlainMonthDay.from("08-01");
md.toLocaleString("en-US", { calendar: "iso8601" }); // 08-01
```

### Using toLocaleString() with options

You can customize which parts of the month-day are included in the output by providing the `options` parameter.

```js
const md = Temporal.PlainMonthDay.from("2021-08-01[u-ca=gregory]");
md.toLocaleString("en-US", { dateStyle: "full" }); // August 1
md.toLocaleString("en-US", { month: "long" }); // August
md.toLocaleString("en-US", { day: "numeric" }); // 1
```

## See also

- `Temporal.PlainMonthDay`
- `Intl.DateTimeFormat`
- `Temporal.PlainMonthDay.prototype.toJSON()`
- `Temporal.PlainMonthDay.prototype.toString()`
