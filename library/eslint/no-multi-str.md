---
title: "no-multi-str"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-multi-str.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-multi-str

It's possible to create multiline strings in JavaScript by using a slash before a newline, such as:

```js
const x = "Line 1 \
         Line 2";
```

Some consider this to be a bad practice as it was an undocumented feature of JavaScript that was only formalized later.

## Rule Details

This rule is aimed at preventing the use of multiline strings.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-multi-str: "error"*/

const x = "some very \
long text";
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-multi-str: "error"*/

const x = "some very long text";

const y = "some very " +
        "long text";
```

## Options

This rule has no options.
