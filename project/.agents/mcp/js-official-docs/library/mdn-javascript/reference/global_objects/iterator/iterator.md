---
title: "Iterator() constructor"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/iterator/iterator/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Iterator() constructor

The **`Iterator()`** constructor is intended to be used as the superclass of other classes that create iterators. It throws an error when constructed by itself.

## Syntax

```js
new Iterator()
```

> **Note:**
> `Iterator()` can only be constructed with `new`. Attempting to call it without `new` throws a `TypeError`. In addition, `Iterator()` cannot actually be constructed itself — it's usually implicitly constructed through `super()` calls inside the constructor of a subclass.

### Parameters

None.

### Return value

A new `Iterator` object.

### Exceptions

- `TypeError`
    When `new.target` is the `Iterator` function itself, i.e., when the `Iterator` constructor itself is constructed.

## Description

`Iterator` represents an _abstract class_ — a class that provides common utilities for its subclasses, but is not intended to be instantiated itself. It is the superclass of all other iterator classes, and is used to create subclasses that implement specific iteration algorithms — namely, all subclasses of `Iterator` must implement a `next()` method as required by the iterator protocol. Because `Iterator` doesn't actually provide the `next()` method, it doesn't make sense to construct an `Iterator` directly.

You can also use `Iterator.from()` to create an `Iterator` instance from an existing iterable or iterator object.

## Examples

### Subclassing Iterator

The following example defines a custom data structure, `Range`, which allows iteration. To make an object iterable, we can provide a `[Symbol.iterator]()` method in the form of a generator function:

```js
class Range {
  #start;
  #end;
  #step;

  constructor(start, end, step = 1) {
    this.#start = start;
    this.#end = end;
    this.#step = step;
  }

  *[Symbol.iterator]() {
    for (let value = this.#start; value <= this.#end; value += this.#step) {
      yield value;
    }
  }
}

const range = new Range(1, 5);
for (const num of range) {
  console.log(num);
}
```

This works, but it isn't as nice as how built-in iterators work. There are two problems:

- The returned iterator inherits from `Generator`, which means modifications to `Generator.prototype` are going to affect the returned iterator, which is a leak of abstraction.
- The returned iterator does not inherit from a custom prototype, which makes it harder if we intend to add extra methods to the iterator.

We can mimic the implementation of built-in iterators, such as map iterators, by subclassing `Iterator`. This enables us to define extra properties, such as `[Symbol.toStringTag]`, while making the iterator helper methods available on the returned iterator.

```js
class Range {
  #start;
  #end;
  #step;

  constructor(start, end, step = 1) {
    this.#start = start;
    this.#end = end;
    this.#step = step;
  }

  static #RangeIterator = class extends Iterator {
    #cur;
    #s;
    #e;
    constructor(range) {
      super();
      this.#cur = range.#start;
      this.#s = range.#step;
      this.#e = range.#end;
    }
    static {
      Object.defineProperty(this.prototype, Symbol.toStringTag, {
        value: "Range Iterator",
        configurable: true,
        enumerable: false,
        writable: false,
      });

      // Avoid #RangeIterator from being accessible outside
      delete this.prototype.constructor;
    }
    next() {
      if (this.#cur > this.#e) {
        return { value: undefined, done: true };
      }
      const res = { value: this.#cur, done: false };
      this.#cur += this.#s;
      return res;
    }
  };

  [Symbol.iterator]() {
    return new Range.#RangeIterator(this);
  }
}

const range = new Range(1, 5);
for (const num of range) {
  console.log(num);
}
```

The subclassing pattern is useful if you want to create many custom iterators. If you have an existing iterable or iterator object which doesn't inherit from `Iterator`, and you just want to call iterator helper methods on it, you can use `Iterator.from()` to create a one-time `Iterator` instance.

## See also

- Polyfill of `Iterator` in `core-js`
- es-shims polyfill of `Iterator` and associated helpers
- `Iterator`
- `Iterator.from()`
