---
title: "Input boundary assertion: ^, $"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/regular_expressions/input_boundary_assertion/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Input boundary assertion: ^, $

An **input boundary assertion** checks if the current position in the string is an input boundary. An input boundary is the start or end of the string; or, if the `m` flag is set, the start or end of a line.

> **Note:**
> To match the start and end of the entire string in `m` mode, use the buffer boundary assertions `\A` and `\z`.

## Syntax

```regex
^
$
```

## Description

`^` asserts that the current position is the start of input. `$` asserts that the current position is the end of input. Both are _assertions_, so they don't consume any characters.

More precisely, `^` asserts that the character to the left is out of bounds of the string; `$` asserts that the character to the right is out of bounds of the string. If the `m` flag is set, `^` also matches if the character to the left is a line terminator character, and `$` also matches if the character to the right is a line terminator.

Unless the `m` flag is set, these assertions only make sense when no characters are expected to the left or right of them. For example, `f^o` never matches because it's not possible for `^` to both be at the start of the string and have a character to its left.

These assertions don't change the match locations when the `y` flag is used — see also anchored sticky flag.

## Examples

### Removing trailing slashes

The following example removes trailing slashes from a URL string:

```js
function removeTrailingSlash(url) {
  return url.replace(/\/$/, "");
}

removeTrailingSlash("https://example.com/"); // "https://example.com"
removeTrailingSlash("https://example.com/docs/"); // "https://example.com/docs"
```

### Matching file extensions

The following example checks file types by matching the file extension, which always comes at the end of the string:

```js
function isImage(filename) {
  return /\.(?:png|jpe?g|webp|avif|gif)$/i.test(filename);
}

isImage("image.png"); // true
isImage("image.jpg"); // true
isImage("image.pdf"); // false
```

### Matching entire input

Sometimes you want to make sure that your regex matches the entire input, not just a substring of the input. For example, if you are determining if a string is a valid identifier, you can add input boundary assertions to both ends of the pattern:

```js
function isValidIdentifier(str) {
  return /^[$_\p{ID_Start}][$_\p{ID_Continue}]*$/u.test(str);
}

isValidIdentifier("foo"); // true
isValidIdentifier("$1"); // true
isValidIdentifier("1foo"); // false
isValidIdentifier("  foo  "); // false
```

This function is useful when doing codegen (generating code using code), because you can use valid identifiers differently from other string properties, such as dot notation instead of bracket notation:

```js
const variables = ["foo", "foo:bar", "  foo  "];

function toAssignment(key) {
  if (isValidIdentifier(key)) {
    return `globalThis.${key} = undefined;`;
  }
  // JSON.stringify() escapes quotes and other special characters
  return `globalThis[${JSON.stringify(key)}] = undefined;`;
}

const statements = variables.map(toAssignment).join("\n");

console.log(statements);
// globalThis.foo = undefined;
// globalThis["foo:bar"] = undefined;
// globalThis["  foo  "] = undefined;
```

## See also

- Assertions guide
- Regular expressions
- Buffer boundary assertion: `\A`, `\z`, `\Z`
- Word boundary assertion: `\b`, `\B`
- Lookahead assertion: `(?=...)`, `(?!...)`
- Lookbehind assertion: `(?<=...)`, `(?<!...)`
