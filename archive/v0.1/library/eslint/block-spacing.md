---
title: "block-spacing"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/block-spacing.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# block-spacing

## Rule Details

This rule enforces consistent spacing inside an open block token and the next token on the same line. This rule also enforces consistent spacing inside a close block token and previous token on the same line.

## Options

This rule has a string option:

* `"always"` (default) requires one or more spaces
* `"never"` disallows spaces

### always

Examples of **incorrect** code for this rule with the default `"always"` option:

**Incorrect:**

```js
/*eslint block-spacing: "error"*/

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
/*eslint block-spacing: "error"*/

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
/*eslint block-spacing: ["error", "never"]*/

function foo() { return true; }
if (foo) { bar = 0;}

class C {
    static { this.bar = 0; }
}
```

Examples of **correct** code for this rule with the `"never"` option:

**Correct:**

```js
/*eslint block-spacing: ["error", "never"]*/

function foo() {return true;}
if (foo) {bar = 0;}

class C {
    static {this.bar = 0;}
}
```

## When Not To Use It

If you don't want to be notified about spacing style inside of blocks, you can safely disable this rule.
