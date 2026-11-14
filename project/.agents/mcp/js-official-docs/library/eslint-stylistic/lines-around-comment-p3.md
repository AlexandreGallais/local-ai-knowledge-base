---
title: "lines-around-comment (part 3 of 3)"
tool: "eslint-stylistic"
version: "5.10"
source: "https://github.com/eslint-stylistic/eslint-stylistic/blob/efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712/packages/eslint-plugin/rules/lines-around-comment/README.md"
commit: "efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712"
license: "MIT"
---

# lines-around-comment (part 3 of 3)

### applyDefaultIgnorePatterns

Default ignore patterns are applied even when `ignorePattern` is provided. If you want to omit default patterns, set this option to `false`.

Examples of **correct** code for the `{ "applyDefaultIgnorePatterns": false }` option:

**Correct:**

```js
/* eslint @stylistic/lines-around-comment: ["error", { "ignorePattern": "pragma", applyDefaultIgnorePatterns: false }] */

foo();
/* a valid comment using pragma in it */
```

Examples of **incorrect** code for the `{ "applyDefaultIgnorePatterns": false }` option:

**Incorrect:**

```js
/* eslint @stylistic/lines-around-comment: ["error", { "applyDefaultIgnorePatterns": false }] */

foo();
/* mentioned in comment */

```

### afterHashbangComment

Examples of **incorrect** code for this rule with the `{ "afterHashbangComment": true }` option:

**Incorrect:**

```js
#!foo
var day = "great"

/* eslint @stylistic/lines-around-comment: ["error", { "afterHashbangComment": true }] */
```

Examples of **correct** code for this rule with the `{ "afterHashbangComment": true }` option:

**Correct:**

```js
#!foo

var day = "great"

/* eslint @stylistic/lines-around-comment: ["error", { "afterHashbangComment": true }] */
```

## When Not To Use It

Many people enjoy a terser code style and don't mind comments bumping up against code. If you fall into that category this rule is not for you.
