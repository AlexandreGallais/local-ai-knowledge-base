---
title: "block-spacing"
tool: "eslint-stylistic"
version: "5.10"
source: "https://github.com/eslint-stylistic/eslint-stylistic/blob/efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712/packages/eslint-plugin/rules/block-spacing/README.md"
commit: "efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712"
license: "MIT"
---

# block-spacing

## Rule Details

This rule enforces consistent spacing inside an open block token and the next token on the same line. This rule also enforces consistent spacing inside a close block token and previous token on the same line.

## Options

This rule has a string option:

- `"always"` (default) requires one or more spaces
- `"never"` disallows spaces

### always

Examples of **incorrect** code for this rule with the default `"always"` option:

**Incorrect:**

```js
/* eslint @stylistic/block-spacing: "error" */

function foo() {return true;}
if (foo) { bar = 0;}
function baz() {let i = 0;
    return i;
}

class C {
    static {this.bar = 0;}
}
```

Examples of **correct** code for this rule with the default `"always"` option:

**Correct:**

```js
/* eslint @stylistic/block-spacing: "error" */

function foo() { return true; }
if (foo) { bar = 0; }

class C {
    static { this.bar = 0; }
}
```

### never

Examples of **incorrect** code for this rule with the `"never"` option:

**Incorrect:**

```js
/* eslint @stylistic/block-spacing: ["error", "never"] */

function foo() { return true; }
if (foo) { bar = 0;}

class C {
    static { this.bar = 0; }
}
```

Examples of **correct** code for this rule with the `"never"` option:

**Correct:**

```js
/* eslint @stylistic/block-spacing: ["error", "never"] */

function foo() {return true;}
if (foo) {bar = 0;}

class C {
    static {this.bar = 0;}
}
```

## When Not To Use It

If you don't want to be notified about spacing style inside of blocks, you can safely disable this rule.
