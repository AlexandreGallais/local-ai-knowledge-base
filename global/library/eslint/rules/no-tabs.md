---
title: "no-tabs"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-tabs.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-tabs

Some style guides don't allow the use of tab characters at all, including within comments.

## Rule Details

This rule looks for tabs anywhere inside a file: code, comments or anything else.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/* eslint no-tabs: "error" */

var a 	= 2;

/**
* 		 it's a test function
*/
function test(){}

var x = 1; // 	 test
```

Examples of **correct** code for this rule:

**Correct:**

```js
/* eslint no-tabs: "error" */

var a = 2;

/**
* it's a test function
*/
function test(){}

var x = 1; // test
```

### Options

This rule has an optional object option with the following properties:

* `allowIndentationTabs` (default: false): If this is set to true, then the rule will not report tabs used for indentation.

#### allowIndentationTabs

Examples of **correct** code for this rule with the `allowIndentationTabs: true` option:

**Correct:**

```js
/* eslint no-tabs: ["error", { allowIndentationTabs: true }] */

function test() {
	doSomething();
}

	// comment with leading indentation tab
```

## When Not To Use It

If you have established a standard where having tabs is fine, then you can disable this rule.

## Compatibility

* **JSCS**: disallowTabs
