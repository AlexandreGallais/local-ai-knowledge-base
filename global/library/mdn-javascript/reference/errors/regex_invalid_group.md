---
title: "SyntaxError: invalid regexp group"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/regex_invalid_group/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: invalid regexp group

The JavaScript exception "invalid regexp group" occurs when the sequence `(?` does not start a valid group syntax. Recognized group syntaxes that start with `(?` include:

- `(?:` for non-capturing groups
- `(?=` for positive lookahead
- `(?!` for negative lookahead
- `(?<=` for positive lookbehind
- `(?<!` for negative lookbehind
- `(?<` for named capturing groups
- `(?-i:`, `(?i:`, `(?m:`, `(?ims-:`, etc. for modifiers

`(?` followed by any other character would cause this error.

## Message

```plain
SyntaxError: Invalid regular expression: /(?1)/: Invalid group (V8-based)
SyntaxError: invalid regexp group (Firefox)
SyntaxError: Invalid regular expression: unrecognized character after (? (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

`?` is not an atom, so it does not make sense to appear at the start of a capturing group (`?` is a quantifier and should be placed after an atom). Maybe you want to match the `?` character literally, in which case you should escape it with a backslash (`\?`). Maybe you remembered the regex syntax wrong, and you intend to use one of the recognized group syntaxes listed above. Maybe you are using a feature that is not supported by the current JavaScript engine.

## Examples

### Invalid cases

```js
/Hello(?|!)/;
// This is Perl syntax
/(?[\p{Thai}&\p{Digit}])/;
```

### Valid cases

```js
/Hello(\?|!)/;
// This is JavaScript syntax for character set operations
/[\p{Script=Thai}&&\p{Nd}]/v;
```

## See also

- Regular expressions
- Capturing group: `(...)`
- Lookahead assertion: `(?=...)`, `(?!...)`
- Lookbehind assertion: `(?<=...)`, `(?<!...)`
- Modifier: `(?ims-ims:...)`
- Named capturing group: `(?<name>...)`
- Non-capturing group: `(?:...)`
