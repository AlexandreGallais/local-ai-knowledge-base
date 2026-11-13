---
title: "no-tabs"
tool: "eslint-stylistic"
version: "5.10"
source: "https://github.com/eslint-stylistic/eslint-stylistic/blob/efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712/packages/eslint-plugin/rules/no-tabs/README.md"
commit: "efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712"
license: "MIT"
---

---
---

# no-tabs

Some style guides don't allow the use of tab characters at all, including within comments.

## Rule Details

This rule looks for tabs anywhere inside a file: code, comments or anything else.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/* eslint @stylistic/no-tabs: "error" */

var a 	= 2;

/**
 * 		it's a test function
 */
function test(){}

var x = 1; // 	test
```

Examples of **correct** code for this rule:

**Correct:**

```js
/* eslint @stylistic/no-tabs: "error" */

var a = 2;

/**
 * it's a test function
 */
function test(){}

var x = 1; // test
```

## Options

This rule has an optional object option with the following properties:

- `allowIndentationTabs` (default: false): If this is set to true, then the rule will not report tabs used for indentation.

#### allowIndentationTabs

Examples of **correct** code for this rule with the `allowIndentationTabs: true` option:

**Correct:**

```js
/* eslint @stylistic/no-tabs: ["error", { allowIndentationTabs: true }] */

function test() {
	doSomething();
}

	// comment with leading indentation tab
```

## When Not To Use It

If you have established a standard where having tabs is fine, then you can disable this rule.

## Compatibility

- **JSCS**: disallowTabs
