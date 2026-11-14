---
title: "AsyncGeneratorFunction"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/asyncgeneratorfunction/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AsyncGeneratorFunction

The **`AsyncGeneratorFunction`** object provides methods for async generator functions. In JavaScript, every async generator function is actually an `AsyncGeneratorFunction` object.

Note that `AsyncGeneratorFunction` is _not_ a global object. It can be obtained with the following code:

```js
const AsyncGeneratorFunction = async function* () {}.constructor;
```

`AsyncGeneratorFunction` is a subclass of `Function`.

```js
const AsyncGeneratorFunction = async function* () {}.constructor;

const foo = new AsyncGeneratorFunction(`
  yield await Promise.resolve('a');
  yield await Promise.resolve('b');
  yield await Promise.resolve('c');
`);

let str = "";

async function generate() {
  for await (const val of foo()) {
    str += val;
  }
  console.log(str);
}

generate();
// Expected output: "abc"
```

## Constructor

- `AsyncGeneratorFunction()`
    Creates a new `AsyncGeneratorFunction` object.

## Instance properties

_Also inherits instance properties from its parent `Function`_.

These properties are defined on `AsyncGeneratorFunction.prototype` and shared by all `AsyncGeneratorFunction` instances.

- `AsyncGeneratorFunction.prototype.constructor`
    The constructor function that created the instance object. For `AsyncGeneratorFunction` instances, the initial value is the `AsyncGeneratorFunction` constructor.
- `AsyncGeneratorFunction.prototype.prototype`
    All async generator functions share the same `prototype` property, which is `AsyncGenerator.prototype`. Each async generator function created with the `async function*` syntax or the `AsyncGeneratorFunction()` constructor also has its own `prototype` property, whose prototype is `AsyncGeneratorFunction.prototype.prototype`. When the async generator function is called, its `prototype` property becomes the prototype of the returned async generator object.
- `AsyncGeneratorFunction.prototype[Symbol.toStringTag]`
    The initial value of the `[Symbol.toStringTag]` property is the string `"AsyncGeneratorFunction"`. This property is used in `Object.prototype.toString()`.

These properties are own properties of each `AsyncGeneratorFunction` instance.

- `prototype`
    Used when the function is used as a constructor with the `new` operator. It will become the new object's prototype.

## Instance methods

_Inherits instance methods from its parent `Function`_.

## See also

- `async function*`
- `async function*` expression
- `Function`
- `AsyncFunction`
- `GeneratorFunction`
- `Functions`
