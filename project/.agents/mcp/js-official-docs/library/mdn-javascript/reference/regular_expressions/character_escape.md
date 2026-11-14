---
title: "Character escape: \\\\n, \\\\u{...}"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/regular_expressions/character_escape/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Character escape: \\n, \\u{...}

A **character escape** represents a character that may not be able to be conveniently represented in its literal form.

## Syntax

```regex
\f, \n, \r, \t, \v
\cA, \cB, …, \cz
\0
\^, \$, \\, \., \*, \+, \?, \(, \), \[, \], \\{, \\}, \|, \/

\xHH
\uHHHH
\u{H…H}
```

> **Note:**
> `,` is not part of the syntax.

### Parameters

- `H…H`
    A hexadecimal number representing the Unicode code point of the character. The `\xHH` form must have two hexadecimal digits; the `\uHHHH` form must have four; the `\u{H…H}` form must have one or more hexadecimal digits representing a value no greater than `0x10FFFF`.

## Description

The following character escapes are recognized in regular expressions:

- `\f`, `\n`, `\r`, `\t`, `\v`
    Same as those in string literals, except `\b`, which represents a word boundary in regexes unless in a character class.
- `\c` followed by a letter from `A` to `Z` or `a` to `z`
    Represents the control character with value equal to the letter's character value modulo 32. For example, `\cJ` represents line break (`\n`), because the code point of `J` is 74, and 74 modulo 32 is 10, which is the code point of line break. Because an uppercase letter and its lowercase form differ by 32, `\cJ` and `\cj` are equivalent. You can represent control characters from 1 to 26 in this form.
- `\0`
    Represents the U+0000 NUL character. Cannot be followed by a digit (which makes it a legacy octal escape sequence).
- `\^`, `\$`, `\\`, `\.`, `\*`, `\+`, `\?`, `\(`, `\)`, `\[`, `\]`, `\\{`, `\\}`, `\|`, `\/`
    Represents the character itself. For example, `\\` represents a backslash, and `\(` represents a left parenthesis. These are syntax characters in regexes (`/` is the delimiter of a regex literal), so they require escaping unless in a character class.
- `\xHH`
    Represents the character with the given hexadecimal Unicode code point. The hexadecimal number must be exactly two digits long.
- `\uHHHH`
    Represents the character with the given hexadecimal Unicode code point. The hexadecimal number must be exactly four digits long. Two such escape sequences can be used to represent a surrogate pair in Unicode-aware mode. (In Unicode-unaware mode, they are always two separate characters.)
- `\u{H…H}`
    (Unicode-aware mode only) Represents the character with the given hexadecimal Unicode code point. The hexadecimal number must have one or more digits and a value no greater than `0x10FFFF`. Leading zeros are allowed, so the number can be arbitrarily long.

In Unicode-unaware mode, escape sequences that are not one of the above become _identity escapes_: they represent the character that follows the backslash. For example, `\a` represents the character `a`. This behavior limits the ability to introduce new escape sequences without causing backward compatibility issues, and is therefore forbidden in Unicode-aware mode.

In Unicode-unaware mode, `]`, `{`, and `}` may appear literally if it's not possible to parse them as the end of a character class or quantifier delimiters. This is a deprecated syntax for web compatibility, and you should not rely on it.

In Unicode-unaware mode, escape sequences within character classes of the form `\cX` where `X` is a number or `_` are decoded in the same way as those with ASCII letters: `\c0` is the same as `\cP` when taken modulo 32. In addition, if the form `\cX` is encountered anywhere where `X` is not one of the recognized characters, then the backslash is treated as a literal character. These syntaxes are also deprecated.

```js
/[\c0]/.test("\x10"); // true
/[\c_]/.test("\x1f"); // true
/[\c*]/.test("\\"); // true
/\c/.test("\\c"); // true
/\c0/.test("\\c0"); // true (the \c0 syntax is only supported in character classes)
```

## Examples

### Using character escapes

Character escapes are useful when you want to match a character that is not easily represented in its literal form. For example, you cannot use a line break literally in a regex literal, so you must use a character escape:

```js
const pattern = /a\nb/;
const string = `a
b`;
console.log(pattern.test(string)); // true
```

## See also

- Character classes guide
- Regular expressions
- Character class: `[...]`, `[^...]`
- Character class escape: `\d`, `\D`, `\w`, `\W`, `\s`, `\S`
- Literal character: `a`, `b`
- Unicode character class escape: `\p{...}`, `\P{...}`
- Backreference: `\1`, `\2`
- Named backreference: `\k<name>`
- Word boundary assertion: `\b`, `\B`
