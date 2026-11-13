---
title: "space-return-throw-case"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/space-return-throw-case.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# space-return-throw-case

Requires spaces after `return`, `throw`, and `case` keywords.

**Important:**
This rule was removed in ESLint v2.0.0 and replaced by the keyword-spacing rule.

(fixable) The `--fix` option on the command line automatically fixed problems reported by this rule.

Require spaces following `return`, `throw`, and `case`.

## Rule Details

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint space-return-throw-case: "error"*/

throw{a:0}

function f(){ return-a; }

switch(a){ case'a': break; }
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint space-return-throw-case: "error"*/

throw {a: 0};

function f(){ return -a; }

switch(a){ case 'a': break; }
```
