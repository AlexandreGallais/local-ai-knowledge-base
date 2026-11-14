---
title: "new.target"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/new.target/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# new.target

The **`new.target`** meta-property lets you detect whether a function or constructor was called using the `new` operator. In constructors and functions invoked using the `new` operator, `new.target` returns a reference to the constructor or function that `new` was called upon. In normal function calls, `new.target` is `undefined`.

```js
function Foo() {
  if (!new.target) {
    throw new TypeError("calling Foo constructor without new is invalid");
  }
}

try {
  Foo();
} catch (e) {
  console.log(e);
  // Expected output: TypeError: calling Foo constructor without new is invalid
}
```

## Syntax

```js
new.target
```

### Value

`new.target` is guaranteed to be a constructable function value or `undefined`.

- In class constructors, it refers to the class that `new` was called upon, which may be a subclass of the current constructor, because subclasses transitively call the superclass's constructor through `super()`.
- In ordinary functions, if the function is constructed directly with `new`, `new.target` refers to the function itself. If the function is called without `new`, `new.target` is `undefined`. Functions can be used as the base class for `extends`, in which case `new.target` may refer to the subclass.
- If a constructor (class or function) is called via `Reflect.construct()`, then `new.target` refers to the value passed as `newTarget` (which defaults to `target`).
- In arrow functions, `new.target` is inherited from the surrounding scope. If the arrow function is not defined within another class or function which has a `new.target` binding, then a syntax error is thrown.
- In static initialization blocks, `new.target` is `undefined`.

## Description

The `new.target` syntax consists of the keyword `new`, a dot, and the identifier `target`. Because `new` is a reserved word, not an identifier, this is not a property accessor, but a special expression syntax.

The `new.target` meta-property is available in all function/class bodies; using `new.target` outside of functions or classes is a syntax error.

## Examples

### new\.target in function calls

In normal function calls (as opposed to constructor function calls), `new.target` is `undefined`. This lets you detect whether a function was called with `new` as a constructor.

```js
function Foo() {
  if (!new.target) {
    throw new Error("Foo() must be called with new");
  }
  console.log("Foo instantiated with new");
}

new Foo(); // Logs "Foo instantiated with new"
Foo(); // Throws "Foo() must be called with new"
```

### new\.target in constructors

In class constructors, `new.target` refers to the constructor that was directly invoked by `new`. This is also the case if the constructor is in a parent class and was delegated from a child constructor. `new.target` points to the class that `new` was called upon. For example, when `b` was initialized using `new B()`, the name of `B` was printed; and similarly, in case of `a`, the name of class `A` was printed.

```js
class A {
  constructor() {
    console.log(new.target.name);
  }
}

class B extends A {
  constructor() {
    super();
  }
}

const a = new A(); // Logs "A"
const b = new B(); // Logs "B"
```

### new\.target using Reflect.construct()

Before `Reflect.construct()` or classes, it was common to implement inheritance by passing the value of `this`, and letting the base constructor mutate it.

```js
function Base() {
  this.name = "Base";
}

function Extended() {
  // Only way to make the Base() constructor work on the existing
  // `this` value instead of a new object that `new` creates.
  Base.call(this);
  this.otherProperty = "Extended";
}

Object.setPrototypeOf(Extended.prototype, Base.prototype);
Object.setPrototypeOf(Extended, Base);

console.log(new Extended()); // Extended { name: 'Base', otherProperty: 'Extended' }
```

However, `call()` and `apply()` actually _call_ the function instead of _constructing_ it, so `new.target` has value `undefined`. This means that if `Base()` checks whether it's constructed with `new`, an error will be thrown, or it may behave in other unexpected ways. For example, you can't extend `Map` this way, because the `Map()` constructor cannot be called without `new`.

All built-in constructors directly construct the entire prototype chain of the new instance by reading `new.target.prototype`. So to make sure that (1) `Base` is constructed with `new`, and (2) `new.target` points to the subclass instead of `Base` itself, we need to use `Reflect.construct()`.

```js
function BetterMap(entries) {
  // Call the base class constructor, but setting `new.target` to the subclass,
  // so that the instance created has the correct prototype chain.
  return Reflect.construct(Map, [entries], BetterMap);
}

BetterMap.prototype.upsert = function (key, actions) {
  if (this.has(key)) {
    this.set(key, actions.update(this.get(key)));
  } else {
    this.set(key, actions.insert());
  }
};

Object.setPrototypeOf(BetterMap.prototype, Map.prototype);
Object.setPrototypeOf(BetterMap, Map);

const map = new BetterMap([["a", 1]]);
map.upsert("a", {
  update: (value) => value + 1,
  insert: () => 1,
});
console.log(map.get("a")); // 2
```

> **Note:**
> In fact, due to the lack of `Reflect.construct()`, it is not possible to properly subclass built-ins (like `Error` subclassing) when transpiling to pre-ES6 code.

However, if you are writing ES6 code, prefer using classes and `extends` instead, as it's more readable and less error-prone.

```js
class BetterMap extends Map {
  // The constructor is omitted because it's just the default one

  upsert(key, actions) {
    if (this.has(key)) {
      this.set(key, actions.update(this.get(key)));
    } else {
      this.set(key, actions.insert());
    }
  }
}

const map = new BetterMap([["a", 1]]);
map.upsert("a", {
  update: (value) => value + 1,
  insert: () => 1,
});
console.log(map.get("a")); // 2
```

## See also

- Functions
- Classes
- `new`
- `this`
