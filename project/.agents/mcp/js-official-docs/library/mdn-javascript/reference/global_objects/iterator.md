---
title: "Iterator"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/iterator/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Iterator

An **`Iterator`** object is an object that conforms to the iterator protocol by providing a `next()` method that returns an iterator result object. All built-in iterators inherit from the `Iterator` class. The `Iterator` class provides a `[Symbol.iterator]()` method that returns the iterator object itself, making the iterator also iterable. It also provides some helper methods for working with iterators.

## Description

The following are all built-in JavaScript iterators:

- The _Array Iterator_ returned by `Array.prototype.values()`, `Array.prototype.keys()`, `Array.prototype.entries()`, `Array.prototype[Symbol.iterator]()`, `TypedArray.prototype.values()`, `TypedArray.prototype.keys()`, `TypedArray.prototype.entries()`, `TypedArray.prototype[Symbol.iterator]()`, and `arguments[Symbol.iterator]()`.
- The _String Iterator_ returned by `String.prototype[Symbol.iterator]()`.
- The _Map Iterator_ returned by `Map.prototype.values()`, `Map.prototype.keys()`, `Map.prototype.entries()`, and `Map.prototype[Symbol.iterator]()`.
- The _Set Iterator_ returned by `Set.prototype.values()`, `Set.prototype.keys()`, `Set.prototype.entries()`, and `Set.prototype[Symbol.iterator]()`.
- The _RegExp String Iterator_ returned by `RegExp.prototype[Symbol.matchAll]()` and `String.prototype.matchAll()`.
- The `Generator` object returned by generator functions.
- The _Segments Iterator_ returned by the `[Symbol.iterator]()` method of the `Segments` object returned by `Intl.Segmenter.prototype.segment()`.
- The _Iterator Helper_ returned by iterator helper methods such as `Iterator.prototype.filter()` and `Iterator.prototype.map()`.

Web APIs may return iterators too. Some reuse core JavaScript iterators while others define their own iterators. For example:

- Array-Like objects such as `NodeList` return an _Array Iterator_ from their respective methods `keys()`, `values()`, `entries()`, and `Symbol.iterator`.
- Map-Like objects from Web APIs such as `Headers` return their own iterator type like _Headers Iterator_ from their respective methods `keys()`, `values()`, `entries()`, and `Symbol.iterator`.
- Set-Like objects from Web APIs such as `FontFaceSet` return their own iterator type like _FontFaceSet Iterator_ from their respective methods `keys()`, `values()`, `entries()`, and `Symbol.iterator`.

> **Note:**
> `NodeIterator` and other old interfaces are named as such but do not conform to the iterator protocol or iterable protocol.

Each of these iterators have a distinct prototype object, which defines the `next()` method used by the particular iterator. For example, all string iterator objects inherit from a hidden object `StringIteratorPrototype`, which has a `next()` method that iterates this string by code points. `StringIteratorPrototype` also has a `[Symbol.toStringTag]` property whose initial value is the string `"String Iterator"`. This property is used in `Object.prototype.toString()`. Similarly, other iterator prototypes also have their own `[Symbol.toStringTag]` values, which are the same as the names given above.

All of these prototype objects inherit from `Iterator.prototype`, which provides a `[Symbol.iterator]()` method that returns the iterator object itself, making the iterator also iterable.

### Iterator helper methods

> **Note:**
> These methods are _iterator_ helpers, not _iterable_ helpers, because the only requirement for an object to be iterable is just the presence of a `Symbol.iterator` method. There is no shared prototype to install these methods on.

The `Iterator` class itself provides some helper methods for working with iterators. For example, you may be tempted to do the following:

```js
const nameToDeposit = new Map([
  ["Anne", 1000],
  ["Bert", 1500],
  ["Carl", 2000],
]);

const totalDeposit = [...nameToDeposit.values()].reduce((a, b) => a + b);
```

This first converts the iterator returned by `Map.prototype.values()` to an array, then uses the `Array.prototype.reduce()` method to calculate the sum. However, this both creates an intermediate array and iterates the array twice. Instead, you can use the `reduce()` method of the iterator itself:

```js
const totalDeposit = nameToDeposit.values().reduce((a, b) => a + b);
```

This method may be more efficient, especially memory-wise, because it only iterates the iterator once, without memorizing any intermediate values. Iterator helper methods are necessary to work with infinite iterators:

```js
function* fibonacci() {
  let current = 1;
  let next = 1;
  while (true) {
    yield current;
    [current, next] = [next, current + next];
  }
}

const seq = fibonacci();
const firstThreeDigitTerm = seq.find((n) => n >= 100);
```

You cannot convert `seq` to an array, because it is infinite. Instead, you can use the `find()` method of the iterator itself, which only iterates `seq` as far as necessary to find the first value that satisfies the condition.

You will find many iterator methods analogous to array methods, such as:

| Iterator method                             | Array method                             |
| ------------------------------------------- | ---------------------------------------- |
| `Iterator.prototype.every()`    | `Array.prototype.every()`    |
| `Iterator.prototype.filter()`   | `Array.prototype.filter()`   |
| `Iterator.prototype.find()`     | `Array.prototype.find()`     |
| `Iterator.prototype.flatMap()`  | `Array.prototype.flatMap()`  |
| `Iterator.prototype.forEach()`  | `Array.prototype.forEach()`  |
| `Iterator.prototype.includes()` | `Array.prototype.includes()` |
| `Iterator.prototype.join()`     | `Array.prototype.join()`     |
| `Iterator.prototype.map()`      | `Array.prototype.map()`      |
| `Iterator.prototype.reduce()`   | `Array.prototype.reduce()`   |
| `Iterator.prototype.some()`     | `Array.prototype.some()`     |

`Iterator.prototype.drop()` and `Iterator.prototype.take()` combined are somewhat analogous to `Array.prototype.slice()`.

### Iterator helper objects

> **Note:**
> _Iterator helper objects_ and _iterator helper methods_ are two different concepts. An Iterator helper object is detectable at runtime, while "iterator helper method" is just a name for a set of methods for comprehension. _Iterator helper_ may refer to either the object or the method, depending on the context.

Among the iterator helper methods, `filter()`, `flatMap()`, `map()`, `drop()`, and `take()` return a new _Iterator Helper_ object. The iterator helper is also an `Iterator` instance, making these helper methods chainable. All iterator helper objects inherit from a common prototype object, which implements the iterator protocol:

- `next()`
    Calls the `next()` method of the underlying iterator, applies the helper method to the result, and returns the result.
- `return()`
    Calls the `return()` method of the underlying iterator, and returns the result.

The iterator helper shares the same data source as the underlying iterator, so iterating the iterator helper causes the underlying iterator to be iterated as well. There is no way to "fork" an iterator to allow it to be iterated multiple times.

```js
const it = [1, 2, 3].values();
const it2 = it.drop(0); // Essentially a copy
console.log(it.next().value); // 1
console.log(it2.next().value); // 2
console.log(it.next().value); // 3
```

### Proper iterators

There are two kinds of "iterators": objects that conform to the iterator protocol (which, at its minimum, only requires the presence of a `next()` method), and objects that inherit from the `Iterator` class, which enjoy the helper methods. They do not entail each other — objects that inherit from `Iterator` do not automatically become iterators, because the `Iterator` class does not define a `next()` method. Instead, the object needs to define a `next()` method itself. A _proper iterator_ is one that both conforms to the iterator protocol and inherits from `Iterator`, and most code expect iterators to be proper iterators and iterables to return proper iterators. To create proper iterators, define a class that extends `Iterator`, or use the `Iterator.from()` method.

```js
class MyIterator extends Iterator {
  next() {
    // …
  }
}

const myIterator = Iterator.from({
  next() {
    // …
  },
});
```

## Constructor

- `Iterator()`
    Intended to be extended by other classes that create iterators. Throws an error when constructed by itself.

## Static methods

- `Iterator.concat()`
    Creates a new `Iterator` object from a list of iterable objects. The new iterator yields the values from each of the input iterables in sequence.
- `Iterator.from()`
    Creates a new `Iterator` object from an iterator or iterable object.
- `Iterator.zip()`
    Creates a new `Iterator` object that aggregates elements from multiple iterable objects by yielding arrays containing elements at the same position.
- `Iterator.zipKeyed()`
    Creates a new `Iterator` object that aggregates elements from multiple iterable objects by yielding objects containing elements at the same position, with keys specified by the input.

## Instance properties

These properties are defined on `Iterator.prototype` and shared by all `Iterator` instances.

- `Iterator.prototype.constructor`
    The constructor function that created the instance object. For `Iterator` instances, the initial value is the `Iterator` constructor.
- `Iterator.prototype[Symbol.toStringTag]`
    The initial value of the `[Symbol.toStringTag]` property is the string `"Iterator"`. This property is used in `Object.prototype.toString()`.

    > **Note:**
    > Unlike the `[Symbol.toStringTag]` on most built-in classes, `Iterator.prototype[Symbol.toStringTag]` is writable for web compatibility reasons.

## Instance methods

- `Iterator.prototype.chunks()` (experimental)
    Returns a new iterator helper object that splits the elements from the original iterator into consecutive array chunks. Each time the helper is iterated, it gets the specified number of elements from the underlying iterator and yields them together.
- `Iterator.prototype.drop()`
    Returns a new iterator helper object that skips the given number of elements at the start of this iterator.
- `Iterator.prototype.every()`
    Returns `false` if it finds an element that does not satisfy the provided testing function. Otherwise, if the iterator is exhausted without finding such an element, it returns `true`.
- `Iterator.prototype.filter()`
    Returns a new iterator helper object that yields only those elements of the iterator for which the provided callback function returns `true`.
- `Iterator.prototype.find()`
    Returns the first element produced by the iterator that satisfies the provided testing function. If no values satisfy the testing function, `undefined` is returned.
- `Iterator.prototype.flatMap()`
    Returns a new iterator helper object that takes each element in the original iterator, runs it through a mapping function, and yields elements returned by the mapping function (which are contained in another iterator or iterable).
- `Iterator.prototype.forEach()`
    Executes a provided function once for each element produced by the iterator.
- `Iterator.prototype.includes()`
    Returns `true` if an element produced by the iterator is equal to the given value. Otherwise, if the iterator is exhausted without finding such an element, it returns `false`.
- `Iterator.prototype.join()`
    Returns a string that is the concatenation of all elements produced by the iterator, separated by commas or a specified separator string.
- `Iterator.prototype.map()`
    Returns a new iterator helper object that yields elements of the iterator, each transformed by a mapping function.
- `Iterator.prototype.reduce()`
    Executes a user-supplied "reducer" callback function on each element produced by the iterator, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements is a single value.
- `Iterator.prototype.some()`
    Returns `true` if it finds an element that satisfies the provided testing function. Otherwise, if the iterator is exhausted without finding such an element, it returns `false`.
- `Iterator.prototype.take()`
    Returns a new iterator helper object that yields the given number of elements in this iterator and then terminates.
- `Iterator.prototype.toArray()`
    Creates a new `Array` instance populated with the elements yielded from the iterator.
- `Iterator.prototype.windows()` (experimental)
    Returns a new iterator helper object that yields a sliding window of elements. Each time the helper is iterated, it yields an array removing the first element from the previous iteration and adding the next element from the original iterator.
- `Iterator.prototype[Symbol.dispose]()`
    Calls the `return()` method of `this`, if it exists. This implements the _disposable protocol_ and allows it to be disposed when used with `using` or `await using`.
- `Iterator.prototype[Symbol.iterator]()`
    Returns the iterator object itself. This allows iterator objects to also be iterable.

## Examples

### Using an iterator as an iterable

All built-in iterators are also iterable, so you can use them in a `for...of` loop:

```js
const arrIterator = [1, 2, 3].values();
for (const value of arrIterator) {
  console.log(value);
}
// Logs: 1, 2, 3
```

## See also

- Polyfill of `Iterator` in `core-js`
- es-shims polyfill of `Iterator` and associated helpers
- `function*`
- Iteration protocols
