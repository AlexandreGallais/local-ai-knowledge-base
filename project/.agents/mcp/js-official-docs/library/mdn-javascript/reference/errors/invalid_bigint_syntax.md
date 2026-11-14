---
title: "SyntaxError: invalid BigInt syntax"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/invalid_bigint_syntax/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: invalid BigInt syntax

The JavaScript exception "invalid BigInt syntax" occurs when a string value is being coerced to a `BigInt` but it failed to be parsed as an integer.

## Message

```plain
SyntaxError: Cannot convert x to a BigInt (V8-based)
SyntaxError: invalid BigInt syntax (Firefox)
SyntaxError: Failed to parse String to BigInt (Safari)
```

## Error type

`SyntaxError`.

## What went wrong?

When using the `BigInt()` function to convert a string to a BigInt, the string will be parsed in the same way as source code, and the resulting value must be an integer value.

## Examples

### Invalid cases

```js
const a = BigInt("1.5");
const b = BigInt("1n");
const c = BigInt.asIntN(4, "8n");
// SyntaxError: invalid BigInt syntax
```

### Valid cases

```js
const a = BigInt("1");
const b = BigInt("  1   ");
const c = BigInt.asIntN(4, "8");
```

## See also

- `BigInt`
