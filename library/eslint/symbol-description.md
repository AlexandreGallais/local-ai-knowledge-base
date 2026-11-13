---
title: "symbol-description"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/symbol-description.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# symbol-description

The `Symbol` function may have an optional description:

```js
const foo = Symbol("some description");

const someString = "some description";
const bar = Symbol(someString);
```

Using `description` promotes easier debugging: when a symbol is logged the description is used:

```js
const foo = Symbol("some description");

> console.log(foo);
// Symbol(some description)
```

It may facilitate identifying symbols when one is observed during debugging.

## Rule Details

This rules requires a description when creating symbols.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint symbol-description: "error"*/

const foo = Symbol();
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint symbol-description: "error"*/

const foo = Symbol("some description");

const someString = "some description";
const bar = Symbol(someString);
```

## Options

This rule has no options.

## When Not To Use It

This rule should not be used in ES3/5 environments.
In addition, this rule can be safely turned off if you don't want to enforce presence of `description` when creating Symbols.
