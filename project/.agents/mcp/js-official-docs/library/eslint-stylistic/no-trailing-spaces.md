---
title: "no-trailing-spaces"
tool: "eslint-stylistic"
version: "5.10"
source: "https://github.com/eslint-stylistic/eslint-stylistic/blob/efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712/packages/eslint-plugin/rules/no-trailing-spaces/README.md"
commit: "efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712"
license: "MIT"
---

---
---

# no-trailing-spaces

Sometimes in the course of editing files, you can end up with extra whitespace at the end of lines. These whitespace differences can be picked up by source control systems and flagged as diffs, causing frustration for developers. While this extra whitespace causes no functional issues, many code conventions require that trailing spaces be removed before check-in.

## Rule Details

This rule disallows trailing whitespace (spaces, tabs, and other Unicode whitespace characters) at the end of lines.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/* eslint @stylistic/no-trailing-spaces: "error" */

var foo = 0; 
var baz = 5;  
  
⏎
```

Examples of **correct** code for this rule:

**Correct:**

```js
/* eslint @stylistic/no-trailing-spaces: "error" */

var foo = 0;
var baz = 5;
```

## Options

This rule has an object option:

- `"skipBlankLines": false` (default) disallows trailing whitespace on empty lines
- `"skipBlankLines": true` allows trailing whitespace on empty lines
- `"ignoreComments": false` (default) disallows trailing whitespace in comment blocks
- `"ignoreComments": true` allows trailing whitespace in comment blocks

### skipBlankLines

Examples of **correct** code for this rule with the `{ "skipBlankLines": true }` option:

**Correct:**

```js
/* eslint @stylistic/no-trailing-spaces: ["error", { "skipBlankLines": true }] */

var foo = 0;
var baz = 5;
// ↓ a line with whitespace only ↓
  
// ↑ a line with whitespace only ↑
```

### ignoreComments

Examples of **correct** code for this rule with the `{ "ignoreComments": true }` option:

**Correct:**

```js
/* eslint @stylistic/no-trailing-spaces: ["error", { "ignoreComments": true }] */

// ↓ these comments have trailing whitespace →
//
/**
 * baz   
 *   
 * bar   
 */
```
