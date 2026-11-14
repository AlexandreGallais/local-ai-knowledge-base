---
title: "undefined"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/undefined/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# undefined

The **`undefined`** global property represents the primitive value `undefined`. It is one of JavaScript's primitive types.

```js
function test(t) {
  if (t === undefined) {
    return "Undefined value!";
  }
  return t;
}

let x;

console.log(test(x));
// Expected output: "Undefined value!"
```

## Value

The primitive value `undefined`.

## Description

`undefined` is a property of the _global object_. That is, it is a variable in global scope.

In all non-legacy browsers, `undefined` is a non-configurable, non-writable property. Even when this is not the case, avoid overriding it.

A variable that has not been assigned a value is of type `undefined`. A function returns `undefined` if a value was not `returned`. Accessing a property that does not exist also returns `undefined`. The `void` operator always returns `undefined`.

> **Note:**
> While you can use `undefined` as an identifier (variable name) in any scope other than the global scope (because `undefined` is not a reserved word), doing so is a very bad idea that will make your code difficult to maintain and debug.
>
> ```js example-bad
> // DON'T DO THIS
>
> (() => {
>   const undefined = "foo";
>   console.log(undefined, typeof undefined); // foo string
> })();
>
> ((undefined) => {
>   console.log(undefined, typeof undefined); // foo string
> })("foo");
> ```

## Examples

### Strict equality and undefined

You can use `undefined` and the strict equality and inequality operators to determine whether a variable has a value. In the following code, the variable `x` is not initialized, and the `if` statement evaluates to true.

```js
let x;
if (x === undefined) {
  // these statements execute
} else {
  // these statements do not execute
}
```

> **Note:**
> The _strict equality_ operator (as opposed to the _loose equality_ operator) must be used here, because `x == undefined` also checks whether `x` is `null`, while strict equality doesn't. This is because `null` is not equivalent to `undefined`.
>
> See Equality comparison and sameness for details.

### typeof operator and undefined

`typeof` can also determine whether a variable is `undefined`:

```js
let x;
if (typeof x === "undefined") {
  // these statements execute
}
```

One reason to use `typeof` is that it does not throw an error if the variable does not exist in the current scope.

```js
// x has not been declared before
// evaluates to true without errors
if (typeof x === "undefined") {
  // these statements execute
}

// Throws a ReferenceError
if (x === undefined) {
}
```

It also works with variables declared with `var` _after_ the check, because the declaration is hoisted to the top of the scope with value `undefined`.

```js
if (typeof x === "undefined") {
  // these statements execute
}
var x = 1;
```

This technique is usually only useful for testing global variables. You can know if a variable exists at any other scope (blocks, functions, modules, etc.) just by looking at the source code. The global scope is bound to the `global object`, so checking the existence of a variable in the global context can be done by checking the existence of a property on the _global object_, such as by using the `in` operator:

```js
if ("x" in window) {
  // These statements execute only if x is defined globally
}
```

However, none of the techniques above work if the variable is declared with `let`, `const`, or other lexical declarations. Using `typeof` before the line of declaration still produces a `ReferenceError`, due to the temporal dead zone (TDZ).

```js
if (typeof z === "undefined") {
  // Uncaught ReferenceError: Cannot access 'z' before initialization
}
let z = 1;
```

Furthermore, `let` and `const` declarations do not create properties on the global object, so they cannot be checked with the `in` operator either.

```js
let z;
if ("z" in window) {
  // false, even if z is declared globally with let or const
}
```

If you want to share global variables across different scripts, it is more advisable to use `var` or explicitly attach them to the global object:

```js
window.myGlobalVar = "foo";
```

### void operator and undefined

The `void` operator can also be used to produce the `undefined` value. This is very commonly seen in minified code because `void 0` is 3 bytes shorter and cannot be overridden. You should usually avoid this pattern in your own code.

```js
let x;
if (x === void 0) {
  // these statements execute
}

// y has not been declared before
if (y === void 0) {
  // throws Uncaught ReferenceError: y is not defined
}
```

## See also

- JavaScript data types and data structures
- `null`
