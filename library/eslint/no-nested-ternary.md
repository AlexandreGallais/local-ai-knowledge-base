---
title: "no-nested-ternary"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-nested-ternary.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-nested-ternary

Nesting ternary expressions can make code more difficult to understand.

```js
const foo = bar ? baz : qux === quxx ? bing : bam;
```

## Rule Details

The `no-nested-ternary` rule disallows nested ternary expressions.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-nested-ternary: "error"*/

const thing = foo ? bar : baz === qux ? quxx : foobar;

foo ? baz === qux ? quxx() : foobar() : bar();
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-nested-ternary: "error"*/

const thing = foo ? bar : foobar;

let otherThing;

if (foo) {
  otherThing = bar;
} else if (baz === qux) {
  otherThing = quxx;
} else {
  otherThing = foobar;
}
```

## Options

This rule has no options.
