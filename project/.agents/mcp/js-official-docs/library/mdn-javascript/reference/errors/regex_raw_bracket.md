---
title: "SyntaxError: raw bracket is not allowed in regular expression with unicode flag"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/regex_raw_bracket/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: raw bracket is not allowed in regular expression with unicode flag

The JavaScript exception "raw bracket is not allowed in regular expression with unicode flag" occurs when a Unicode-aware regular expression pattern contains a raw bracket (`{`, `}`, `]`) that is not part of a quantifier or character class.

## Message

```plain
SyntaxError: Invalid regular expression: /{/u: Lone quantifier brackets (V8-based)
SyntaxError: raw bracket is not allowed in regular expression with unicode flag (Firefox)
SyntaxError: Invalid regular expression: incomplete {} quantifier for Unicode pattern (Safari)
SyntaxError: Invalid regular expression: unmatched ] or } bracket for Unicode pattern (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

In Unicode-unaware mode, `{`, `}`, and `]` that are not part of a quantifier or character class are treated as literal characters. This may hide errors in your code and is therefore deprecated and disallowed in Unicode-aware mode. You should either check whether you have invalid syntax or you should escape the characters to match them literally.

If `{` appears in a context that accepts a quantifier, it is treated as the start of a quantifier. If what follows it is not a valid quantifier, another syntax error, incomplete quantifier, is thrown.

## Examples

### Invalid cases

```js
/\{{MDN_Macro}}/u;
/\[sic]/u;
```

### Valid cases

```js
// All { and } need to be escaped
/\\{\\{MDN_Macro\\}\\}/u;
// The ] needs to be escaped
/\[sic\]/u;
```

## See also

- Regular expressions
- Character class: `[...]`, `[^...]`
- Character escape: `\n`, `\u{...}`
- Quantifier: `*`, `+`, `?`, `{n}`, `{n,}`, `{n,m}`
