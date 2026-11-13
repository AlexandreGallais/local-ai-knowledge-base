---
title: "prefer-template"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/prefer-template.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# prefer-template

In ES2015 (ES6), we can use template literals instead of string concatenation.

```js
const str = "Hello, " + name + "!";
```

```js
const str = `Hello, ${name}!`;
```

## Rule Details

This rule is aimed to flag usage of `+` operators with strings.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint prefer-template: "error"*/

const str = "Hello, " + name + "!";
const str1 = "Time: " + (12 * 60 * 60 * 1000);
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint prefer-template: "error"*/

const str = "Hello World!";
const str1 = `Hello, ${name}!`;
const str2 = `Time: ${12 * 60 * 60 * 1000}`;

// This is reported by `no-useless-concat`.
const str4 = "Hello, " + "World!";
```

## Options

This rule has no options.

## When Not To Use It

This rule should not be used in ES3/5 environments.

In ES2015 (ES6) or later, if you don't want to be notified about string concatenation, you can safely disable this rule.
