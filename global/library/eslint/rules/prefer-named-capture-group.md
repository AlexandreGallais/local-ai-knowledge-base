---
title: "prefer-named-capture-group"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/prefer-named-capture-group.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# prefer-named-capture-group

## Rule Details

With the landing of ECMAScript 2018, named capture groups can be used in regular expressions, which can improve their readability.
This rule is aimed at using named capture groups instead of numbered capture groups in regular expressions:

```js
const regex = /(?<year>[0-9]{4})/;
```

Alternatively, if your intention is not to _capture_ the results, but only express the alternative, use a non-capturing group:

```js
const regex = /(?:cauli|sun)flower/;
```

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint prefer-named-capture-group: "error"*/

const foo = /(ba[rz])/;
const bar = new RegExp('(ba[rz])');
const baz = RegExp('(ba[rz])');

foo.exec('bar')[1]; // Retrieve the group result.
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint prefer-named-capture-group: "error"*/

const foo = /(?<id>ba[rz])/;
const bar = new RegExp('(?<id>ba[rz])');
const baz = RegExp('(?<id>ba[rz])');
const xyz = /xyz(?:zy|abc)/;

foo.exec('bar').groups.id; // Retrieve the group result.
```

## Options

This rule has no options.

## When Not To Use It

If you are targeting ECMAScript 2017 and/or older environments, you should not use this rule, because this ECMAScript feature is only supported in ECMAScript 2018 and/or newer environments.
