---
title: "Function"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/function/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Function

The **`Function`** object provides methods for functions. In JavaScript, every function is actually a `Function` object.

## Constructor

- `Function()`
    Creates a new `Function` object. Calling the constructor directly can create functions dynamically but suffers from security and similar (but far less significant) performance issues to `eval()`. However, unlike `eval()`, the `Function` constructor creates functions that execute in the global scope only.

## Instance properties

These properties are defined on `Function.prototype` and shared by all `Function` instances.

- `Function.prototype.arguments` (deprecated) (non-standard)
    Represents the arguments passed to this function. For strict, arrow, async, and generator functions, accessing the `arguments` property throws a `TypeError`. Use the `arguments` object inside function closures instead.
- `Function.prototype.caller` (deprecated) (non-standard)
    Represents the function that invoked this function. For strict, arrow, async, and generator functions, accessing the `caller` property throws a `TypeError`.
- `Function.prototype.constructor`
    The constructor function that created the instance object. For `Function` instances, the initial value is the `Function` constructor.

These properties are own properties of each `Function` instance.

- `displayName` (non-standard) (optional)
    The display name of the function.
- `length`
    Specifies the number of arguments expected by the function.
- `name`
    The name of the function.
- `prototype`
    Used when the function is used as a constructor with the `new` operator. It will become the new object's prototype.

## Instance methods

- `Function.prototype.apply()`
    Calls a function with a given `this` value and optional arguments provided as an array (or an array-like object).
- `Function.prototype.bind()`
    Creates a new function that, when called, has its `this` keyword set to a provided value, optionally with a given sequence of arguments preceding any provided when the new function is called.
- `Function.prototype.call()`
    Calls a function with a given `this` value and optional arguments.
- `Function.prototype.toString()`
    Returns a string representing the source code of the function.
    Overrides the `Object.prototype.toString` method.
- `Function.prototype[Symbol.hasInstance]()`
    Specifies the default procedure for determining if a constructor function recognizes an object as one of the constructor's instances. Called by the `instanceof` operator.

## Examples

### Difference between Function constructor and function declaration

Functions created with the `Function` constructor do not create closures to their creation contexts; they always are created in the global scope. When running them, they will only be able to access their own local variables and global ones, not the ones from the scope in which the `Function` constructor was created. This is different from using `eval()` with code for a function expression.

```js
// Create a global property with `var`
var x = 10;

function createFunction1() {
  const x = 20;
  return new Function("return x;"); // this `x` refers to global `x`
}

function createFunction2() {
  const x = 20;
  function f() {
    return x; // this `x` refers to the local `x` above
  }
  return f;
}

const f1 = createFunction1();
console.log(f1()); // 10
const f2 = createFunction2();
console.log(f2()); // 20
```

While this code works in web browsers, `f1()` will produce a `ReferenceError` in Node.js, as `x` will not be found. This is because the top-level scope in Node is not the global scope, and `x` will be local to the module.

## See also

- `function`
- `function` expression
- `AsyncFunction`
- `AsyncGeneratorFunction`
- `GeneratorFunction`
- `Functions`
