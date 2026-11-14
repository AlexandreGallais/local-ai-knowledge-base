---
title: "SyntaxError: invalid unicode escape in regular expression"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/regex_invalid_unicode_escape/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: invalid unicode escape in regular expression

The JavaScript exception "invalid unicode escape in regular expression" occurs when the `\c` and `\u` character escapes are not followed by valid characters.

## Message

```plain
SyntaxError: Invalid regular expression: /\u{123456}/u: Invalid Unicode escape (V8-based)
SyntaxError: invalid unicode escape in regular expression (Firefox)
SyntaxError: Invalid regular expression: invalid Unicode code point \u{} escape (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

In Unicode-aware mode, the `\c` escape sequence must be followed by a letter from `A` to `Z` or `a` to `z`, and the `\u` escape sequence must either be followed by 4 hexadecimal digits, or 1 to 6 hexadecimal digits enclosed in curly braces (`{}`). Furthermore, when using the `\u{xxx}` escape sequence, the digits must represent a valid Unicode code point, which means its value cannot exceed `10FFFF`.

## Examples

### Invalid cases

```js
/\u{123456}/u; // Unicode code point is too large
/\u65/u; // Not enough digits
/\c1/u; // Not a letter
```

### Valid cases

```js
/\u0065/u; // Lowercase "e"
/\u{1f600}/u; // Grinning face emoji
/\cA/u; // U+0001 (Start of Heading)
```

## See also

- Regular expressions
- Character escape: `\n`, `\u{...}`
