---
title: "SyntaxError: invalid decimal escape in regular expression"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/regex_invalid_decimal_escape/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: invalid decimal escape in regular expression

The JavaScript exception "invalid decimal escape in regular expression" occurs when a legacy octal escape sequence is used in a Unicode-aware regular expression pattern.

## Message

```plain
SyntaxError: Invalid regular expression: /\00/u: Invalid decimal escape (V8-based)
SyntaxError: invalid decimal escape in regular expression (Firefox)
SyntaxError: Invalid regular expression: invalid octal escape for Unicode pattern (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

In a regular expression, `\0` followed by another digit is a _legacy octal escape sequence_. The same syntax is banned in template strings and strict-mode string literals. In regexes, this feature is disabled by the Unicode-aware modes (`u` and `v`). `\0` _not_ followed by another digit is a valid escape sequence that represents the null character (U+0000).

`\` followed by a non-zero digit is a backreference, and is invalid in Unicode-aware mode if it doesn't refer to a capturing group; see invalid identity escape for more information.

## Examples

### Invalid cases

```js
/\00/u;
/\01/u;
```

### Valid cases

```js
// If you want to match NULL followed by a digit, use a character class
/[\0]0/u;
// If you want to match a character by its character value, use \x
/\x01/u;
```

## See also

- Regular expressions
- Escape sequences
- Character escape: `\n`, `\u{...}`
