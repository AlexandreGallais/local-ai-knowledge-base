---
title: "no-mixed-spaces-and-tabs"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-mixed-spaces-and-tabs.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-mixed-spaces-and-tabs

Most code conventions require either tabs or spaces be used for indentation. As such, it's usually an error if a single line of code is indented with both tabs and spaces.

## Rule Details

This rule disallows mixed spaces and tabs for indentation.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-mixed-spaces-and-tabs: "error"*/

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
/*eslint no-mixed-spaces-and-tabs: "error"*/

function add(x, y) {
	return x + y;
}
```

## Options

This rule has a string option.

* `"smart-tabs"` allows mixed tabs and spaces when the spaces are used for alignment.

### smart-tabs

Examples of **correct** code for this rule with the `"smart-tabs"` option:

**Correct:**

```js
/*eslint no-mixed-spaces-and-tabs: ["error", "smart-tabs"]*/

function main() {
	var x = 5,
	    y = 7;
}
```
