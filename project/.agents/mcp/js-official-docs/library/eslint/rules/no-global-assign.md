---
title: "no-global-assign"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-global-assign.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-global-assign

JavaScript environments contain a number of built-in global variables, such as `window` in browsers and `process` in Node.js. In almost all cases, you don't want to assign a value to these global variables as doing so could result in losing access to important functionality. For example, you probably don't want to do this in browser code:

```js
window = {};
```

While examples such as `window` are obvious, there are often hundreds of built-in global objects provided by JavaScript environments. It can be hard to know if you're assigning to a global variable or not.

## Rule Details

This rule disallows modifications to read-only global variables.

ESLint has the capability to configure global variables as read-only.

See also: Specify Globals

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-global-assign: "error"*/

Object = null
undefined = 1
```

**Incorrect:**

```js
/*eslint no-global-assign: "error"*/
/*global window:readonly*/

window = {}
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-global-assign: "error"*/

a = 1
let b = 1
b = 2
```

**Correct:**

```js
/*eslint no-global-assign: "error"*/
/*global onload:writable*/

onload = function() {}
```

## Options

This rule accepts an `exceptions` option, which can be used to specify a list of builtins for which reassignments will be allowed:

```json
{
    "rules": {
        "no-global-assign": ["error", {"exceptions": ["Object"]}]
    }
}
```

## When Not To Use It

If you are trying to override one of the native objects.
