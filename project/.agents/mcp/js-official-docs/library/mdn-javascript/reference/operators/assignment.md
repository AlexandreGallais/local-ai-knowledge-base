---
title: "Assignment (=)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/assignment/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Assignment (=)

The **assignment (`=`)** operator is used to assign a value to a variable or property. The assignment expression itself has a value, which is the assigned value. This allows multiple assignments to be chained in order to assign a single value to multiple variables.

```js
let x = 2;
const y = 3;

console.log(x);
// Expected output: 2

console.log((x = y + 1)); // 3 + 1
// Expected output: 4

console.log((x = x * y)); // 4 * 3
// Expected output: 12
```

## Syntax

```js
x = y
```

### Parameters

- `x`
    A valid assignment target, including an identifier or a property accessor. It can also be a destructuring pattern.
- `y`
    An expression specifying the value to be assigned to `x`.

### Return value

The value of `y`.

### Exceptions

- `ReferenceError`
    Thrown in strict mode if assigning to an identifier that is not declared in the scope.
- `TypeError`
    Thrown in strict mode if assigning to a property that is not modifiable.

## Description

The assignment operator is completely different from the equals (`=`) sign used as syntactic separators in other locations, which include:

- Initializers of `var`, `let`, and `const` declarations
- Default values of destructuring
- Default parameters
- Initializers of class fields

All these places accept an assignment expression on the right-hand side of the `=`, so if you have multiple equals signs chained together:

```js
const x = y = 5;
```

This is equivalent to:

```js
const x = (y = 5);
```

Which means `y` must be a pre-existing variable, and `x` is a newly declared `const` variable. `y` is assigned the value `5`, and `x` is initialized with the value of the `y = 5` expression, which is also `5`. If `y` is not a pre-existing variable, a global variable `y` is implicitly created in non-strict mode, or a `ReferenceError` is thrown in strict mode. To declare two variables within the same declaration, use:

```js
const x = 5,
  y = 5;
```

## Examples

### Basic <example-value> and chaining

```js
let x = 5;
let y = 10;
let z = 25;

x = y; // x is 10
x = y = z; // x, y and z are all 25
```

### Value of assignment expressions

The assignment expression itself evaluates to the value of the right-hand side, so you can log the value and assign to a variable at the same time.

```js
let x;
console.log(x); // undefined
console.log(x = 2); // 2
console.log(x); // 2
```

### Unqualified identifier assignment

The global object sits at the top of the scope chain. When attempting to resolve a name to a value, the scope chain is searched. This means that properties on the global object are conveniently visible from every scope, without having to qualify the names with `globalThis.` or `window.` or `global.`.

Because the global object has a `String` property (`Object.hasOwn(globalThis, "String")`), you can use the following code:

```js
function foo() {
  String("s"); // The function `String` is globally available
}
```

So the global object will ultimately be searched for unqualified identifiers. You don't have to type `globalThis.String`; you can just type the unqualified `String`. To make this feature more conceptually consistent, assignment to unqualified identifiers will assume you want to create a property with that name on the global object (with `globalThis.` omitted), if there is no variable of the same name declared in the scope chain.

```js
foo = "f"; // In non-strict mode, assumes you want to create a property named `foo` on the global object
Object.hasOwn(globalThis, "foo"); // true
```

In strict mode, assignment to an unqualified identifier in strict mode will result in a `ReferenceError`, to avoid the accidental creation of properties on the global object.

Note that the implication of the above is that, contrary to popular misinformation, JavaScript does not have implicit or undeclared variables. It just conflates the global object with the global scope and allows omitting the global object qualifier during property creation.

### Assignment with destructuring

The left-hand side can also be an assignment pattern. This allows assigning to multiple variables at once.

```js
const result = /(a+)(b+)(c+)/.exec("aaabcc");
let a = "",
  b = "",
  c = "";
[, a, b, c] = result;
console.log(a, b, c); // "aaa" "b" "cc"
```

For more information, see Destructuring.

## See also

- Assignment operators in the JS guide
- Destructuring
