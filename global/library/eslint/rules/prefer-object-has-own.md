---
title: "prefer-object-has-own"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/prefer-object-has-own.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# prefer-object-has-own

It is very common to write code like:

```js
if (Object.prototype.hasOwnProperty.call(object, "foo")) {
  console.log("has property foo");
}
```

This is a common practice because methods on `Object.prototype` can sometimes be unavailable or redefined (see the no-prototype-builtins rule).

Introduced in ES2022, `Object.hasOwn()` is a shorter alternative to `Object.prototype.hasOwnProperty.call()`:

```js
if (Object.hasOwn(object, "foo")) {
  console.log("has property foo")
}
```

## Rule Details

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint prefer-object-has-own: "error"*/

Object.prototype.hasOwnProperty.call(obj, "a");

Object.hasOwnProperty.call(obj, "a");

({}).hasOwnProperty.call(obj, "a");

const hasProperty = Object.prototype.hasOwnProperty.call(object, property);
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint prefer-object-has-own: "error"*/

Object.hasOwn(obj, "a");

const hasProperty = Object.hasOwn(object, property);
```

## Options

This rule has no options.

## When Not To Use It

This rule should not be used unless ES2022 is supported in your codebase.
