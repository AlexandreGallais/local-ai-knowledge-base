---
title: "Backreference: \\\\1, \\\\2"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/regular_expressions/backreference/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Backreference: \\1, \\2

A **backreference** refers to the submatch of a previous capturing group and matches the same text as that group. For named capturing groups, you may prefer to use the named backreference syntax.

## Syntax

```regex
\N
```

> **Note:**
> `N` is not a literal character.

### Parameters

- `N`
    A positive integer referring to the number of a capturing group.

## Description

A backreference is a way to match the same text as previously matched by a capturing group. Capturing groups count from 1, so the first capturing group's result can be referenced with `\1`, the second with `\2`, and so on. `\0` is a character escape for the NUL character.

In case-insensitive matching, the backreference may match text with different casing from the original text.

```js
/(b)\1/i.test("bB"); // true
```

The backreference must refer to an existent capturing group. If the number it specifies is greater than the total number of capturing groups, a syntax error is thrown.

```js
/(a)\2/u; // SyntaxError: Invalid regular expression: Invalid escape
```

The entire sequence of decimal digits is interpreted as the capturing group number. For example, `\12` refers to the twelfth capturing group, not the first capturing group followed by a literal `2`.

In Unicode-unaware mode, if that capturing group does not exist, the escape is interpreted differently depending on its first digit:

- If it starts with `1` through `7`, it becomes a legacy octal escape sequence, consuming up to three octal digits with a maximum value of `0o377`. Any remaining digits are literal characters.
- If it starts with `8` or `9`, it becomes an identity escape, matching the digit itself. Any remaining digits are literal characters.

The parser does not retry a shorter capturing group number.

These are deprecated syntaxes for web compatibility, and you should not rely on them.

```js
/(a)\2/.test("a\x02"); // true
/(a)\12/.test("a\n"); // true; octal 12, not a backreference to group 1 followed by 2
/\18/.test("\x018"); // true; octal 1 followed by a literal 8
/\1234/.test("S4"); // true; octal 123 followed by a literal 4
/\400/.test(" 0"); // true; octal 40 followed by a literal 0
/\89/.test("89"); // true; identity escape followed by a literal 9
```

If the referenced capturing group is unmatched (for example, because it belongs to an unmatched alternative in a disjunction), or the group hasn't matched yet (for example, because it lies to the right of the backreference), the backreference always succeeds (as if it matches the empty string).

```js
/(?:a|(b))\1c/.test("ac"); // true
/\1(a)/.test("a"); // true
```

## Examples

### Pairing quotes

The following function matches the `title='xxx'` and `title="xxx"` patterns in a string. To ensure the quotes match, we use a backreference to refer to the first quote. Accessing the second capturing group (`[2]`) returns the string between the matching quote characters:

```js
function parseTitle(metastring) {
  return metastring.match(/title=(["'])(.*?)\1/)[2];
}

parseTitle('title="foo"'); // 'foo'
parseTitle("title='foo' lang='en'"); // 'foo'
parseTitle('title="Named capturing groups\' advantages"'); // "Named capturing groups' advantages"
```

### Matching duplicate words

The following function finds duplicate words in a string (which are usually typos). Note that it uses the `\w` character class escape, which only matches English letters but not any accented letters or other alphabets. If you want more generic matching, you may want to split the string by whitespace and iterate over the resulting array.

```js
function findDuplicates(text) {
  return text.match(/\b(\w+)\s+\1\b/i)?.[1];
}

findDuplicates("foo foo bar"); // 'foo'
findDuplicates("foo bar foo"); // undefined
findDuplicates("Hello hello"); // 'Hello'
findDuplicates("Hello hellos"); // undefined
```

## See also

- Groups and backreferences guide
- Regular expressions
- Capturing group: `(...)`
- Named capturing group: `(?<name>...)`
- Named backreference: `\k<name>`
