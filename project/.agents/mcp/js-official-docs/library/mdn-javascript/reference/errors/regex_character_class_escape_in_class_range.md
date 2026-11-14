---
title: "SyntaxError: character class escape cannot be used in class range in regular expression"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/regex_character_class_escape_in_class_range/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: character class escape cannot be used in class range in regular expression

The JavaScript exception "character class escape cannot be used in class range in regular expression" occurs when a Unicode-aware regular expression pattern contains a character class where a boundary of a character range is another character class, such as a character class escape.

## Message

```plain
SyntaxError: Invalid regular expression: /[\s-1]/u: Invalid character class (V8-based)
SyntaxError: character class escape cannot be used in class range in regular expression (Firefox)
SyntaxError: Invalid regular expression: invalid range in character class for Unicode pattern (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

A character class can specify a range of characters by using a hyphen (`-`) between two characters. For example, `[a-z]` matches any lowercase letter from `a` to `z`. The two bounds of the range must represent single characters in order for the range to make sense. If one of the bounds actually represents multiple characters, an error is generated. In non-`v`-mode character classes, only character class escapes are allowed inside character classes; in `v`-mode character classes, this can also happen if one the bounds is another `[...]` character class.

In Unicode-unaware mode, this syntax causes the `-` to become a literal character instead of generating an error, but this is a deprecated syntax and you should not rely on it.

## Examples

### Invalid cases

```js
/[\s-_]/u; // \s is a character class escape for whitespace
/[A-\D]/u; // \D is a character class escape for non-digits
/[\p{L}-\p{N}]/u; // \p{L} is a character class escape for Unicode letters
/[[A-z]-_]/v; // In unicodeSets mode, character classes can be nested
```

### Valid cases

```js
// Put the hyphen at the start of the character class,
// so it matches the literal character
/[-\s_]/u;
// Escape the hyphen so it also matches the literal character
/[\s\-_]/u;
// Remove the backslash so the bound is a literal character
/[A-D]/u;
// Remove the hyphen so the two bounds represent two alternatives
/[\p{L}\p{N}]/u;
// Use -- in unicodeSets mode, which represents set subtraction
/[[A-z]--_]/v;
```

## See also

- Regular expressions
- Character class: `[...]`, `[^...]`
