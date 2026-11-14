---
title: "no-wrap-func"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-wrap-func.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-wrap-func

Disallows unnecessary parentheses around function expressions.

**Important:**
This rule was removed in ESLint v1.0.0 and replaced by the no-extra-parens rule. The `"functions"` option in the new rule is equivalent to the removed rule.

Although it's possible to wrap functions in parentheses, this can be confusing when the code also contains immediately-invoked function expressions (IIFEs) since parentheses are often used to make this distinction. For example:

```js
var foo = (function() {
    // IIFE
}());

var bar = (function() {
    // not an IIFE
});
```

## Rule Details

This rule will raise a warning when it encounters a function expression wrapped in parentheses with no following invoking parentheses.

Example of **incorrect** code for this rule:

**Incorrect:**

```js
var a = (function() {/*...*/});
```

Examples of **correct** code for this rule:

**Correct:**

```js
var a = function() {/*...*/};

(function() {/*...*/})();
```
