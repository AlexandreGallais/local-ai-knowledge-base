---
title: "Literal character: a, b"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/regular_expressions/literal_character/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Literal character: a, b

A **literal character** specifies exactly itself to be matched in the input text.

## Syntax

```regex
c
```

### Parameters

- `c`
    A single character that is not one of the syntax characters described below.

## Description

In regular expressions, most characters can appear literally. They are usually the most basic <example-value> blocks of patterns. For example, here is a pattern from the Removing HTML tags example:

```js
const pattern = /<.+?>/g;
```

In this example, `.`, `+`, and `?` are called _syntax characters_. They have special meanings in regular expressions. The rest of the characters in the pattern (`<` and `>`) are literal characters. They match themselves in the input text: the left and right angle brackets.

The following characters are syntax characters in regular expressions, and they cannot appear as literal characters:

- `^`, `$`
- `\`
- `.`
- `*`, `+`, `?`, `{`, `}`
- `(`, `)`
- `[`, `]`
- `|`

Within character classes, more characters can appear literally. For more information, see the Character class page. For example `\.` and `[.]` both match a literal `.`. In `v`-mode character classes, however, there is a different set of characters reserved as syntax characters. To be most comprehensive, below is a table of ASCII characters and whether they may appear escaped or unescaped in different contexts, where "✅" means the character represents itself, "❌" means it throws a syntax error, and "⚠️" means the character is valid but means something other than itself.

       | Characters
       | Outside character classes in `u` or `v` mode
       | In `u`-mode character classes
       | In `v`-mode character classes

       | Unescaped
       | Escaped
       | Unescaped
       | Escaped
       | Unescaped
       | Escaped

       | <code>123456789 "'CEFGHIJKLMNOPQRTUVXY_aceghijklmopquxy</code>
       | ✅ | ❌ | ✅ | ❌ | ✅ | ❌

       | `!#%&,:;<=>@`~`
       | ✅ | ❌ | ✅ | ❌ | ✅ | ✅

       | `]`
       | ❌ | ✅ | ❌ | ✅ | ❌ | ✅

       | `()[{}`
       | ❌ | ✅ | ✅ | ✅ | ❌ | ✅

       | `*+?`
       | ❌ | ✅ | ✅ | ✅ | ✅ | ✅

       | `/`
       | ✅ | ✅ | ✅ | ✅ | ❌ | ✅

       | `0DSWbdfnrstvw`
       | ✅ | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️

       | `ABZz`
       | ✅ | ⚠️ | ✅ | ❌ | ✅ | ❌

       | `$.`
       | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅

       | `|`
       | ⚠️ | ✅ | ✅ | ✅ | ❌ | ✅

       | `-`
       | ✅ | ❌ | ✅⚠️ | ✅ | ❌⚠️ | ✅

       | `^`
       | ⚠️ | ✅ | ✅⚠️ | ✅ | ✅⚠️ | ✅

       | `\`
       | ❌⚠️ | ✅ | ❌⚠️ | ✅ | ❌⚠️ | ✅

> **Note:**
> The characters that can both be escaped and unescaped in `v`-mode character classes are exactly those forbidden as "double punctuators". See `v`-mode character classes for more information.

Whenever you want to match a syntax character literally, you need to escape it with a backslash (`\`). For example, to match a literal `*` in a pattern, you need to write `\*` in the pattern. Using syntax characters as literal characters either leads to unexpected results or causes syntax errors — for example, `/*/` is not a valid regular expression because the quantifier is not preceded by a pattern. In Unicode-unaware mode, `]`, `{`, and `}` may appear literally if it's not possible to parse them as the end of a character class or quantifier delimiters. This is a deprecated syntax for web compatibility, and you should not rely on it.

Regular expression literals cannot be specified with certain non-syntax literal characters. `/` cannot appear as a literal character outside character classes in a regular expression literal, because `/` is used as the delimiter of the literal itself. You need to escape it as `\/` there if you want to match a literal `/`. Inside a character class, `/` can appear unescaped, as in `/[/]/` (unless the `v` flag is set). Line terminators cannot appear as literal characters in a regular expression literal either, because a literal cannot span multiple lines. You need to use a character escape like `\n` instead. These delimiter and line-terminator restrictions do not apply when using the `RegExp()` constructor, although string literals have their own escaping rules (for example, `"\\"` actually denotes a single backslash character, so `new RegExp("\\*")` and `/\*/` are equivalent).

In Unicode-unaware mode, the pattern is interpreted as a sequence of UTF-16 code units. This means surrogate pairs actually represent two literal characters. This causes unexpected behaviors when paired with other features:

```js
/^[😄]$/.test("😄"); // false, because the pattern is interpreted as /^[\ud83d\ude04]$/
/^😄+$/.test("😄😄"); // false, because the pattern is interpreted as /^\ud83d\ude04+$/
```

In Unicode-aware mode, the pattern is interpreted as a sequence of Unicode code points, and surrogate pairs do not get split. Therefore, you should always prefer to use the `u` flag.

## Examples

### Using literal characters

The following example is copied from Character escape. The `a` and `b` characters are literal characters in the pattern, and `\n` is an escaped character because it cannot appear literally in a regular expression literal.

```js
const pattern = /a\nb/;
const string = `a
b`;
console.log(pattern.test(string)); // true
```

## See also

- Character classes guide
- Regular expressions
- Character escape: `\n`, `\u{...}`
