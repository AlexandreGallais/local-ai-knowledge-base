---
title: "space-after-keywords"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/space-after-keywords.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# space-after-keywords

Enforces consistent spacing after keywords.

**Important:**
This rule was removed in ESLint v2.0.0 and replaced by the keyword-spacing rule.

Some style guides will require or disallow spaces following the certain keywords.

```js
if (condition) {
    doSomething();
} else {
    doSomethingElse();
}

if(condition) {
    doSomething();
}else{
    doSomethingElse();
}
```

## Rule Details

This rule will enforce consistency of spacing after the keywords `if`, `else`, `for`, `while`, `do`, `switch`, `try`, `catch`, `finally`, and `with`.

This rule takes one argument. If it is `"always"` then the keywords must be followed by at least one space. If `"never"`
then there should be no spaces following. The default is `"always"`.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint space-after-keywords: "error"*/

if(a) {}

if (a) {} else{}

do{} while (a);
```

**Incorrect:**

```js
/*eslint space-after-keywords: ["error", "never"]*/

if (a) {}
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint space-after-keywords: "error"*/

if (a) {}

if (a) {} else {}
```

**Correct:**

```js
/*eslint space-after-keywords: ["error", "never"]*/

if(a) {}
```
