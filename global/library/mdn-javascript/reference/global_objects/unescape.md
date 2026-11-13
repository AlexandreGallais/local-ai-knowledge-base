---
title: "unescape()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/unescape/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# unescape()

> **Note:**
> `unescape()` is a non-standard function implemented by browsers and was only standardized for cross-engine compatibility. It is not required to be implemented by all JavaScript engines and may not work everywhere. Use `decodeURIComponent()` or `decodeURI()` if possible.

The **`unescape()`** function computes a new string in which hexadecimal escape sequences are replaced with the characters that they represent. The escape sequences might be introduced by a function like `escape()`.

## Syntax

```js
unescape(str)
```

### Parameters

- `str`
    A string to be decoded.

### Return value

A new string in which certain characters have been unescaped.

## Description

`unescape()` is a function property of the global object.

The `unescape()` function replaces any escape sequence with the character that it represents. Specifically, it replaces any escape sequence of the form `%XX` or `%uXXXX` (where `X` represents one hexadecimal digit) with the character that has the hexadecimal value `XX`/`XXXX`. If the escape sequence is not a valid escape sequence (for example, if `%` is followed by one or no hex digit), it is left as-is.

> **Note:**
> This function was used mostly for percent-encoding and is partly based on the escape format in . The `unescape()` function does _not_ evaluate escape sequences in string literals. You can replace `\xXX` with `%XX` and `\uXXXX` with `%uXXXX` to get a string that can be handled by `unescape()`.

## Examples

### Using unescape()

```js
unescape("abc123"); // "abc123"
unescape("%E4%F6%FC"); // "äöü"
unescape("%u0107"); // "ć"
```

## See also

- Polyfill of `unescape` in `core-js`
- `decodeURI`
- `decodeURIComponent`
- `escape`
