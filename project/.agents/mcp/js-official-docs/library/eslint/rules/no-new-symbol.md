---
title: "no-new-symbol"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-new-symbol.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-new-symbol

`Symbol` is not intended to be used with the `new` operator, but to be called as a function.

```js
var foo = new Symbol("foo");
```

This throws a `TypeError` exception.

## Rule Details

This rule is aimed at preventing the accidental calling of `Symbol` with the `new` operator.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-new-symbol: "error"*/

var foo = new Symbol('foo');
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-new-symbol: "error"*/

var foo = Symbol('foo');

// Ignores shadowed Symbol.
function bar(Symbol) {
    const baz = new Symbol("baz");
}

```

## When Not To Use It

This rule should not be used in ES3/5 environments.
