---
title: "function"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/statements/function/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# function

The **`function`** declaration creates a binding of a new function to a given name.

You can also define functions using the `function` expression.

```js
function calcRectArea(width, height) {
  return width * height;
}

console.log(calcRectArea(5, 6));
// Expected output: 30
```

## Syntax

```js
function name(param0) {
  statements
}
function name(param0, param1) {
  statements
}
function name(param0, param1, /* …, */ paramN) {
  statements
}
```

### Parameters

- `name`
    The function name.
- `param` (optional)
    The name of a formal parameter for the function. Maximum number of arguments varies in different engines. For the parameters' syntax, see the Functions reference.
- `statements` (optional)
    The statements which comprise the body of the function.

## Description

A `function` declaration creates a `Function` object. Each time when a function is called, it returns the value specified by the last executed `return` statement, or `undefined` if the end of the function body is reached. See functions for detailed information on functions.

`function` declarations behave like a mix of `var` and `let`:

- Like `let`, in strict mode, function declarations are scoped to the most closely containing block.
- Like `let`, function declarations at the top level of a module or within blocks in strict mode cannot be redeclared by any other declaration.
- Like `var`, function declarations at the top level of a script (strict or non-strict) become properties on `globalThis`. Function declarations at the top level of a script or function body (strict or non-strict) can be redeclared by another `function` or `var`.
- Like both, function declarations can be re-assigned, but you should avoid doing so.
- Unlike either, function declarations are hoisted together with its value and can be called anywhere in its scope.

### Block-level function declaration

> **Warning:**
> In non-strict mode, function declarations inside blocks behave strangely. Only declare functions in blocks if you are in strict mode.

Functions can be conditionally declared — that is, a function statement can be nested within an `if` statement. However, in non-strict mode, the results are inconsistent across implementations.

```js
console.log(
  `'foo' name ${
    "foo" in globalThis ? "is" : "is not"
  } global. typeof foo is ${typeof foo}`,
);
if (false) {
  function foo() {
    return 1;
  }
}

// In Chrome:
// 'foo' name is global. typeof foo is undefined
//
// In Firefox:
// 'foo' name is global. typeof foo is undefined
//
// In Safari:
// 'foo' name is global. typeof foo is function
```

The scoping and hoisting effect won't change regardless of whether the `if` body is actually executed.

```js
console.log(
  `'foo' name ${
    "foo" in globalThis ? "is" : "is not"
  } global. typeof foo is ${typeof foo}`,
);
if (true) {
  function foo() {
    return 1;
  }
}

// In Chrome:
// 'foo' name is global. typeof foo is undefined
//
// In Firefox:
// 'foo' name is global. typeof foo is undefined
//
// In Safari:
// 'foo' name is global. typeof foo is function
```

In strict mode, block-level function declarations are scoped to that block and are hoisted to the top of the block.

```js
"use strict";

{
  foo(); // Logs "foo"
  function foo() {
    console.log("foo");
  }
}

console.log(
  `'foo' name ${
    "foo" in globalThis ? "is" : "is not"
  } global. typeof foo is ${typeof foo}`,
);
// 'foo' name is not global. typeof foo is undefined
```

### Hoisting

Function declarations in JavaScript are hoisted to the top of the enclosing function or global scope. You can use the function before you declared it:

```js
hoisted(); // Logs "foo"

function hoisted() {
  console.log("foo");
}
```

Note that function expressions are not hoisted:

```js
notHoisted(); // TypeError: notHoisted is not a function

var notHoisted = function () {
  console.log("bar");
};
```

### Redeclarations

Whether `function` declarations can be redeclared in the same scope depends on what scope it's contained in.

At the top level of a script, `function` declarations behave like `var` and can be redeclared by another `function` or `var` but not by `let`, `const`, or `class`.

```js
function a(b) {}
function a(b, c) {}
console.log(a.length); // 2
let a = 2; // SyntaxError: Identifier 'a' has already been declared
```

When `function` declarations are redeclared by `var`, the `var` declaration's initializer always overrides the function's value, regardless of their relative position. This is because function declarations are hoisted before any initializer gets evaluated, so the initializer comes later and overrides the value.

```js
var a = 1;
function a() {}
console.log(a); // 1
```

At the top level of a function's body, `function` also behaves like `var` and can be redeclared or have the same name as a parameter.

```js
function foo(a) {
  function a() {}
  console.log(typeof a);
}

foo(2); // Logs "function"
```

At the top level of a module or a block in strict mode, `function` declarations behave like `let` and cannot be redeclared by any other declaration.

```js
// Assuming current source is a module
function foo() {}
function foo() {} // SyntaxError: Identifier 'foo' has already been declared
```

```js
"use strict";
{
  function foo() {}
  function foo() {} // SyntaxError: Identifier 'foo' has already been declared
}
```

A `function` declaration within a `catch` block cannot have the same name as the `catch`-bound identifier, even in non-strict mode.

```js
try {
} catch (e) {
  function e() {} // SyntaxError: Identifier 'e' has already been declared
}
```

## Examples

### Using function

The following code declares a function that returns the total amount of sales, when given the number of units sold of three products.

```js
function calcSales(unitsA, unitsB, unitsC) {
  return unitsA * 79 + unitsB * 129 + unitsC * 699;
}
```

## See also

- Functions guide
- Functions
- `Function`
- `function` expression
- `function*`
- `async function`
- `async function*`
