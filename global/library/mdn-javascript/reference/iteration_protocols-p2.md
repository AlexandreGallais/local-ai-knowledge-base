---
title: "Iteration protocols (part 2 of 2)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/iteration_protocols/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Iteration protocols (part 2 of 2)

## Error handling

Because iteration involves transferring control back and forth between the iterator and the consumer, error handling happens in both ways: how the consumer handles errors thrown by the iterator, and how the iterator handles errors thrown by the consumer. When you are using one of the built-in ways of iteration, the language may also throw errors because the iterable breaks certain invariants. We will describe how built-in syntaxes generate and handle errors, which can be used as a guideline for your own code if you are manually stepping the iterator.

### Non-well-formed iterables

Errors may happen when acquiring the iterator from the iterable. The language invariant enforced here is that the iterable must produce a valid iterator:

- It has a callable `Symbol.iterator` method.
- The `Symbol.iterator` method returns an object.
- The object returned by `Symbol.iterator` has a callable `next()` method.

When using built-in syntax to initiate iteration on a non-well-formed iterable, a TypeError is thrown.

```js
const nonWellFormedIterable = { [Symbol.iterator]: 1 };
[...nonWellFormedIterable]; // TypeError: nonWellFormedIterable is not iterable
nonWellFormedIterable[Symbol.iterator] = () => 1;
[...nonWellFormedIterable]; // TypeError: [Symbol.iterator]() returned a non-object value
nonWellFormedIterable[Symbol.iterator] = () => ({});
[...nonWellFormedIterable]; // TypeError: nonWellFormedIterable[Symbol.iterator]().next is not a function
```

For async iterables, if its `Symbol.asyncIterator` property has value `undefined` or `null`, JavaScript falls back to using the `[Symbol.iterator]` property instead (and wraps the resulting iterator into an async iterator by forwarding the methods). Otherwise, the `[Symbol.asyncIterator]` property must conform to the above invariants too.

This type of error can be prevented by first validating the iterable before attempting to iterate it. However, it's fairly rare because usually you know the type of the object you are iterating over. If you are receiving this iterable from some other code, you should just let the error propagate to the caller so they know an invalid input was provided.

### Errors during iteration

Most errors happen when stepping the iterator (calling `next()`). The language invariant enforced here is that the `next()` method must return an object (for async iterators, an object after awaiting). Otherwise, a TypeError is thrown.

If the invariant is broken or the `next()` method throws an error (for async iterators, it may also return a rejected promise), the error is propagated to the caller. For built-in syntaxes, the iteration in progress is aborted without retrying or cleanup (with the assumption that if the `next()` method threw the error, then it has cleaned up already). If you are manually calling `next()`, you may catch the error and retry calling `next()`, but in general you should assume the iterator is already closed.

If the caller decides to exit iteration for any reason other than the errors in the previous paragraph, such as when it enters an error state in its own code (for example, while handling an invalid value produced by the iterator), it should call the `return()` method on the iterator, if one exists. This allows the iterator to perform any cleanup. The `return()` method is only called for premature exits—if `next()` returns `done: true`, the `return()` method is not called, with the assumption that the iterator has already cleaned up.

The `return()` method might be invalid too! The language also enforces that the `return()` method must return an object and throws a TypeError otherwise. If the `return()` method throws an error, the error is propagated to the caller. However, if the `return()` method is called because the caller encountered an error in its own code, then this error overrides the error thrown by the `return()` method.

Usually, the caller implements error handling like this:

```js
try {
  for (const value of iterable) {
    // …
  }
} catch (e) {
  // Handle the error
}
```

The `catch` will be able to catch errors thrown when `iterable` is not a valid iterable, when `next()` throws an error, when `return()` throws an error (if the `for` loop exits early), and when the `for` loop body throws an error.

Most iterators are implemented with generator functions, so we will demonstrate how generator functions typically handle errors:

```js
function* gen() {
  try {
    yield doSomething();
    yield doSomethingElse();
  } finally {
    cleanup();
  }
}
```

The lack of `catch` here causes errors thrown by `doSomething()` or `doSomethingElse()` to propagate to the caller of `gen`. If these errors are caught within the generator function (which is equally advisable), the generator function can decide to continue yielding values or to exit early. However, the `finally` block is necessary for generators that keep open resources. The `finally` block is guaranteed to run, either when the last `next()` is called or when `return()` is called.

### Forwarding errors

Some built-in syntaxes wrap an iterator into another iterator. They include the iterator produced by `Iterator.from()`, iterator helper methods (`map()`, `filter()`, `take()`, `drop()`, and `flatMap()`), `yield*`, and a hidden wrapper when you use async iteration (`for await...of`, `Array.fromAsync`) on sync iterators. The wrapped iterator is then responsible for forwarding errors between the inner iterator and the caller.

- Wrapper iterators generally directly forward the `next()` method of the inner iterator, including its return value and thrown errors. The async wrapper of a sync iterator awaits the returned object's `value` property and converts thrown errors into promise rejections. If a yielded promise rejects, the wrapper calls the inner iterator's `return()` method, if one exists, before rejecting its own promise. If the inner iterator's `next()` method itself throws, the wrapper rejects its promise without calling `return()`.
- Wrapper iterators generally directly forward the `return()` method of the inner iterator. If the `return()` method doesn't exist on the inner iterator, it returns `{ done: true, value: undefined }` instead. In the case of iterator helpers: if the iterator helper's `next()` method has not been called, after trying to call `return()` on the inner iterator, the current iterator always returns `{ done: true, value: undefined }`. This is consistent with generator functions where execution hasn't entered the `yield*` expression yet.
- `yield*` is the only built-in syntax that forwards the `throw()` method of the inner iterator. For information on how `yield*` forwards the `return()` and `throw()` methods, see its own reference.

## Examples

### User-defined iterables

You can make your own iterables like this:

```js
const myIterable = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  },
};

console.log([...myIterable]); // [1, 2, 3]
```

### Basic <example-value>

Iterators are stateful by nature. If you don't define it as a generator function (as the example above shows), you would likely want to encapsulate the state in a closure.

```js
function makeIterator(array) {
  let nextIndex = 0;
  return {
    next() {
      return nextIndex < array.length
        ? {
            value: array[nextIndex++],
            done: false,
          }
        : {
            done: true,
          };
    },
  };
}

const it = makeIterator(["yo", "ya"]);

console.log(it.next().value); // 'yo'
console.log(it.next().value); // 'ya'
console.log(it.next().done); // true
```

### Infinite iterator

```js
function idMaker() {
  let index = 0;
  return {
    next() {
      return {
        value: index++,
        done: false,
      };
    },
  };
}

const it = idMaker();

console.log(it.next().value); // 0
console.log(it.next().value); // 1
console.log(it.next().value); // 2
// …
```

### Defining an iterable with a generator

```js
function* makeGenerator(array) {
  let nextIndex = 0;
  while (nextIndex < array.length) {
    yield array[nextIndex++];
  }
}

const gen = makeGenerator(["yo", "ya"]);

console.log(gen.next().value); // 'yo'
console.log(gen.next().value); // 'ya'
console.log(gen.next().done); // true

function* idMaker() {
  let index = 0;
  while (true) {
    yield index++;
  }
}

const it = idMaker();

console.log(it.next().value); // 0
console.log(it.next().value); // 1
console.log(it.next().value); // 2
// …
```

### Defining an iterable with a class

State encapsulation can be done with private fields as well.

```js
class SimpleClass {
  #data;

  constructor(data) {
    this.#data = data;
  }

  [Symbol.iterator]() {
    // Use a new index for each iterator. This makes multiple
    // iterations over the iterable safe for non-trivial cases,
    // such as use of break or nested looping over the same iterable.
    let index = 0;

    return {
      // Note: using an arrow function allows `this` to point to the
      // one of `[Symbol.iterator]()` instead of `next()`
      next: () => {
        if (index >= this.#data.length) {
          return { done: true };
        }
        return { value: this.#data[index++], done: false };
      },
    };
  }
}

const simple = new SimpleClass([1, 2, 3, 4, 5]);

for (const val of simple) {
  console.log(val); // 1 2 3 4 5
}
```

### Overriding built-in iterables

For example, a `String` is a built-in iterable object:

```js
const someString = "hi";
console.log(typeof someString[Symbol.iterator]); // "function"
```

`String`'s default iterator returns the string's code points one by one:

```js
const iterator = someString[Symbol.iterator]();
console.log(`${iterator}`); // "[object String Iterator]"

console.log(iterator.next()); // { value: "h", done: false }
console.log(iterator.next()); // { value: "i", done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

You can redefine the iteration behavior by supplying your own `Symbol.iterator`:

```js
// need to construct a String object explicitly to avoid auto-boxing
const someString = new String("hi");

someString[Symbol.iterator] = function () {
  return {
    // this is the iterator object, returning a single element (the string "bye")
    next() {
      return this._first
        ? { value: "bye", done: (this._first = false) }
        : { done: true };
    },
    _first: true,
  };
};
```

Notice how redefining `Symbol.iterator` affects the behavior of built-in constructs that use the iteration protocol:

```js
console.log([...someString]); // ["bye"]
console.log(`${someString}`); // "hi"
```

### Concurrent modifications when iterating

Almost all iterables have the same underlying semantic: they don't copy the data at the time when iteration starts. Rather, they keep a pointer and move it around. Therefore, if you add, delete, or modify elements in the collection while iterating over the collection, you may inadvertently change whether other _unchanged_ elements in the collection are visited. This is very similar to how iterative array methods work.

Consider the following case using a `URLSearchParams`:

```js
const searchParams = new URLSearchParams(
  "deleteme1=value1&key2=value2&key3=value3",
);

// Delete unwanted keys
for (const [key, value] of searchParams) {
  console.log(key);
  if (key.startsWith("deleteme")) {
    searchParams.delete(key);
  }
}

// Output:
// deleteme1
// key3
```

Note how it never logs `key2`. This is because a `URLSearchParams` is underlyingly a list of key-value pairs. When `deleteme1` is visited and deleted, all other entries are shifted to the left by one, so `key2` occupies the position that `deleteme1` used to be in, and when the pointer moves to the next key, it lands on `key3`.

Certain iterable implementations avoid this problem by setting "tombstone" values to avoid shifting the remaining values. Consider the similar code using a `Map`:

```js
const myMap = new Map([
  ["deleteme1", "value1"],
  ["key2", "value2"],
  ["key3", "value3"],
]);

for (const [key, value] of myMap) {
  console.log(key);
  if (key.startsWith("deleteme")) {
    myMap.delete(key);
  }
}

// Output:
// deleteme1
// key2
// key3
```

Note how it logs all keys. This is because `Map` doesn't shift the remaining keys when one is deleted. If you want to implement something similar, here's how it may look:

```js
const tombstone = Symbol("tombstone");

class MyIterable {
  #data;
  constructor(data) {
    this.#data = data;
  }
  delete(deletedKey) {
    for (let i = 0; i < this.#data.length; i++) {
      if (this.#data[i][0] === deletedKey) {
        this.#data[i] = tombstone;
        return true;
      }
    }
    return false;
  }
  *[Symbol.iterator]() {
    for (const data of this.#data) {
      if (data !== tombstone) {
        yield data;
      }
    }
  }
}

const myIterable = new MyIterable([
  ["deleteme1", "value1"],
  ["key2", "value2"],
  ["key3", "value3"],
]);
for (const [key, value] of myIterable) {
  console.log(key);
  if (key.startsWith("deleteme")) {
    myIterable.delete(key);
  }
}
```

> **Warning:**
> Concurrent modifications, in general, are very bug-prone and confusing. Unless you know precisely how the iterable is implemented, it's best to avoid modifying the collection while iterating over it.

## See also

- Iterators and generators guide
- `function*`
- `Symbol.iterator`
- `Iterator`
