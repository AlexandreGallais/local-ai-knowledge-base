---
title: "SyntaxError: invalid range in character class"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/regex_invalid_range_in_character_class/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: invalid range in character class

The JavaScript exception "invalid range in character class" occurs when a character class in a regular expression uses a range, but the start of the range is greater than the end.

## Message

```plain
SyntaxError: Invalid regular expression: /[2-1]/: Range out of order in character class (V8-based)
SyntaxError: invalid range in character class (Firefox)
SyntaxError: Invalid regular expression: range out of order in character class (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

In character classes, you can join two characters with a hyphen `-` to represent an inclusive interval of characters based on their Unicode code points. For example, `[a-z]` matches any lowercase letter. However, if the end of the range is less than the start, the range cannot match anything and is likely a mistake.

## Examples

### Invalid cases

```js
/[9-1]/; // The range is out of order
/[_-=]/; // _ has value 95, = has value 61
```

### Valid cases

```js
/[1-9]/; // Swap the range
/[_\-=]/; // Escape the hyphen so it matches the literal character
```

## See also

- Regular expressions
- Character class: `[...]`, `[^...]`
