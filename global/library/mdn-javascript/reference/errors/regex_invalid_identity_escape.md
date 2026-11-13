---
title: "SyntaxError: invalid identity escape in regular expression"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/regex_invalid_identity_escape/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: invalid identity escape in regular expression

The JavaScript exception "invalid identity escape in regular expression" occurs when a Unicode-aware regular expression pattern contains an escape sequence that does not represent a recognized escape sequence.

## Message

```plain
SyntaxError: Invalid regular expression: /\q/u: Invalid escape (V8-based)
SyntaxError: invalid identity escape in regular expression (Firefox)
SyntaxError: Invalid regular expression: invalid escaped character for Unicode pattern (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

In Unicode-unaware mode, `\` could be used to escape any character, including those without a defined meaning. In these cases, the escaped character represents itself. For example, `\q` would match the character `q`. This severely limits the ability to add new escape sequences in the future, so in Unicode-aware mode, only recognized escape sequences are allowed. Do not add `\` redundantly.

This error is also thrown when the `\x` character escape is not followed by two hexadecimal digits.

For an exhaustive list of available escape sequences, see the regular expressions reference. For a table of which characters can appear literally escaped or unescaped in each context, see literal characters.

## Examples

### Invalid cases

```js
/[\f\v\n\t\ ]/u;
```

### Valid cases

```js
// There's no need to escape the space
/[\f\v\n\t ]/u;
```

## See also

- Regular expressions
- Escape sequences
- Character escape: `\n`, `\u{...}`
- Literal character: `a`, `b`
