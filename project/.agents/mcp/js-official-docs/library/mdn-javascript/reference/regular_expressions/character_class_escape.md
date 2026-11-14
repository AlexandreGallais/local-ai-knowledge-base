---
title: "Character class escape: \\\\d, \\\\D, \\\\w, \\\\W, \\\\s, \\\\S"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/regular_expressions/character_class_escape/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Character class escape: \\d, \\D, \\w, \\W, \\s, \\S

A **character class escape** is an escape sequence that represents a set of characters.

## Syntax

```regex
\d, \D
\s, \S
\w, \W
```

> **Note:**
> `,` is not part of the syntax.

## Description

Unlike character escapes, character class escapes represent a predefined _set_ of characters, much like a character class. The following character classes are supported:

- `\d`
    Matches any digit character. Equivalent to `[0-9]`.
- `\w`
    Matches any word character, where a word character includes letters (A–Z, a–z), numbers (0–9), and underscore (\_). If the regex is Unicode-aware and the `i` flag is set, it also matches other Unicode characters that get canonicalized to one of the characters above through case folding.
- `\s`
    Matches any whitespace or line terminator character.

The uppercase forms `\D`, `\W`, and `\S` create complement character classes for `\d`, `\w`, and `\s`, respectively. They match any character that is not in the set of characters matched by the lowercase form.

Unicode character class escapes start with `\p` and `\P`, but they are only supported in Unicode-aware mode. In Unicode-unaware mode, they are identity escapes for the `p` or `P` character.

Character class escapes can be used in character classes. However, they cannot be used as boundaries of character ranges, which is only allowed as a deprecated syntax for web compatibility, and you should not rely on it.

## Examples

### Splitting by whitespace

The following example splits a string into an array of words, supporting all kinds of whitespace separators:

```js
function splitWords(str) {
  return str.split(/\s+/);
}

splitWords(`Look at the stars
Look  how they\tshine for you`);
// ['Look', 'at', 'the', 'stars', 'Look', 'how', 'they', 'shine', 'for', 'you']
```

## See also

- Character classes guide
- Regular expressions
- Character class: `[...]`, `[^...]`
- Unicode character class escape: `\p{...}`, `\P{...}`
- Character escape: `\n`, `\u{...}`
- Disjunction: `|`
