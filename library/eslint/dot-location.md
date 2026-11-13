---
title: "dot-location"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/dot-location.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# dot-location

JavaScript allows you to place newlines before or after a dot in a member expression.

Consistency in placing a newline before or after the dot can greatly increase readability.

```js
var a = universe.
        galaxy;

var b = universe
       .galaxy;
```

## Rule Details

This rule aims to enforce newline consistency in member expressions. This rule prevents the use of mixed newlines around the dot in a member expression.

## Options

The rule takes one option, a string:

* If it is `"object"` (default), the dot in a member expression should be on the same line as the object portion.
* If it is `"property"`, the dot in a member expression should be on the same line as the property portion.

### object

The default `"object"` option requires the dot to be on the same line as the object.

Examples of **incorrect** code for the default `"object"` option:

**Incorrect:**

```js
/*eslint dot-location: ["error", "object"]*/

var foo = object
.property;
```

Examples of **correct** code for the default `"object"` option:

**Correct:**

```js
/*eslint dot-location: ["error", "object"]*/

var foo = object.
property;

var bar = (
    object
).
property;

var baz = object.property;
```

### property

The `"property"` option requires the dot to be on the same line as the property.

Examples of **incorrect** code for the `"property"` option:

**Incorrect:**

```js
/*eslint dot-location: ["error", "property"]*/

var foo = object.
property;
```

Examples of **correct** code for the `"property"` option:

**Correct:**

```js
/*eslint dot-location: ["error", "property"]*/

var foo = object
.property;
var bar = object.property;
```

## When Not To Use It

You can turn this rule off if you are not concerned with the consistency of newlines before or after dots in member expressions.
