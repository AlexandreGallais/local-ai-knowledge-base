---
title: "Function.prototype.call()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/function/call/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Function.prototype.call()

The **`call()`** method of `Function` instances calls this function with a given `this` value and arguments provided individually.

```js
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = "food";
}

console.log(new Food("cheese", 5).name);
// Expected output: "cheese"
```

## Syntax

```js
call(thisArg)
call(thisArg, arg1)
call(thisArg, arg1, arg2)
call(thisArg, arg1, arg2, /* …, */ argN)
```

### Parameters

- `thisArg`
    The value to use as `this` when calling `func`. If the function is not in strict mode, `null` and `undefined` will be replaced with the global object, and primitive values will be converted to objects.
- `arg1`, …, `argN` (optional)
    Arguments for the function.

### Return value

The result of calling the function with the specified `this` value and arguments.

## Description

> **Note:**
> This function is almost identical to `apply()`, except that the function arguments are passed to `call()` individually as a list, while for `apply()` they are combined in one object, typically an array — for example, `func.call(this, "eat", "bananas")` vs. `func.apply(this, ["eat", "bananas"])`.

Normally, when calling a function, the value of `this` inside the function is the object that the function was accessed on. With `call()`, you can assign an arbitrary value as `this` when calling an existing function, without first attaching the function to the object as a property. This allows you to use methods of one object as generic utility functions.

> **Warning:**
> Do not use `call()` to chain constructors (for example, to implement inheritance). This invokes the constructor function as a plain function, which means `new.target` is `undefined`, and classes throw an error because they can't be called without `new`. Use `Reflect.construct()` or `extends` instead.

## Examples

### Using call() to invoke a function and specifying the this value

In the example below, when we call `greet`, the value of `this` will be bound to object `obj`, even when `greet` is not a method of `obj`.

```js
function greet() {
  console.log(this.animal, "typically sleep between", this.sleepDuration);
}

const obj = {
  animal: "cats",
  sleepDuration: "12 and 16 hours",
};

greet.call(obj); // cats typically sleep between 12 and 16 hours
```

### Using call() to invoke a function without specifying the first argument

If the first `thisArg` parameter is omitted, it defaults to `undefined`. In non-strict mode, the `this` value is then substituted with `globalThis` (which is akin to the global object).

```js
globalThis.globProp = "foo";

function display() {
  console.log(`globProp value is ${this.globProp}`);
}

display.call(); // Logs "globProp value is foo"
```

In strict mode, the value of `this` is not substituted, so it stays as `undefined`.

```js
"use strict";

globalThis.globProp = "foo";

function display() {
  console.log(`globProp value is ${this.globProp}`);
}

display.call(); // throws TypeError: Cannot read the property of 'globProp' of undefined
```

### Transforming methods to utility functions

`call()` is almost equivalent to a normal function call, except that `this` is passed as a normal parameter instead of as the value that the function was accessed on. This is similar to how general-purpose utility functions work: instead of calling `array.map(callback)`, you use `map(array, callback)`, which allows you to use `map` with array-like objects that are not arrays (for example, `arguments`) without mutating `Object.prototype`.

Take `Array.prototype.slice()`, for example, which you want to use for converting an array-like object to a real array. You could create a shortcut like this:

```js
const slice = Array.prototype.slice;

// …

slice.call(arguments);
```

Note that you can't save `slice.call` and call it as a plain function, because the `call()` method also reads its `this` value, which is the function it should call. In this case, you can use `bind()` to bind the value of `this` for `call()`. In the following piece of code, `slice()` is a bound version of `Function.prototype.call()`, with the `this` value bound to `Array.prototype.slice()`. This means that additional `call()` calls can be eliminated:

```js
// Same as "slice" in the previous example
const unboundSlice = Array.prototype.slice;
const slice = Function.prototype.call.bind(unboundSlice);

// …

slice(arguments);
```

## See also

- `Function.prototype.bind()`
- `Function.prototype.apply()`
- `Reflect.apply()`
- Spread syntax (`...`)
- Introduction to Object-Oriented JavaScript
