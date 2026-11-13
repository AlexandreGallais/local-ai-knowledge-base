---
title: "yield"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/yield/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# yield

The **`yield`** operator is used to pause and resume a generator function.

```js
function* foo(index) {
  while (index < 2) {
    yield index;
    index++;
  }
}

const iterator = foo(0);

console.log(iterator.next().value);
// Expected output: 0

console.log(iterator.next().value);
// Expected output: 1
```

## Syntax

```js
yield
yield expression
```

### Parameters

- `expression` (optional)
    The value to yield from the generator function via the iterator protocol. If omitted, `undefined` is yielded.

### Return value

Returns the optional value passed to the generator's `next()` method to resume its execution.

> **Note:**
> This means `next()` is asymmetric: it always sends a value to the currently suspended `yield`, but returns the operand of the next `yield`. The argument passed to the first `next()` call cannot be retrieved because there's no currently suspended `yield`.

## Description

The `yield` keyword pauses generator function execution and the value of the expression following the `yield` keyword is returned to the generator's caller. It can be thought of as a generator-based version of the `return` keyword.

`yield` can only be used directly within the generator function that contains it. It cannot be used within nested functions.

Calling a generator function constructs a `Generator` object. Each time the generator's `next()` method is called, the generator resumes execution, and runs until it reaches one of the following:

- A `yield` expression. In this case, the generator pauses, and the `next()` method return an iterator result object with two properties: `value` and `done`. The `value` property is the value of the expression after the `yield` operator, and `done` is `false`, indicating that the generator function has not fully completed.
- The end of the generator function. In this case, execution of the generator ends, and the `next()` method returns an iterator result object where the `value` is `undefined` and `done` is `true`.
- A `return` statement. In this case, execution of the generator ends, and the `next()` method returns an iterator result object where the `value` is the specified return value and `done` is `true`.
- A `throw` statement. In this case, execution of the generator halts entirely, and the `next()` method throws the specified exception.

Once paused on a `yield` expression, the generator's code execution remains paused until the generator's `next()` method is called again. If an optional value is passed to the generator's `next()` method, that value becomes the value returned by the generator's current `yield` operation. The first `next()` call does not have a corresponding suspended `yield` operation, so there's no way to get the argument passed to the first `next()` call.

If the generator's `return()` or `throw()` method is called, it acts as if a `return` or `throw` statement was executed at the paused `yield` expression. You can use `try...catch...finally` within the generator function body to handle these early completions. If the `return()` or `throw()` method is called but there's no suspended `yield` expression (because `next()` has not been called yet, or because the generator has already completed), then the early completions cannot be handled and always terminate the generator.

## Examples

### Using yield

The following code is the declaration of an example generator function.

```js
function* countAppleSales() {
  const saleList = [3, 7, 5];
  for (const sale of saleList) {
    yield sale;
  }
}
```

Once a generator function is defined, it can be used by constructing an iterator as shown.

```js
const appleStore = countAppleSales(); // Generator { }
console.log(appleStore.next()); // { value: 3, done: false }
console.log(appleStore.next()); // { value: 7, done: false }
console.log(appleStore.next()); // { value: 5, done: false }
console.log(appleStore.next()); // { value: undefined, done: true }
```

You can also send a value with `next(value)` into the generator. `step` evaluates as a return value of the `yield` expression — although the value passed to the generator's `next()` method the first time `next()` is called is ignored.

```js
function* counter(value) {
  while (true) {
    const step = yield value++;

    if (step) {
      value += step;
    }
  }
}

const generatorFunc = counter(0);
console.log(generatorFunc.next().value); // 0
console.log(generatorFunc.next().value); // 1
console.log(generatorFunc.next().value); // 2
console.log(generatorFunc.next().value); // 3
console.log(generatorFunc.next(10).value); // 14
console.log(generatorFunc.next().value); // 15
console.log(generatorFunc.next(10).value); // 26
```

## See also

- Iteration protocols
- `function*`
- `function*` expression
- `yield*`
