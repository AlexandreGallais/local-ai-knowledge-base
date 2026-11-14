---
title: "SyntaxError: negated character class with strings in regular expression"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/regex_negated_char_class_with_strings/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: negated character class with strings in regular expression

The JavaScript exception "negated character class with strings in regular expression" occurs when a `v`-mode character class is negated and may be able to match a string (more than one character).

## Message

```plain
SyntaxError: Invalid regular expression: /[^\p{RGI_Emoji_Flag_Sequence}]/v: Negated character class may contain strings (V8-based)
SyntaxError: negated character class with strings in regular expression (Firefox)
SyntaxError: Invalid regular expression: negated class set may contain strings (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

In `v` mode, character classes are able to match more than 1 character. For example, `/[\q{abc}]/v` would match the sequence `"abc"`, and `/[\p{RGI_Emoji_Flag_Sequence}]/v` would match any character sequence that represents an emoji flag. However, negated character classes `[^...]` are not allowed to match strings, so `/[^\p{RGI_Emoji_Flag_Sequence}]/v` is invalid, because it's unclear how many characters it should match. For more information, see the `v`-mode character class reference.

## Examples

### Invalid cases

```js
/[^\p{RGI_Emoji_Flag_Sequence}]/v;
```

### Valid cases

```js
// Matches two characters that are not an emoji flag sequence
/(?!\p{RGI_Emoji_Flag_Sequence})../v;
```

## See also

- Regular expressions
- Character class: `[...]`, `[^...]`
- Unicode character class escape: `\p{...}`, `\P{...}`
