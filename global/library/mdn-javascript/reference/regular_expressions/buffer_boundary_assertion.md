---
title: "Buffer boundary assertion: \\\\A, \\\\z, \\\\Z"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/regular_expressions/buffer_boundary_assertion/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Buffer boundary assertion: \\A, \\z, \\Z

A **buffer boundary assertion** checks if the current position in the string is strictly at the start or end of the entire string (`\Z` also allows a trailing newline), regardless of the presence of the `m` flag (which changes the meanings of the `^` and `$` input boundary assertions). It's only supported in Unicode-aware mode.

## Syntax

```regex
\A
\z
\Z
```

## Description

`\A` asserts that the current position is the start of the entire string. `\z` asserts that the current position is the end of the entire string. `\Z` is like `\z`, but also matches before a line terminator or `\r\n` (CRLF) sequence at the end of the string. All of them are _assertions_, so they don't consume any characters.

More precisely, `\A` asserts that the character to the left is out of bounds of the string; `\z` asserts that the character to the right is out of bounds of the string; `\Z` is equivalent to `(?=(?:\r?\n?|[\u{2028}\u{2029}]?)\z)`.

These assertions only make sense when no characters are expected to the left or right of them. For example, `f\Ao` never matches because it's not possible for `\A` to both be at the start of the string and have a character to its left.

The `\A` and `\z` assertions are only useful when the `m` flag is used. Without `m`, they behave just like `^` and `$`. If your pattern only needs to match the start or end of the entire string or a line (and never a mix of both), the recommended approach is to still use the `^` and `$` assertions, and set the `m` flag as needed, because they are more widely supported than the buffer boundary assertions. If you need to match both types of boundaries in the same pattern, you can technically use modifiers to enable or disable the `m` flag in different parts of the pattern, but using these escape sequences makes the code much more readable.

## Examples

### Mixing buffer and input boundary assertions

Suppose you have a pattern that needs to match either at the start of the whole string or the start of one line. You can turn on `m` so that you can use `^` to refer to the latter, and then use `\A` to refer to the former (you also need to turn on `u` so you can use `\A`).

This example matches line comments on their own lines, which can be a hashbang at start of a file or a line comment on any line. It does not match line comments at the end of a line containing code.

```js
function findLineComments(code) {
  // Matches the hashbang syntax: #!... (which is only valid at start of file)
  // and line comment syntax: //... (which is valid everywhere)
  const pattern = /\A#!.*|^\s*\/\/.*/gmu;
  return code.match(pattern);
}

const program = `#!/usr/env/node

function findLineComments(code) {
  // Matches the hashbang syntax: #!... (which is only valid at start of file)
  // and line comment syntax: //... (which is valid everywhere)
  const pattern = /\\A#!.*|^\\/\\/.*/gmu;
  return code.match(pattern);
}
`;

console.log(findLineComments(program));
// [
//   '#!/usr/env/node',
//   '  // Matches the hashbang syntax: #!... (which is only valid at start of file)',
//   '  // and line comment syntax: //... (which is valid everywhere)'
// ]
```

Another major use case of buffer boundary assertions is when you cannot modify the flags, such as regular expression search in text editors. These cases usually enable `m` by default, so you need to use `\A` and `\z` to "opt out".

### Matching the end-of-file but allowing an optional trailing newline

File formats often allow an optional newline at the end of the file. If you want to match an end-of-file pattern that allows the trailing newline, you can use `\Z`. This feature is useful with or without the `m` flag.

```js
const endOfPDF = /%%EOF\Z/u;

console.log(endOfPDF.test("%%EOF")); // true
console.log(endOfPDF.test("%%EOF\n")); // true
console.log(endOfPDF.test("%%EOF\r\n")); // true
console.log(endOfPDF.test("%%EOF\n\n")); // false
console.log(endOfPDF.test("%%EOF\nsomething")); // false
```

## See also

- Assertions guide
- Regular expressions
- Input boundary assertion: `^`, `$`
- Word boundary assertion: `\b`, `\B`
- Lookahead assertion: `(?=...)`, `(?!...)`
- Lookbehind assertion: `(?<=...)`, `(?<!...)`
