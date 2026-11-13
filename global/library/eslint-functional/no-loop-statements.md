---
title: "functional/no-loop-statements"
tool: "eslint-functional"
version: "10.0"
source: "https://github.com/eslint-functional/eslint-plugin-functional/blob/d7aa1dd4ae4ef804f3010a92d3e7b385153415d8/docs/rules/no-loop-statements.md"
commit: "d7aa1dd4ae4ef804f3010a92d3e7b385153415d8"
license: "MIT"
---

# functional/no-loop-statements

📝 Disallow imperative loops.

💼 This rule is enabled in the following configs: ☑️ `lite`,  `noStatements`, ✅ `recommended`, 🔒 `strict`.

This rule disallows for loop statements, including `for`, `for...of`, `for...in`, `while`, and `do...while`.

## Rule Details

In functional programming we want everything to be an expression that returns a value.
Loops in JavaScript are statements so they are not a good fit for a functional programming style.
Instead consider using `map`, `reduce` or similar.
For more background see this
blog post and discussion in
tslint-immutable #54.

### ❌ Incorrect

```js
/* eslint functional/no-loop-statements: "error" */

const numbers = [1, 2, 3];
const double = [];
for (let i = 0; i < numbers.length; i++) {
  double[i] = numbers[i] * 2;
}
```

```js
/* eslint functional/no-loop-statements: "error" */

const numbers = [1, 2, 3];
let sum = 0;
for (const number of numbers) {
  sum += number;
}
```

### ✅ Correct

```js
/* eslint functional/no-loop-statements: "error" */
const numbers = [1, 2, 3];
const double = numbers.map((n) => n * 2);
```

```js
/* eslint functional/no-loop-statements: "error" */

const numbers = [1, 2, 3];
const sum = numbers.reduce((carry, number) => carry + number, 0);
```
