---
title: "one-var-declaration-per-line"
tool: "eslint-stylistic"
version: "5.10"
source: "https://github.com/eslint-stylistic/eslint-stylistic/blob/efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712/packages/eslint-plugin/rules/one-var-declaration-per-line/README.md"
commit: "efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712"
license: "MIT"
---

# one-var-declaration-per-line

Some developers declare multiple var statements on the same line:

```js
var foo, bar, baz;
```

Others prefer to declare one var per line.

```js
var foo,
    bar,
    baz;
```

Keeping to one of these styles across a project's codebase can help with maintaining code consistency.

## Rule Details

This rule enforces a consistent newlines around variable declarations. This rule ignores variable declarations inside `for` loop conditionals.

## Options

This rule has a single string option:

- `"initializations"` (default) enforces a newline around variable initializations
- `"always"` enforces a newline around variable declarations

### initializations

Examples of **incorrect** code for this rule with the default `"initializations"` option:

**Incorrect:**

```js
/* eslint @stylistic/one-var-declaration-per-line: ["error", "initializations"] */

var a, b, c = 0;

let d,
    e = 0, f;
```

Examples of **correct** code for this rule with the default `"initializations"` option:

**Correct:**

```js
/* eslint @stylistic/one-var-declaration-per-line: ["error", "initializations"] */

var a, b;

let c,
    d;

let e,
    f = 0;
```

### always

Examples of **incorrect** code for this rule with the `"always"` option:

**Incorrect:**

```js
/* eslint @stylistic/one-var-declaration-per-line: ["error", "always"] */

var a, b;

let c, d = 0;

const e = 0, f = 0;
```

Examples of **correct** code for this rule with the `"always"` option:

**Correct:**

```js
/* eslint @stylistic/one-var-declaration-per-line: ["error", "always"] */

var a,
    b;

let c,
    d = 0;
```
