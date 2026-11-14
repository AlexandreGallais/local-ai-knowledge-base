---
title: "no-object-constructor"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-object-constructor.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-object-constructor

Use of the `Object` constructor to construct a new empty object is generally discouraged in favor of object literal notation because of conciseness and because the `Object` global may be redefined.
The exception is when the `Object` constructor is used to intentionally wrap a specified value which is passed as an argument.

## Rule Details

This rule disallows calling the `Object` constructor without an argument.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-object-constructor: "error"*/

Object();

new Object();
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-object-constructor: "error"*/

Object("foo");

const obj = { a: 1, b: 2 };

const isObject = value => value === Object(value);

const createObject = Object => new Object();
```

## Options

This rule has no options.

## When Not To Use It

If you wish to allow the use of the `Object` constructor, you can safely turn this rule off.
