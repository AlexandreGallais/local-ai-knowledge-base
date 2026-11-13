---
title: "extends (part 1 of 2)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/classes/extends/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# extends

The **`extends`** keyword is used in class declarations or class expressions to create a class that is a child of another class.

```js
class DateFormatter extends Date {
  getFormattedDate() {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${this.getDate()}-${months[this.getMonth()]}-${this.getFullYear()}`;
  }
}

console.log(new DateFormatter("August 19, 1975 23:15:30").getFormattedDate());
// Expected output: "19-Aug-1975"
```

## Syntax

```js
class ChildClass extends ParentClass { /* … */ }
```

- `ParentClass`
    An expression that evaluates to a constructor function (including a class) or `null`.

## Description

The `extends` keyword can be used to subclass custom classes as well as built-in objects.

Any constructor that can be called with `new` and has the `prototype` property can be the candidate for the parent class. The two conditions must both hold — for example, bound functions and `Proxy` can be constructed, but they don't have a `prototype` property, so they cannot be subclassed.

```js
function OldStyleClass() {
  this.someProperty = 1;
}
OldStyleClass.prototype.someMethod = function () {};

class ChildClass extends OldStyleClass {}

class ModernClass {
  someProperty = 1;
  someMethod() {}
}

class AnotherChildClass extends ModernClass {}
```

The `prototype` property of the `ParentClass` must be an `Object` or `null`, but you would rarely worry about this in practice, because a non-object `prototype` doesn't behave as it should anyway. (It's ignored by the `new` operator.)

```js
function ParentClass() {}
ParentClass.prototype = 3;

class ChildClass extends ParentClass {}
// Uncaught TypeError: Class extends value does not have valid prototype property 3

console.log(Object.getPrototypeOf(new ParentClass()));
// [Object: null prototype] {}
// Not actually a number!
```

`extends` sets the prototype for both `ChildClass` and `ChildClass.prototype`.

|                                   | Prototype of `ChildClass` | Prototype of `ChildClass.prototype` |
| --------------------------------- | ------------------------- | ----------------------------------- |
| `extends` clause absent           | `Function.prototype`      | `Object.prototype`                  |
| `extends null` | `Function.prototype`      | `null`                              |
| `extends ParentClass`             | `ParentClass`             | `ParentClass.prototype`             |

```js
class ParentClass {}
class ChildClass extends ParentClass {}

// Allows inheritance of static properties
Object.getPrototypeOf(ChildClass) === ParentClass;
// Allows inheritance of instance properties
Object.getPrototypeOf(ChildClass.prototype) === ParentClass.prototype;
```

The right-hand side of `extends` does not have to be an identifier. You can use any expression that evaluates to a constructor. This is often useful to create mixins. The `this` value in the `extends` expression is the `this` surrounding the class definition, and referring to the class's name is a `ReferenceError` because the class is not initialized yet. `await` and `yield` work as expected in this expression.

```js
class SomeClass extends class {
  constructor() {
    console.log("Base class");
  }
} {
  constructor() {
    super();
    console.log("Derived class");
  }
}

new SomeClass();
// Base class
// Derived class
```

While the base class may return anything from its constructor, the derived class must return an object or `undefined`, or a `TypeError` will be thrown.

```js
class ParentClass {
  constructor() {
    return 1;
  }
}

console.log(new ParentClass()); // ParentClass {}
// The return value is ignored because it's not an object
// This is consistent with function constructors

class ChildClass extends ParentClass {
  constructor() {
    super();
    return 1;
  }
}

console.log(new ChildClass()); // TypeError: Derived constructors may only return object or undefined
```

If the parent class constructor returns an object, that object will be used as the `this` value for the derived class when further initializing class fields. This trick is called "return overriding", which allows a derived class's fields (including private ones) to be defined on unrelated objects.

### Subclassing built-ins

> **Warning:**
> The standard committee now holds the position that the built-in subclassing mechanism in previous spec versions is over-engineered and causes non-negligible performance and security impacts. New built-in methods consider less about subclasses, and engine implementers are investigating whether to remove certain subclassing mechanisms. Consider using composition instead of inheritance when enhancing built-ins.

Here are some things you may expect when extending a class:

- When calling a static factory method (like `Promise.resolve()` or `Array.from()`) on a subclass, the returned instance is always an instance of the subclass.
- When calling an instance method that returns a new instance (like `Promise.prototype.then()` or `Array.prototype.map()`) on a subclass, the returned instance is always an instance of the subclass.
- Instance methods try to delegate to a minimal set of primitive methods where possible. For example, for a subclass of `Promise`, overriding `then()` automatically causes the behavior of `catch()` to change; or for a subclass of `Map`, overriding `set()` automatically causes the behavior of the `Map()` constructor to change.

However, the above expectations take non-trivial efforts to implement properly.

- The first one requires the static method to read the value of `this` to get the constructor for constructing the returned instance. This means `[p1, p2, p3].map(Promise.resolve)` throws an error because the `this` inside `Promise.resolve` is `undefined`. A way to fix this is to fall back to the base class if `this` is not a constructor, like `Array.from()` does, but that still means the base class is special-cased.
- The second one requires the instance method to read `this.constructor` to get the constructor function. However, `new this.constructor()` may break legacy code, because the `constructor` property is both writable and configurable and is not protected in any way. Therefore, many copying built-in methods use the constructor's `[Symbol.species]` property instead (which by default just returns `this`, the constructor itself). However, `[Symbol.species]` allows running arbitrary code and creating instances of arbitrary type, which poses a security concern and greatly complicates subclassing semantics.
- The third one leads to visible invocations of custom code, which makes a lot of optimizations harder to implement. For example, if the `Map()` constructor is called with an iterable of _x_ elements, then it must visibly invoke the `set()` method _x_ times, instead of just copying the elements into the internal storage.

These problems are not unique to built-in classes. For your own classes, you will likely have to make the same decisions. However, for built-in classes, optimizability and security are a much bigger concern. New built-in methods always construct the base class and call as few custom methods as possible. If you want to subclass built-ins while achieving the above expectations, you need to override all methods that have the default behavior baked into them. Any addition of new methods on the base class may also break the semantics of your subclass because they are inherited by default. Therefore, a better way to extend built-ins is to use _composition_.

### Extending null

`extends null` was designed to allow easy creation of objects that do not inherit from `Object.prototype`. However, due to unsettled decisions about whether `super()` should be called within the constructor, it's not possible to construct such a class in practice using any constructor implementation that doesn't return an object. The TC39 committee is working on re-enabling this feature.

```js
new (class extends null {})();
// TypeError: Super constructor null of anonymous class is not a constructor

new (class extends null {
  constructor() {}
})();
// ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor

new (class extends null {
  constructor() {
    super();
  }
})();
// TypeError: Super constructor null of anonymous class is not a constructor
```

Instead, you need to explicitly return an instance from the constructor.

```js
class NullClass extends null {
  constructor() {
    // Using new.target allows derived classes to
    // have the correct prototype chain
    return Object.create(new.target.prototype);
  }
}

const proto = Object.getPrototypeOf;
console.log(proto(proto(new NullClass()))); // null
```
