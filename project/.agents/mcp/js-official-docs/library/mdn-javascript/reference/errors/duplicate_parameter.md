---
title: "SyntaxError: duplicate formal argument x"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/duplicate_parameter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: duplicate formal argument x

The JavaScript exception "duplicate formal argument x" or "duplicate argument names not allowed in this context" occurs when a function creates two or more parameter bindings with the same name, and the function is not a non-strict function with only simple parameters.

## Message

```plain
SyntaxError: Duplicate parameter name not allowed in this context (V8-based)
SyntaxError: duplicate formal argument x (Firefox)
SyntaxError: duplicate argument names not allowed in this context (Firefox)
SyntaxError: Cannot declare a parameter named 'x' in strict mode as it has already been declared. (Safari)
SyntaxError: Duplicate parameter 'x' not allowed in function with default parameter values. (Safari)
SyntaxError: Duplicate parameter 'x' not allowed in function with a rest parameter. (Safari)
SyntaxError: Duplicate parameter 'x' not allowed in function with destructuring parameters. (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

Having two formal parameters of the same name is likely a mistake—the second occurrence would cause the first occurrence to be inaccessible through the parameter name. In legacy JavaScript, this was allowed. Therefore, to not break existing code, this is only an error if the code is guaranteed to not be legacy—either because it is in strict mode or it uses modern parameter syntax (rest, default, or destructured parameters).

## Examples

### Invalid cases

```js
"use strict";

function add(x, x) {
  // How can you access both "x" parameters?
  // SyntaxError: duplicate formal argument x
}
```

```js
function doSomething(name, { name }) {
  // How can you access both "name" parameters?
  // SyntaxError: duplicate argument names not allowed in this context
}
```

### Valid cases

```js
function doSomething(operationName, { name: userName }) {
  // You can access both "operationName" and "userName" parameters.
}

function doSomething(name, user) {
  // You can access both "name" and "user.name" parameters.
}
```

## See also

- Functions
- Strict mode
