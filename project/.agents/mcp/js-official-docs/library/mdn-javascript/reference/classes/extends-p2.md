---
title: "extends (part 2 of 2)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/classes/extends/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# extends (part 2 of 2)

## Examples

### Using extends

The first example creates a class called `Square` from a class called `Polygon`. This example is extracted from this live demo (source).

```js
class Square extends Polygon {
  constructor(length) {
    // Here, it calls the parent class' constructor with lengths
    // provided for the Polygon's width and height
    super(length, length);
    // Note: In derived classes, super() must be called before you
    // can use 'this'. Leaving this out will cause a reference error.
    this.name = "Square";
  }

  get area() {
    return this.height * this.width;
  }
}
```

### Extending plain objects

Classes cannot extend regular (non-constructible) objects. If you want to inherit from a regular object by making all properties of this object available on inherited instances, you can instead use `Object.setPrototypeOf()`:

```js
const Animal = {
  speak() {
    console.log(`${this.name} makes a noise.`);
  },
};

class Dog {
  constructor(name) {
    this.name = name;
  }
}

Object.setPrototypeOf(Dog.prototype, Animal);

const d = new Dog("Mitzie");
d.speak(); // Mitzie makes a noise.
```

### Extending built-in objects

This example extends the built-in `Date` object. This example is extracted from this live demo (source).

```js
class MyDate extends Date {
  getFormattedDate() {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    return `${this.getDate()}-${months[this.getMonth()]}-${this.getFullYear()}`;
  }
}
```

### Extending `Object`

All JavaScript objects inherit from `Object.prototype` by default, so writing `extends Object` at first glance seems redundant. The only difference from not writing `extends` at all is that the constructor itself inherits static methods from `Object`, such as `Object.keys()`. However, because no `Object` static method uses the `this` value, there's still no value in inheriting these static methods.

The `Object()` constructor special-cases the subclassing scenario. If it's implicitly called via `super()`, it always initializes a new object with `new.target.prototype` as its prototype. Any value passed to `super()` is ignored.

```js
class C extends Object {
  constructor(v) {
    super(v);
  }
}

console.log(new C(1) instanceof Number); // false
console.log(C.keys({ a: 1, b: 2 })); // [ 'a', 'b' ]
```

Compare this behavior with a custom wrapper that does not special-case subclassing:

```js
function MyObject(v) {
  return new Object(v);
}
class D extends MyObject {
  constructor(v) {
    super(v);
  }
}
console.log(new D(1) instanceof Number); // true
```

### Species

You might want to return `Array` objects in your derived array class `MyArray`. The species pattern lets you override default constructors.

For example, when using methods such as `Array.prototype.map()` that return the default constructor, you want these methods to return a parent `Array` object, instead of the `MyArray` object. The `Symbol.species` symbol lets you do this:

```js
class MyArray extends Array {
  // Overwrite species to the parent Array constructor
  static get [Symbol.species]() {
    return Array;
  }
}

const a = new MyArray(1, 2, 3);
const mapped = a.map((x) => x * x);

console.log(mapped instanceof MyArray); // false
console.log(mapped instanceof Array); // true
```

This behavior is implemented by many built-in copying methods. For caveats of this feature, see the subclassing built-ins discussion.

### Mix-ins

Abstract subclasses or _mix-ins_ are templates for classes. A class can only have a single superclass, so multiple inheritance from tooling classes, for example, is not possible. The functionality must be provided by the superclass.

A function with a superclass as input and a subclass extending that superclass as output can be used to implement mix-ins:

```js
const calculatorMixin = (Base) =>
  class extends Base {
    calc() {}
  };

const randomizerMixin = (Base) =>
  class extends Base {
    randomize() {}
  };
```

A class that uses these mix-ins can then be written like this:

```js
class Foo {}
class Bar extends calculatorMixin(randomizerMixin(Foo)) {}
```

### Avoiding inheritance

Inheritance is a very strong coupling relationship in object-oriented programming. It means all behaviors of the base class are inherited by the subclass by default, which may not always be what you want. For example, consider the implementation of a `ReadOnlyMap`:

```js
class ReadOnlyMap extends Map {
  set() {
    throw new TypeError("A read-only map must be set at construction time.");
  }
}
```

It turns out that `ReadOnlyMap` is not constructible, because the `Map()` constructor calls the instance's `set()` method.

```js
const m = new ReadOnlyMap([["a", 1]]); // TypeError: A read-only map must be set at construction time.
```

We may get around this by using a private flag to indicate whether the instance is being constructed. However, a more significant problem with this design is that it breaks the Liskov substitution principle, which states that a subclass should be substitutable for its superclass. If a function expects a `Map` object, it should be able to use a `ReadOnlyMap` object as well, which will break here.

Inheritance often leads to the circle-ellipse problem, because neither type perfectly entails the behavior of the other, although they share a lot of common traits. In general, unless there's a very good reason to use inheritance, it's better to use composition instead. Composition means that a class has a reference to an object of another class, and only uses that object as an implementation detail.

```js
class ReadOnlyMap {
  #data;
  constructor(values) {
    this.#data = new Map(values);
  }
  get(key) {
    return this.#data.get(key);
  }
  has(key) {
    return this.#data.has(key);
  }
  get size() {
    return this.#data.size;
  }
  *keys() {
    yield* this.#data.keys();
  }
  *values() {
    yield* this.#data.values();
  }
  *entries() {
    yield* this.#data.entries();
  }
  *[Symbol.iterator]() {
    yield* this.#data[Symbol.iterator]();
  }
}
```

In this case, the `ReadOnlyMap` class is not a subclass of `Map`, but it still implements most of the same methods. This means more code duplication, but it also means that the `ReadOnlyMap` class is not strongly coupled to the `Map` class, and does not easily break if the `Map` class is changed, avoiding the semantic issues of built-in subclassing. For example, if the `Map` class adds a new utility method (such as `getOrInsert()`) that does not call `set()`, it would cause the `ReadOnlyMap` class to no longer be read-only unless the latter is updated accordingly to override `getOrInsert()` as well. Moreover, `ReadOnlyMap` objects do not have the `set` method at all, which is more accurate than throwing an error at runtime.

## See also

- Using classes guide
- Classes
- `constructor`
- `class`
- `super`
