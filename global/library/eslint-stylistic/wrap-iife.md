---
title: "wrap-iife"
tool: "eslint-stylistic"
version: "5.10"
source: "https://github.com/eslint-stylistic/eslint-stylistic/blob/efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712/packages/eslint-plugin/rules/wrap-iife/README.md"
commit: "efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712"
license: "MIT"
---

---
---

# wrap-iife

You can immediately invoke function expressions, but not function declarations. A common technique to create an immediately-invoked function expression (IIFE) is to wrap a function declaration in parentheses. The opening parentheses causes the contained function to be parsed as an expression, rather than a declaration.

```js
// function expression could be unwrapped
var x = function () { return { y: 1 };}();

// function declaration must be wrapped
function () { /* side effects */ }(); // SyntaxError
```

## Rule Details

This rule requires all immediately-invoked function expressions to be wrapped in parentheses.

## Options

This rule has two options, a string option and an object option.

String option:

- `"outside"` enforces always wrapping the _call_ expression. The default is `"outside"`.
- `"inside"` enforces always wrapping the _function_ expression.
- `"any"` enforces always wrapping, but allows either style.

Object option:

- `"functionPrototypeMethods": true` additionally enforces wrapping function expressions invoked using `.call` and `.apply`. The default is `false`.

### outside

Examples of **incorrect** code for the default `"outside"` option:

**Incorrect:**

```js
/* eslint @stylistic/wrap-iife: ["error", "outside"] */

var x = function () { return { y: 1 };}(); // unwrapped
var x = (function () { return { y: 1 };})(); // wrapped function expression
```

Examples of **correct** code for the default `"outside"` option:

**Correct:**

```js
/* eslint @stylistic/wrap-iife: ["error", "outside"] */

var x = (function () { return { y: 1 };}()); // wrapped call expression
```

### inside

Examples of **incorrect** code for the `"inside"` option:

**Incorrect:**

```js
/* eslint @stylistic/wrap-iife: ["error", "inside"] */

var x = function () { return { y: 1 };}(); // unwrapped
var x = (function () { return { y: 1 };}()); // wrapped call expression
```

Examples of **correct** code for the `"inside"` option:

**Correct:**

```js
/* eslint @stylistic/wrap-iife: ["error", "inside"] */

var x = (function () { return { y: 1 };})(); // wrapped function expression
```

### any

Examples of **incorrect** code for the `"any"` option:

**Incorrect:**

```js
/* eslint @stylistic/wrap-iife: ["error", "any"] */

var x = function () { return { y: 1 };}(); // unwrapped
```

Examples of **correct** code for the `"any"` option:

**Correct:**

```js
/* eslint @stylistic/wrap-iife: ["error", "any"] */

var x = (function () { return { y: 1 };}()); // wrapped call expression
var x = (function () { return { y: 1 };})(); // wrapped function expression
```

### functionPrototypeMethods

Examples of **incorrect** code for this rule with the `"inside", { "functionPrototypeMethods": true }` options:

**Incorrect:**

```js
/* eslint @stylistic/wrap-iife: [2, "inside", { functionPrototypeMethods: true }] */

var x = function(){ foo(); }()
var x = (function(){ foo(); }())
var x = function(){ foo(); }.call(bar)
var x = (function(){ foo(); }.call(bar))
```

Examples of **correct** code for this rule with the `"inside", { "functionPrototypeMethods": true }` options:

**Correct:**

```js
/* eslint @stylistic/wrap-iife: [2, "inside", { functionPrototypeMethods: true }] */

var x = (function(){ foo(); })()
var x = (function(){ foo(); }).call(bar)
```
