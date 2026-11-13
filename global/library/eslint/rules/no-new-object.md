---
title: "no-new-object"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-new-object.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-new-object

The `Object` constructor is used to create new generic objects in JavaScript, such as:

```js
var myObject = new Object();
```

However, this is no different from using the more concise object literal syntax:

```js
var myObject = {};
```

For this reason, many prefer to always use the object literal syntax and never use the `Object` constructor.

While there are no performance differences between the two approaches, the byte savings and conciseness of the object literal form is what has made it the de facto way of creating new objects.

## Rule Details

This rule disallows calling the `Object` constructor with `new`.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-new-object: "error"*/

var myObject = new Object();

new Object();

var foo = new Object("foo");
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-new-object: "error"*/

var myObject = new CustomObject();

var myObject = {};

var Object = function Object() {};
new Object();

var foo = Object("foo");
```

## When Not To Use It

If you wish to allow the use of the `Object` constructor with `new`, you can safely turn this rule off.
