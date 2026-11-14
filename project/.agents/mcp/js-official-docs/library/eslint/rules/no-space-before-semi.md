---
title: "no-space-before-semi"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-space-before-semi.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-space-before-semi

Disallows spaces before semicolons.

**Important:**
This rule was removed in ESLint v1.0.0 and replaced by the semi-spacing rule.

JavaScript allows for placing unnecessary spaces between an expression and the closing semicolon.

Space issues can also cause code to look inconsistent and harder to read.

```js
var thing = function () {
  var test = 12 ;
}  ;
```

## Rule Details

This rule prevents the use of spaces before a semicolon in expressions.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
var foo = "bar" ;

var foo = function() {} ;

var foo = function() {
} ;

var foo = 1 + 2 ;
```

Examples of **correct** code for this rule:

**Correct:**

```js
;(function(){}());

var foo = "bar";
```
