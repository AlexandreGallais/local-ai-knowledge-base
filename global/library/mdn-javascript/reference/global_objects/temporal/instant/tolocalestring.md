---
title: "Temporal.Instant.prototype.toLocaleString()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/instant/tolocalestring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.Instant.prototype.toLocaleString()

The **`toLocaleString()`** method of `Temporal.Instant` instances returns a string with a language-sensitive representation of this instant. In implementations with `Intl.DateTimeFormat` API support, this method delegates to `Intl.DateTimeFormat`.

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
    An object adjusting the output format. Corresponds to the `options` parameter of the `Intl.DateTimeFormat()` constructor.

See the `Intl.DateTimeFormat()` constructor for details on these parameters and how to use them.

### Return value

A string representing the given instant according to language-specific conventions.

In implementations with `Intl.DateTimeFormat`, this is equivalent to `new Intl.DateTimeFormat(locales, options).format(instant)`.

> **Note:**
> Most of the time, the formatting returned by `toLocaleString()` is consistent. However, the output may vary between implementations, even within the same locale — output variations are by design and allowed by the specification. It may also not be what you expect. For example, the string may use non-breaking spaces or be surrounded by bidirectional control characters. You should not compare the results of `toLocaleString()` to hardcoded constants.

## Examples

### Using toLocaleString()

Basic use of this method without specifying a `locale` returns a formatted string in the default locale and with default options.

```js
const instant = Temporal.Instant.from("2021-08-01T12:34:56Z");

console.log(instant.toLocaleString()); // 8/1/2021, 12:34:56 AM (assuming en-US locale and device in UTC time zone)
```

## See also

- `Temporal.Instant`
- `Intl.DateTimeFormat`
- `Temporal.Instant.prototype.toJSON()`
- `Temporal.Instant.prototype.toString()`
