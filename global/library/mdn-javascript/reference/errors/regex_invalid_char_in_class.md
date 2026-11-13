---
title: "SyntaxError: invalid character in class in regular expression"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/regex_invalid_char_in_class/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: invalid character in class in regular expression

The JavaScript exception "invalid character in class in regular expression" occurs when a character appears in a `v`-mode character class but it's not allowed to appear literally.

## Message

```plain
SyntaxError: Invalid regular expression: /[|]/v: Invalid character in character class (V8-based)
SyntaxError: invalid character in class in regular expression (Firefox)
SyntaxError: Invalid regular expression: invalid class set character (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

Normally, character classes can contain almost all characters literally. However, the `v` mode made the character class syntax more sophisticated, and in order to leave room for future syntax extensions, some syntax characters are forbidden from appearing literally in a character class. They include: `(`, `)`, `[`, `]`, `{`, `}`, `/`, `-`, `|`. If you want to match these literal characters, escape them; for example: `/[\|]/v`.

## Examples

### Invalid cases

```js
/[(){}]/v;
```

### Valid cases

```js
/[\(\)\\{\\}]/v;
```

## See also

- Regular expressions
- Character class: `[...]`, `[^...]`
