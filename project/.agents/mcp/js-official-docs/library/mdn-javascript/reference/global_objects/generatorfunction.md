---
title: "GeneratorFunction"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/generatorfunction/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GeneratorFunction

The **`GeneratorFunction`** object provides methods for generator functions. In JavaScript, every generator function is actually a `GeneratorFunction` object.

Note that `GeneratorFunction` is _not_ a global object. It can be obtained with the following code:

```js
const GeneratorFunction = function* () {}.constructor;
```

`GeneratorFunction` is a subclass of `Function`.

```js
const GeneratorFunction = function* () {}.constructor;

const foo = new GeneratorFunction(`
  yield 'a';
  yield 'b';
  yield 'c';
`);

let str = "";
for (const val of foo()) {
  str += val;
}

console.log(str);
// Expected output: "abc"
```

## Constructor

- `GeneratorFunction()`
    Creates a new `GeneratorFunction` object.

## Instance properties

_Also inherits instance properties from its parent `Function`_.

These properties are defined on `GeneratorFunction.prototype` and shared by all `GeneratorFunction` instances.

- `GeneratorFunction.prototype.constructor`
    The constructor function that created the instance object. For `GeneratorFunction` instances, the initial value is the `GeneratorFunction` constructor.
- `GeneratorFunction.prototype.prototype`
    All generator functions share the same `prototype` property, which is `Generator.prototype`. Each generator function created with the `function*` syntax or the `GeneratorFunction()` constructor also has its own `prototype` property, whose prototype is `GeneratorFunction.prototype.prototype`. When the generator function is called, its `prototype` property becomes the prototype of the returned generator object.
- `GeneratorFunction.prototype[Symbol.toStringTag]`
    The initial value of the `[Symbol.toStringTag]` property is the string `"GeneratorFunction"`. This property is used in `Object.prototype.toString()`.

These properties are own properties of each `GeneratorFunction` instance.

- `prototype`
    Used when the function is used as a constructor with the `new` operator. It will become the new object's prototype.

## Instance methods

_Inherits instance methods from its parent `Function`_.

## See also

- `function*`
- `function*` expression
- `Function`
- `AsyncFunction`
- `AsyncGeneratorFunction`
- `Functions`
