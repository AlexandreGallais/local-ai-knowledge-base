---
title: "escape()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/escape/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# escape()

> **Note:**
> `escape()` is a non-standard function implemented by browsers and was only standardized for cross-engine compatibility. It is not required to be implemented by all JavaScript engines and may not work everywhere. Use `encodeURIComponent()` or `encodeURI()` if possible.

The **`escape()`** function computes a new string in which certain characters have been replaced by hexadecimal escape sequences.

## Syntax

```js
escape(str)
```

### Parameters

- `str`
    A string to be encoded.

### Return value

A new string in which certain characters have been escaped.

## Description

`escape()` is a function property of the global object.

The `escape()` function replaces all characters with escape sequences, with the exception of ASCII word characters (A–Z, a–z, 0–9, \_) and `@\*_+-./`. Characters are escaped by UTF-16 code units. If the code unit's value is less than 256, it is represented by a two-digit hexadecimal number in the format `%XX`, left-padded with 0 if necessary. Otherwise, it is represented by a four-digit hexadecimal number in the format `%uXXXX`, left-padded with 0 if necessary.

> **Note:**
> This function was used mostly for percent-encoding and is partly based on the escape format in . The escape format is _not_ an escape sequence in string literals. You can replace `%XX` with `\xXX` and `%uXXXX` with `\uXXXX` to get a string containing actual string-literal escape sequences.

## Examples

### Using escape()

```js
escape("abc123"); // "abc123"
escape("äöü"); // "%E4%F6%FC"
escape("ć"); // "%u0107"

// special characters
escape("@*_+-./"); // "@*_+-./"
```

## See also

- Polyfill of `escape` in `core-js`
- `encodeURI`
- `encodeURIComponent`
- `unescape`
