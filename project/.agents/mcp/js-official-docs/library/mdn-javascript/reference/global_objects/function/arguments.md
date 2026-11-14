---
title: "Function.prototype.arguments"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/function/arguments/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Function.prototype.arguments

> **Note:**
> The `arguments` property of `Function` objects is deprecated. The recommended way to access the `arguments` object is to refer to the variable `arguments` available within functions.

The **`arguments`** accessor property of `Function` instances returns the arguments passed to this function. For strict, arrow, async, and generator functions, accessing the `arguments` property throws a `TypeError`.

## Description

The value of `arguments` is an array-like object corresponding to the arguments passed to a function.

In the case of recursion, i.e., if function `f` appears several times on the call stack, the value of `f.arguments` represents the arguments corresponding to the most recent invocation of the function.

The value of the `arguments` property is normally `null` if there is no outstanding invocation of the function in progress (that is, the function has been called but has not yet returned).

Note that the only behavior specified by the ECMAScript specification is that `Function.prototype` has an initial `arguments` accessor that unconditionally throws a `TypeError` for any `get` or `set` request (known as a "poison pill accessor"), and that implementations are not allowed to change this semantic for any function except non-strict plain functions. The actual behavior of the `arguments` property, if it's anything other than throwing an error, is implementation-defined. For example, Chrome defines it as an own data property, while Firefox and Safari extend the initial poison-pill `Function.prototype.arguments` accessor to specially handle `this` values that are non-strict functions.

```js
(function f() {
  if (Object.hasOwn(f, "arguments")) {
    console.log(
      "arguments is an own property with descriptor",
      Object.getOwnPropertyDescriptor(f, "arguments"),
    );
  } else {
    console.log(
      "f doesn't have an own property named arguments. Trying to get f.[[Prototype]].arguments",
    );
    console.log(
      Object.getOwnPropertyDescriptor(
        Object.getPrototypeOf(f),
        "arguments",
      ).get.call(f),
    );
  }
})();

// In Chrome:
// arguments is an own property with descriptor {value: Arguments(0), writable: false, enumerable: false, configurable: false}

// In Firefox:
// f doesn't have an own property named arguments. Trying to get f.[[Prototype]].arguments
// Arguments { … }
```

## Examples

### Using the arguments property

```js
function f(n) {
  g(n - 1);
}

function g(n) {
  console.log(`before: ${g.arguments[0]}`);
  if (n > 0) {
    f(n);
  }
  console.log(`after: ${g.arguments[0]}`);
}

f(2);

console.log(`returned: ${g.arguments}`);

// Logs:
// before: 1
// before: 0
// after: 0
// after: 1
// returned: null
```

## Specifications

Not part of any standard.

## See also

- `arguments`
- Functions
