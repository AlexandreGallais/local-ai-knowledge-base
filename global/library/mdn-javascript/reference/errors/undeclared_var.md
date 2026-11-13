---
title: "ReferenceError: assignment to undeclared variable \"x\""
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/undeclared_var/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ReferenceError: assignment to undeclared variable "x"

The JavaScript strict mode-only exception "Assignment to undeclared variable" occurs when the value has been assigned to an undeclared variable.

## Message

```plain
ReferenceError: x is not defined (V8-based)
ReferenceError: assignment to undeclared variable x (Firefox)
ReferenceError: Can't find variable: x (Safari)
```

## Error type

`ReferenceError` in strict mode only.

## What went wrong?

You have an assignment of the form `x = ...`, but `x` has not been previously declared with the `var`, `let`, or `const` keyword.
This error occurs in strict mode code only.
In non-strict code, assignment to an undeclared variable implicitly creates a property on the global scope.

## Examples

### Invalid cases

In this case, the variable "bar" is an undeclared variable.

```js
function foo() {
  "use strict";
  bar = true;
}
foo(); // ReferenceError: assignment to undeclared variable bar
```

### Valid cases

To make "bar" a declared variable, you can add a `let`, `const`, or `var` keyword in front of it.

```js
function foo() {
  "use strict";
  const bar = true;
}
foo();
```

## See also

- Strict mode
- `var`
- `let`
- `const`
