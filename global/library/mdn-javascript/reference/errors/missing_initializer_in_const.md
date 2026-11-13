---
title: "SyntaxError: missing = in const declaration"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/missing_initializer_in_const/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: missing = in const declaration

The JavaScript exception "missing = in const declaration" occurs when a const
declaration was not given a value in the same statement (like
`const RED_FLAG;`). You need to provide one
(`const RED_FLAG = true`).

## Message

```plain
SyntaxError: Missing initializer in const declaration (V8-based)
SyntaxError: missing = in const declaration (Firefox)
SyntaxError: Unexpected token '<example-value>'. const declared variable '<example-value>' must have an initializer. (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

A constant is a value that cannot be altered by the program during normal execution. It
cannot change through re-assignment, and it can't be redeclared. In JavaScript,
constants are declared using the
`const`
keyword. An initializer for a constant is required; that is, you must specify its value
in the same statement in which it's declared (which makes sense, given that it can't be
changed later).

## Examples

### Missing const initializer

Unlike `var` or `let`, you must specify a value for a
`const` declaration. This throws:

```js
const COLUMNS;
// SyntaxError: missing = in const declaration
```

### Fixing the error

There are multiple options to fix this error. Check what was intended to be achieved
with the constant in question.

#### Adding a constant value

Specify the constant value in the same statement in which it's declared:

```js
const COLUMNS = 80;
```

#### `const`, `let` or `var`?

Do not use `const` if you weren't meaning to declare a constant. Maybe you
meant to declare a block-scoped variable with
`let` or
global variable with
`var`. Both
don't require an initial value.

```js
let columns;
```

## See also

- `const`
- `let`
- `var`
