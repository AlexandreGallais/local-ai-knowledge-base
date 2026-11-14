---
title: "Iteration protocols (part 1 of 2)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/iteration_protocols/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Iteration protocols

**Iteration protocols** aren't new built-ins or syntax, but _protocols_. These protocols can be implemented by any object by following some conventions.

There are two protocols: The iterable protocol and the iterator protocol.

## The iterable protocol

**The iterable protocol** allows JavaScript objects to define or customize their iteration behavior, such as what values are looped over in a `for...of` construct. Some built-in types are built-in iterables with a default iteration behavior, such as `Array` or `Map`, while other types (such as `Object`) are not.

In order to be **iterable**, an object must implement the **`Symbol.iterator`** method, meaning that the object (or one of the objects up its prototype chain) must have a property with a `[Symbol.iterator]` key which is available via constant `Symbol.iterator`:

- `Symbol.iterator`
    A zero-argument function that returns an object, conforming to the iterator protocol.

Whenever an object needs to be iterated (such as at the beginning of a `for...of` loop), its `Symbol.iterator` method is called with no arguments, and the returned **iterator** is used to obtain the values to be iterated.

Note that when this zero-argument function is called, it is invoked as a method on the iterable object. Therefore inside of the function, the `this` keyword can be used to access the properties of the iterable object, to decide what to provide during the iteration.

This function can be an ordinary function, or it can be a generator function, so that when invoked, an iterator object is returned. Inside of this generator function, each entry can be provided by using `yield`.

## The iterator protocol

**The iterator protocol** defines a standard way to produce a sequence of values (either finite or infinite), and potentially a return value when all values have been generated.

An object is an iterator when it implements a **`next()`** method with the following semantics:

- `next()`
    A function that accepts zero or one argument and returns an object conforming to the `IteratorResult` interface (see below). If a non-object value gets returned (such as `false` or `undefined`) when a built-in language feature (such as `for...of`) is using the iterator, a `TypeError` (`"iterator.next() returned a non-object value"`) will be thrown.

All iterator protocol methods (`next()`, `return()`, and `throw()`) are expected to return an object implementing the `IteratorResult` interface. It must have the following properties:

- `done` (optional)
    A boolean that's `false` if the iterator was able to produce the next value in the sequence. (This is equivalent to not specifying the `done` property altogether.)

    Has the value `true` if the iterator has completed its sequence. In this case, `value` optionally specifies the return value of the iterator.

- `value` (optional)
    Any JavaScript value returned by the iterator. Can be omitted when `done` is `true`.

In practice, neither property is strictly required; if an object without either property is returned, it's effectively equivalent to `{ done: false, value: undefined }`.

If an iterator returns a result with `done: true`, any subsequent calls to `next()` are expected to return `done: true` as well, although this is not enforced on the language level.

The `next` method can receive a value which will be made available to the method body. The only language feature that passes a value is `yield*`. The value passed to the `next` method of generators will become the value of the corresponding `yield` expression.

Optionally, the iterator can also implement the **`return(value)`** and **`throw(exception)`** methods, which, when called, tell the iterator that the caller is done with iterating it and can perform any necessary cleanup (such as closing a database connection).

- `return(value)` (optional)
    A function that accepts zero or one argument and returns an object conforming to the `IteratorResult` interface, typically with `value` equal to the `value` passed in and `done` equal to `true`. Calling this method tells the iterator that the caller does not intend to make any more `next()` calls and can perform any cleanup actions. When built-in language features call `return()` for cleanup, `value` is always `undefined`.
- `throw(exception)` (optional)
    A function that accepts zero or one argument and returns an object conforming to the `IteratorResult` interface, typically with `done` equal to `true`. Calling this method tells the iterator that the caller detects an error condition, and `exception` is typically an `Error` instance. No built-in language feature calls `throw()` for cleanup purposes — it's a special feature of generators for the symmetry of `return`/`throw`.

> **Note:**
> It is not possible to know reflectively (i.e., without actually calling `next()` and validating the returned result) whether a particular object implements the iterator protocol.

It is very easy to make an iterator also iterable: just implement a `Symbol.iterator` method that returns `this`.

```js
// Satisfies both the Iterator Protocol and Iterable
const myIterator = {
  next() {
    // …
  },
  [Symbol.iterator]() {
    return this;
  },
};
```

Such an object is called an _iterable iterator_. Doing so allows an iterator to be consumed by the various syntaxes expecting iterables — therefore, it is seldom useful to implement the Iterator Protocol without also implementing Iterable. (In fact, almost all syntaxes and APIs expect _iterables_, not _iterators_.) The generator object is an example:

```js
const generatorObject = (function* () {
  yield 1;
  yield 2;
  yield 3;
})();

console.log(typeof generatorObject.next);
// "function" — it has a next method (which returns the right result), so it's an iterator

console.log(typeof generatorObject[Symbol.iterator]);
// "function" — it has a [Symbol.iterator] method (which returns the right iterator), so it's an iterable

console.log(generatorObject[Symbol.iterator]() === generatorObject);
// true — its [Symbol.iterator] method returns itself (an iterator), so it's an iterable iterator
```

All built-in iterators inherit from `Iterator.prototype`, which implements the `Symbol.iterator` method as returning `this`, so that built-in iterators are also iterable.

However, when possible, it's better for `iterableSymbol.iterator` to return different iterators that always start from the beginning, like `Set.prototype[Symbol.iterator]()` does.

## The async iterator and async iterable protocols

There is another pair of protocols used for async iteration, named **async iterator** and **async iterable** protocols. They have very similar interfaces compared to the iterable and iterator protocols, except that each return value from the calls to the iterator methods is wrapped in a promise.

An object implements the async iterable protocol when it implements the following methods:

- `[Symbol.asyncIterator]()`
    A zero-argument function that returns an object, conforming to the async iterator protocol.

An object implements the async iterator protocol when it implements the following methods:

- `next()`
    A function that accepts zero or one argument and returns a promise. The promise fulfills to an object conforming to the `IteratorResult` interface, and the properties have the same semantics as those of the sync iterator's.
- `return(value)` (optional)
    A function that accepts zero or one argument and returns a promise. The promise fulfills to an object conforming to the `IteratorResult` interface, and the properties have the same semantics as those of the sync iterator's.
- `throw(exception)` (optional)
    A function that accepts zero or one argument and returns a promise. The promise fulfills to an object conforming to the `IteratorResult` interface, and the properties have the same semantics as those of the sync iterator's.

## Interactions between the language and iteration protocols

The language specifies APIs that either produce or consume iterables and iterators.

### Built-in iterables

`String`, `Array`, `TypedArray`, `Map`, `Set`, and `Segments` (returned by `Intl.Segmenter.prototype.segment()`) are all built-in iterables, because each of their `prototype` objects implements a `Symbol.iterator` method. In addition, the `arguments` object and some DOM collection types such as `NodeList` are also iterables.
Other than `AsyncGenerator`, there is no object in the core JavaScript language that is async iterable. Some web APIs, such as `ReadableStream`, have the `Symbol.asyncIterator` method set by default.

Generator functions return generator objects, which are iterable iterators. Async generator functions return async generator objects, which are async iterable iterators.

The iterators returned from built-in iterables actually all inherit from a common class `Iterator`, which implements the aforementioned `Symbol.iterator { return this; }` method, making them all iterable iterators. The `Iterator` class also provides additional helper methods in addition to the `next()` method required by the iterator protocol. You can inspect an iterator's prototype chain by logging it in a graphical console.

```plain
console.log([][Symbol.iterator]());

Array Iterator {}
  [[Prototype]]: Array Iterator     ==> This is the prototype shared by all array iterators
    next: ƒ next()
    Symbol(Symbol.toStringTag): "Array Iterator"
    [[Prototype]]: Object           ==> This is the prototype shared by all built-in iterators
      Symbol(Symbol.iterator): ƒ [Symbol.iterator]()
      [[Prototype]]: Object         ==> This is Object.prototype
```

### Built-in APIs accepting iterables

There are many APIs that accept iterables. Some examples include:

- `Map()`
- `WeakMap()`
- `Set()`
- `WeakSet()`
- `Promise.all()`
- `Promise.allSettled()`
- `Promise.race()`
- `Promise.any()`
- `Array.from()`
- `Object.groupBy()`
- `Map.groupBy()`

```js
const myObj = {};

new WeakSet(
  (function* () {
    yield {};
    yield myObj;
    yield {};
  })(),
).has(myObj); // true
```

### Syntaxes expecting iterables

Some statements and expressions expect iterables, for example the `for...of` loops, array and parameter spreading, `yield*`, and array destructuring:

```js
for (const value of ["a", "b", "c"]) {
  console.log(value);
}
// "a"
// "b"
// "c"

console.log([..."abc"]); // ["a", "b", "c"]

function* gen() {
  yield* ["a", "b", "c"];
}

console.log(gen().next()); // { value: "a", done: false }

[a, b, c] = new Set(["a", "b", "c"]);
console.log(a); // "a"
```

When built-in syntaxes are iterating an iterator, and the last result's `done` is `false` (i.e., the iterator is able to produce more values) but no more values are needed, the `return` method will get called if present. This can happen, for example, if a `break` or `return` is encountered in a `for...of` loop, or if all identifiers are already bound in an array destructuring.

```js
const obj = {
  [Symbol.iterator]() {
    let i = 0;
    return {
      next() {
        i++;
        console.log("Returning", i);
        if (i === 3) return { done: true, value: i };
        return { done: false, value: i };
      },
      return() {
        console.log("Closing");
        return { done: true };
      },
    };
  },
};

const [a] = obj;
// Returning 1
// Closing

const [b, c, d] = obj;
// Returning 1
// Returning 2
// Returning 3
// Already reached the end (the last call returned `done: true`),
// so `return` is not called
console.log([b, c, d]); // [1, 2, undefined]; the value associated with `done: true` is not reachable

for (const b of obj) {
  break;
}
// Returning 1
// Closing
```

Using `for...of`, array spreading, etc. on an async iterable that's not also a sync iterable (i.e., it has `Symbol.asyncIterator` but no `Symbol.iterator`) will throw a TypeError: x is not iterable. You must use syntaxes designed for async iterables, including `for await...of`, `yield*` in async generator functions (but not sync generator functions), and `Array.fromAsync()`. On the other hand, these syntaxes can also take sync iterables and implicitly convert the results to promises.
