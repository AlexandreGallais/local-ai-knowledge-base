---
title: "no-script-url"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-script-url.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-script-url

Using `javascript:` URLs is considered by some as a form of `eval`. Code passed in `javascript:` URLs has to be parsed and evaluated by the browser in the same way that `eval` is processed.

## Rule Details

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-script-url: "error"*/

location.href = "javascript:void(0)";

location.href = `javascript:void(0)`;
```

## Options

This rule has no options.

## Compatibility

* **JSHint**: This rule corresponds to `scripturl` rule of JSHint.
