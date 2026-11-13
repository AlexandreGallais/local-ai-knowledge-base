---
title: "no-div-regex"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-div-regex.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-div-regex

Characters `/=` at the beginning of a regular expression literal can be confused with a division assignment operator.

```js
function bar() { return /=foo/; }
```

## Rule Details

This rule forbids equal signs (`=`) after the slash (`/`) at the beginning of a regular expression literal, because the characters `/=` can be confused with a division assignment operator.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-div-regex: "error"*/

function bar() { return /=foo/; }
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-div-regex: "error"*/

function bar() { return /[=]foo/; }
```

## Options

This rule has no options.
