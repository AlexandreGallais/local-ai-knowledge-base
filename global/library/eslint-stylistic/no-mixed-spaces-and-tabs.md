---
title: "no-mixed-spaces-and-tabs"
tool: "eslint-stylistic"
version: "5.10"
source: "https://github.com/eslint-stylistic/eslint-stylistic/blob/efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712/packages/eslint-plugin/rules/no-mixed-spaces-and-tabs/README.md"
commit: "efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712"
license: "MIT"
---

# no-mixed-spaces-and-tabs

Most code conventions require either tabs or spaces be used for indentation. As such, it's usually an error if a single line of code is indented with both tabs and spaces.

## Rule Details

This rule disallows mixed spaces and tabs for indentation.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/* eslint @stylistic/no-mixed-spaces-and-tabs: "error" */

function add(x, y) {
	  return x + y;
}

function main() {
	var x = 5,
	    y = 7;
}
```

Examples of **correct** code for this rule:

**Correct:**

```js
/* eslint @stylistic/no-mixed-spaces-and-tabs: "error" */

function add(x, y) {
	return x + y;
}
```

## Options

This rule has a string option.

- `"smart-tabs"` allows mixed tabs and spaces when the spaces are used for alignment.

### smart-tabs

Examples of **correct** code for this rule with the `"smart-tabs"` option:

**Correct:**

```js
/* eslint @stylistic/no-mixed-spaces-and-tabs: ["error", "smart-tabs"] */

function main() {
	var x = 5,
	    y = 7;
}
```
