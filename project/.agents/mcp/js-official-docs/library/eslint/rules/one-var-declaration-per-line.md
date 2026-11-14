---
title: "one-var-declaration-per-line"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/one-var-declaration-per-line.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
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

* `"initializations"` (default) enforces a newline around variable initializations
* `"always"` enforces a newline around variable declarations

### initializations

Examples of **incorrect** code for this rule with the default `"initializations"` option:

**Incorrect:**

```js
/*eslint one-var-declaration-per-line: ["error", "initializations"]*/

var a, b, c = 0;

let d,
    e = 0, f;
```

Examples of **correct** code for this rule with the default `"initializations"` option:

**Correct:**

```js
/*eslint one-var-declaration-per-line: ["error", "initializations"]*/

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
/*eslint one-var-declaration-per-line: ["error", "always"]*/

var a, b;

let c, d = 0;

const e = 0, f = 0;
```

Examples of **correct** code for this rule with the `"always"` option:

**Correct:**

```js
/*eslint one-var-declaration-per-line: ["error", "always"]*/

var a,
    b;

let c,
    d = 0;
```
