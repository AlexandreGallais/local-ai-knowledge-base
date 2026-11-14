---
title: "SyntaxError: invalid capture group name in regular expression"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/regex_invalid_capture_group_name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: invalid capture group name in regular expression

The JavaScript exception "invalid capture group name in regular expression" occurs when a named capturing group or named backreference contains an invalid identifier.

## Message

```plain
SyntaxError: Invalid regular expression: /(?<1>)/: Invalid capture group name (V8-based)
SyntaxError: invalid capture group name in regular expression (Firefox)
SyntaxError: Invalid regular expression: invalid group specifier name (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

Each named capturing group must have a name that is a valid identifier. You cannot use arbitrary strings as the group identifier.

## Examples

### Invalid cases

```js
/(?<1>\d+) (?<2>\d+)/;
```

Or you might be building the regex dynamically:

```js
const tokenTypes = {
  "number literal": /\d+/,
  "string literal": /".+?"/,
  identifier: /[a-zA-Z_]\w*/,
};

const tokenPattern = new RegExp(
  Object.entries(tokenTypes)
    .map(([name, pattern]) => `(?<${name}>${pattern.source})`)
    .join("|"),
);
```

### Valid cases

```js
/(?<group1>\d+) (?<group2>\d+)/;
```

If the regex is built dynamically, make sure the names are all valid identifiers. For example:

```js
const tokenTypes = {
  numberLiteral: /\d+/,
  stringLiteral: /".+?"/,
  identifier: /[a-zA-Z_]\w*/,
};

const tokenPattern = new RegExp(
  Object.entries(tokenTypes)
    .map(([name, pattern]) => `(?<${name}>${pattern.source})`)
    .join("|"),
);
```

## See also

- Regular expressions
- Named capturing group: `(?<name>...)`
