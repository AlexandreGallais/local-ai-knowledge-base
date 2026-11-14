---
title: "function* expression"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/function_star_/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# function* expression

The **`function*`** keyword can be used to define a generator function inside an expression.

You can also define generator functions using the `function*` declaration.

```js
const foo = function* () {
  yield "a";
  yield "b";
  yield "c";
};

let str = "";
for (const val of foo()) {
  str += val;
}

console.log(str);
// Expected output: "abc"
```

## Syntax

```js
function* (param0) {
  statements
}
function* (param0, param1) {
  statements
}
function* (param0, param1, /* …, */ paramN) {
  statements
}

function* name(param0) {
  statements
}
function* name(param0, param1) {
  statements
}
function* name(param0, param1, /* …, */ paramN) {
  statements
}
```

> **Note:**
> An expression statement cannot begin with the keyword `function` to avoid ambiguity with a `function*` declaration. The `function` keyword only begins an expression when it appears in a context that cannot accept statements.

### Parameters

- `name` (optional)
    The function name. Can be omitted, in which case the function is _anonymous_. The name is only local to the function body.
- `paramN` (optional)
    The name of a formal parameter for the function. For the parameters' syntax, see the Functions reference.
- `statements` (optional)
    The statements which comprise the body of the function.

## Description

A `function*` expression is very similar to, and has almost the same syntax as, a `function*` declaration. The main difference between a `function*` expression and a `function*` declaration is the _function name_, which can be omitted in `function*` expressions to create _anonymous_ functions. A `function*` expression can be used as an IIFE (Immediately Invoked Function Expression) which runs as soon as it is defined, allowing you to create an ad-hoc iterable iterator object. See also the chapter about functions for more information.

## Examples

### Using function\* expression

The following example defines an unnamed generator function and assigns it to `x`. The function yields the square of its argument:

```js
const x = function* (y) {
  yield y * y;
};
```

## See also

- Functions guide
- Functions
- `function*`
- `GeneratorFunction`
- Iteration protocols
- `yield`
- `yield*`
