---
title: "Temporal.ZonedDateTime.prototype.toLocaleString()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/zoneddatetime/tolocalestring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.ZonedDateTime.prototype.toLocaleString()

The **`toLocaleString()`** method of `Temporal.ZonedDateTime` instances returns a string with a language-sensitive representation of this date-time. In implementations with `Intl.DateTimeFormat` API support, this method delegates to `Intl.DateTimeFormat` and passes this date-time converted to a `Temporal.Instant` (because `Intl.DateTimeFormat` cannot directly format a `Temporal.ZonedDateTime`).

Every time `toLocaleString` is called, it has to perform a search in a big database of localization strings, which is potentially inefficient. When the method is called many times with the same arguments, it is better to create an `Intl.DateTimeFormat` object and use its `format()` method, because a `DateTimeFormat` object remembers the arguments passed to it and may decide to cache a slice of the database, so future `format` calls can search for localization strings within a more constrained context. However, currently `Intl.DateTimeFormat` does not support formatting `Temporal.ZonedDateTime` objects, so you must convert them to `Temporal.Instant` objects first before passing them to `format()`.

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
    An object adjusting the output format. Corresponds to the `options` parameter of the `Intl.DateTimeFormat()` constructor. If this date-time's calendar is not `"iso8601"`, the `calendar` option must be provided with the same value; otherwise, if this date-time's calendar is `"iso8601"`, the `calendar` option can be any value. The `timeZone` option must not be provided, as it is automatically set to be the date-time's `timeZoneId`. Regarding the date-time component options and the style shortcuts (`dateStyle` and `timeStyle`), the options should follow one of these forms:
    - Provide none of them: `year`, `month`, `day`, `hour`, `minute`, and `second` will default to `"numeric"`.
    - Provide at least one of `dateStyle` or `timeStyle`: the date-time components will be set according to the specified style and the locale.
    - Provide some date-time component options. Only the specified date-time components will be included in the output.

See the `Intl.DateTimeFormat()` constructor for details on these parameters and how to use them.

### Return value

A string representing the given date-time according to language-specific conventions.

In implementations with `Intl.DateTimeFormat`, this is equivalent to `new Intl.DateTimeFormat(locales, { ...options, timeZone: dateTime.timeZoneId }).format(dateTime.toInstant())`, where `options` has been normalized as described above.

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
const zdt = Temporal.ZonedDateTime.from(
  "2021-08-01T12:34:56-04:00[America/New_York]",
);

console.log(zdt.toLocaleString()); // 8/1/2021, 12:34:56 PM EDT (assuming en-US locale)
```

If the date's calendar doesn't match the locale's default calendar, and the date's calendar is not `iso8601`, an explicit `calendar` option must be provided with the same value.

```js
const zdt = Temporal.ZonedDateTime.from(
  "2021-08-01T12:34:56+09:00[Asia/Tokyo][u-ca=japanese]",
);
// The ja-JP locale uses the Gregorian calendar by default
zdt.toLocaleString("ja-JP", { calendar: "japanese" }); // R3/8/1 12:34:56 JST
```

### Using toLocaleString() with options

You can customize which parts of the date are included in the output by providing the `options` parameter.

```js
const zdt = Temporal.ZonedDateTime.from(
  "2021-08-01T12:34:56+09:00[Asia/Tokyo][u-ca=japanese]",
);
zdt.toLocaleString("ja-JP", {
  calendar: "japanese",
  dateStyle: "full",
  timeStyle: "full",
}); // 令和3年8月1日日曜日 12時34分56秒 日本標準時
zdt.toLocaleString("ja-JP", {
  calendar: "japanese",
  year: "numeric",
  month: "long",
  hour: "numeric",
  timeZoneName: "shortGeneric",
}); // 令和3年8月 12時 JST
zdt.toLocaleString("ja-JP", {
  calendar: "japanese",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
}); // 令和3年 12:34
```

## See also

- `Temporal.ZonedDateTime`
- `Intl.DateTimeFormat`
- `Temporal.ZonedDateTime.prototype.toJSON()`
- `Temporal.ZonedDateTime.prototype.toString()`
