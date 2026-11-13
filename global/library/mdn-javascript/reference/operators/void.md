---
title: "void operator"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/void/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# void operator

The **`void`** operator evaluates the given
`expression` and then returns `undefined`.

```js
const output = void 1;
console.log(output);
// Expected output: undefined

void console.log("expression evaluated");
// Expected output: "expression evaluated"

void (function iife() {
  console.log("iife is executed");
})();
// Expected output: "iife is executed"

void function test() {
  console.log("test function executed");
};
try {
  test();
} catch (e) {
  console.log("test function is not defined");
  // Expected output: "test function is not defined"
}
```

## Syntax

```js
void expression
```

## Description

This operator allows evaluating expressions that produce a value into places where an
expression that evaluates to `undefined` is desired.

The `void` operator is often used merely to obtain the
`undefined` primitive value, usually using `void(0)` (which is
equivalent to `void 0`). In these cases, the global variable
`undefined` can be used.

It should be noted that the precedence
of the `void` operator should be taken into account and that
parentheses can help clarify the resolution of the expression following the
`void` operator:

```js
void 2 === "2"; // (void 2) === '2', returns false
void (2 === "2"); // void (2 === '2'), returns undefined
```

## Examples

### Immediately Invoked Function Expressions

When using an immediately-invoked function expression, the `function` keyword cannot be at the immediate start of the statement, because that would be parsed as a function declaration, and would generate a syntax error when the parentheses representing invocation is reached — if the function is unnamed, it would immediately be a syntax error if the function is parsed as a declaration.

```js
function iife() {
  console.log("Executed!");
}(); // SyntaxError: Unexpected token '<example-value>'

function () {
  console.log("Executed!");
}(); // SyntaxError: Function statements require a function name
```

In order for the function to be parsed as an expression, the `function` keyword has to appear at a position that only accepts expressions, not statements. This can be achieved by prefixing the keyword with a unary operator, which only accepts expressions as operands. Function invocation has higher precedence than unary operators, so it will be executed first. Its return value (which is almost always `undefined`) will be passed to the unary operator and then immediately discarded.

Of all the unary operators, `void` offers the best semantic, because it clearly signals that the return value of the function invocation should be discarded.

```js
void function () {
  console.log("Executed!");
}();

// Logs "Executed!"
```

This is a bit longer than wrapping the function expression in parentheses, which has the same effect of forcing the `function` keyword to be parsed as the start of an expression instead of a statement.

```js
(function () {
  console.log("Executed!");
})();
```

Note that this trick only applies to IIFEs defined with the `function` keyword. Attempting to use the `void` operator to avoid parentheses for an arrow function results in a syntax error. Arrow function expressions always require parentheses around them when being called.

```js
void () => { console.log("iife!"); }(); // SyntaxError: Malformed arrow function parameter list
```

### JavaScript URIs

When a browser follows a `javascript:` URI, it evaluates the code in the URI
and then replaces the contents of the page with the returned value, unless the returned
value is `undefined`. The `void` operator can be used to return
`undefined`. For example:

```html
<a href="javascript:void(0);">Click here to do nothing</a>

<a href="javascript:void(document.body.style.backgroundColor='green');">
  Click here for green background
</a>
```

> **Note:**
> `javascript:` pseudo protocol is discouraged over
> other alternatives, such as unobtrusive event handlers.

### Non-leaking Arrow Functions

Arrow functions introduce a short-hand braceless syntax that returns an expression.
This can cause unintended side effects if the expression is a function call where the returned value changes from `undefined` to some other value.

For example, if `doSomething()` returns `false` in the code below, the checkbox will no longer be marked as checked or unchecked when the checkbox is clicked (returning `false` from the handler disables the default action).

```js
checkbox.onclick = () => doSomething();
```

This is unlikely to be desired behavior!
To be safe, when the return value of a function is not intended to be used, it can be passed to the `void` operator to ensure that (for example) changing APIs do not cause arrow functions' behaviors to change.

```js
checkbox.onclick = () => void doSomething();
```

## See also

- `undefined`
