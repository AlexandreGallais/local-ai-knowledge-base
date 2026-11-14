---
title: "no-empty-label"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-empty-label.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-empty-label

Disallows labels for anything other than loops and switches.

**Important:**
This rule was removed in ESLint v2.0.0 and replaced by the no-labels rule.

Labeled statements are only used in conjunction with labeled break and continue statements. ECMAScript has no goto statement.

## Rule Details

This error occurs when a label is used to mark a statement that is not an iteration or switch

Example of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-empty-label: "error"*/

labeled:
var x = 10;
```

Example of **correct** code for this rule:

**Correct:**

```js
/*eslint no-empty-label: "error"*/

labeled:
for (var i=10; i; i--) {
    // ...
}
```

## When Not To Use It

If you don't want to be notified about usage of labels, then it's safe to disable this rule.
