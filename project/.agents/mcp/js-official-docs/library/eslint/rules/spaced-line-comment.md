---
title: "spaced-line-comment"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/spaced-line-comment.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# spaced-line-comment

Enforces consistent spacing after `//` in line comments.

**Important:**
This rule was removed in ESLint v1.0.0 and replaced by the spaced-comment rule.

Some style guides require or disallow a whitespace immediately after the initial `//` of a line comment.
Whitespace after the `//` makes it easier to read text in comments.
On the other hand, commenting out code is easier without having to put a whitespace right after the `//`.

## Rule Details

This rule will enforce consistency of spacing after the start of a line comment `//`.

This rule takes two arguments. If the first is `"always"` then the `//` must be followed by at least once whitespace.
If `"never"` then there should be no whitespace following.
The default is `"always"`.

The second argument is an object with one key, `"exceptions"`.
The value is an array of string patterns which are considered exceptions to the rule.
It is important to note that the exceptions are ignored if the first argument is `"never"`.
Exceptions cannot be mixed.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
// When ["never"]
// This is a comment with a whitespace at the beginning
```

**Incorrect:**

```js
//When ["always"]
//This is a comment with no whitespace at the beginning
var foo = 5;
```

**Incorrect:**

```js
// When ["always",{"exceptions":["-","+"]}]
//------++++++++
// Comment block
//------++++++++
```

Examples of **correct** code for this rule:

**Correct:**

```js
// When ["always"]
// This is a comment with a whitespace at the beginning
var foo = 5;
```

**Correct:**

```js
//When ["never"]
//This is a comment with no whitespace at the beginning
var foo = 5;
```

**Correct:**

```js
// When ["always",{"exceptions":["-"]}]
//--------------
// Comment block
//--------------
```

**Correct:**

```js
// When ["always",{"exceptions":["-+"]}]
//-+-+-+-+-+-+-+
// Comment block
//-+-+-+-+-+-+-+
```
