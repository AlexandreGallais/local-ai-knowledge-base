---
title: "Inheritance and the prototype chain (part 3 of 3)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/inheritance_and_the_prototype_chain/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Inheritance and the prototype chain (part 3 of 3)

## Different ways of creating and mutating prototype chains

We have encountered many ways to create objects and change their prototype chains. We will systematically summarize the different ways, comparing each approach's pros and cons.

### Objects created with syntax constructs

```js
const o = { a: 1 };
// The newly created object o has Object.prototype as its [[Prototype]]
// Object.prototype has null as its [[Prototype]].
// o ---> Object.prototype ---> null

const b = ["yo", "sup", "?"];
// Arrays inherit from Array.prototype
// (which has methods indexOf, forEach, etc.)
// The prototype chain looks like:
// b ---> Array.prototype ---> Object.prototype ---> null

function f() {
  return 2;
}
// Functions inherit from Function.prototype
// (which has methods call, bind, etc.)
// f ---> Function.prototype ---> Object.prototype ---> null

const p = { b: 2, __proto__: o };
// It is possible to point the newly created object's [[Prototype]] to
// another object via the __proto__ literal property. (Not to be confused
// with Object.prototype.__proto__ accessors)
// p ---> o ---> Object.prototype ---> null
```

When using the `__proto__` key in object initializers, pointing the `__proto__` key to something that is not an object only fails silently without throwing an exception. Contrary to the `Object.prototype.__proto__` setter, `__proto__` in object literal initializers is standardized and optimized, and can even be more performant than `Object.create`. Declaring extra own properties on the object at creation is more ergonomic than `Object.create`.

### With constructor functions

```js
function Graph() {
  this.vertices = [];
  this.edges = [];
}

Graph.prototype.addVertex = function (v) {
  this.vertices.push(v);
};

const g = new Graph();
// g is an object with own properties 'vertices' and 'edges'.
// g.[[Prototype]] is the value of Graph.prototype when new Graph() is executed.
```

Constructor functions have been available since very early JavaScript. Therefore, it is very fast, very standard, and very JIT-optimizable. However, it's also hard to "do properly" because methods added this way are enumerable by default, which is inconsistent with the class syntax or how built-in methods behave. Doing longer inheritance chains is also error-prone, as previously demonstrated.

### With Object.create()

Calling `Object.create()` creates a new object. The `[[Prototype]]` of this object is the first argument of the function:

```js
const a = { a: 1 };
// a ---> Object.prototype ---> null

const b = Object.create(a);
// b ---> a ---> Object.prototype ---> null
console.log(b.a); // 1 (inherited)

const c = Object.create(b);
// c ---> b ---> a ---> Object.prototype ---> null

const d = Object.create(null);
// d ---> null (d is an object that has null directly as its prototype)
console.log(d.hasOwnProperty);
// undefined, because d doesn't inherit from Object.prototype
```

Similar to the `__proto__` key in object initializers, `Object.create()` allows directly setting the prototype of an object at creation time, which permits the runtime to further optimize the object. It also allows the creation of objects with `null` prototype, using `Object.create(null)`. The second parameter of `Object.create()` allows you to precisely specify the attributes of each property in the new object, which can be a double-edged sword:

- It allows you to create non-enumerable properties, etc., during object creation, which is not possible with object literals.
- It is much more verbose and error-prone than object literals.
- It may be slower than object literals, especially when creating many properties.

### With classes

```js
class Rectangle {
  constructor(height, width) {
    this.name = "Rectangle";
    this.height = height;
    this.width = width;
  }
}

class FilledRectangle extends Rectangle {
  constructor(height, width, color) {
    super(height, width);
    this.name = "Filled rectangle";
    this.color = color;
  }
}

const filledRectangle = new FilledRectangle(5, 10, "blue");
// filledRectangle ---> FilledRectangle.prototype ---> Rectangle.prototype ---> Object.prototype ---> null
```

Classes offer the highest readability and maintainability when defining complex inheritance structures. Private elements are a feature with no trivial replacement in prototypal inheritance. However, classes are less optimized than traditional constructor functions and are not supported in older environments.

### With Object.setPrototypeOf()

While all methods above will set the prototype chain at object creation time, `Object.setPrototypeOf()` allows mutating the `[[Prototype]]` internal property of an existing object. It can even force a prototype on a prototype-less object created with `Object.create(null)` or remove the prototype of an object by setting it to `null`.

```js
const obj = { a: 1 };
const anotherObj = { b: 2 };
Object.setPrototypeOf(obj, anotherObj);
// obj ---> anotherObj ---> Object.prototype ---> null
```

However, you should set the prototype during creation if possible, because setting the prototype dynamically disrupts all optimizations that engines have made to the prototype chain. It might cause some engines to recompile your code for de-optimization, to make it work according to the specs.

### With the \_\_proto\_\_ accessor

All objects inherit the `Object.prototype.__proto__` setter, which can be used to set the `[[Prototype]]` of an existing object (if the `__proto__` key is not overridden on the object).

> **Warning:**
> `Object.prototype.__proto__` accessors are **non-standard** and deprecated. You should almost always use `Object.setPrototypeOf` instead.

```js
const obj = {};
// DON'T USE THIS: for example only.
obj.__proto__ = { barProp: "bar val" };
obj.__proto__.__proto__ = { fooProp: "foo val" };
console.log(obj.fooProp);
console.log(obj.barProp);
```

Compared to `Object.setPrototypeOf`, setting `__proto__` to something that is not an object fails silently without throwing an exception. It also has slightly better browser support. However, it is non-standard and deprecated. You should almost always use `Object.setPrototypeOf` instead.

## Performance

The lookup time for properties that are high up on the prototype chain can have a negative impact on the performance, and this may be significant in the code where performance is critical. Additionally, trying to access nonexistent properties will always traverse the full prototype chain.

Also, when iterating over the properties of an object, **every** enumerable property that is on the prototype chain will be enumerated. To check whether an object has a property defined on _itself_ and not somewhere on its prototype chain, it is necessary to use the `hasOwnProperty` or `Object.hasOwn` methods. All objects, except those with `null` as `[[Prototype]]`, inherit `hasOwnProperty` from `Object.prototype` — unless it has been overridden further down the prototype chain. To give you a concrete example, let's take the above graph example code to illustrate it:

```js
function Graph() {
  this.vertices = [];
  this.edges = [];
}

Graph.prototype.addVertex = function (v) {
  this.vertices.push(v);
};

const g = new Graph();
// g ---> Graph.prototype ---> Object.prototype ---> null

g.hasOwnProperty("vertices"); // true
Object.hasOwn(g, "vertices"); // true

g.hasOwnProperty("nope"); // false
Object.hasOwn(g, "nope"); // false

g.hasOwnProperty("addVertex"); // false
Object.hasOwn(g, "addVertex"); // false

Object.getPrototypeOf(g).hasOwnProperty("addVertex"); // true
```

Note: It is **not** enough to check whether a property is `undefined`. The property might very well exist, but its value just happens to be set to `undefined`.

## Conclusion

JavaScript may be a bit confusing for developers coming from Java or C++, as it's all dynamic, all runtime, and it has no static types at all. Everything is either an object (instance) or a function (constructor), and even functions themselves are instances of the `Function` constructor. Even the "classes" as syntax constructs are just constructor functions at runtime.

All constructor functions in JavaScript have a special property called `prototype`, which works with the `new` operator. The reference to the prototype object is copied to the internal `[[Prototype]]` property of the new instance. For example, when you do `const a1 = new A()`, JavaScript (after creating the object in memory and before running function `A()` with `this` defined to it) sets `a1.[[Prototype]] = A.prototype`. When you then access properties of the instance, JavaScript first checks whether they exist on that object directly, and if not, it looks in `[[Prototype]]`. `[[Prototype]]` is looked at _recursively_, i.e., `a1.doSomething`, `Object.getPrototypeOf(a1).doSomething`, `Object.getPrototypeOf(Object.getPrototypeOf(a1)).doSomething` etc., until it's found or `Object.getPrototypeOf` returns `null`. This means that all properties defined on `prototype` are effectively shared by all instances, and you can even later change parts of `prototype` and have the changes appear in all existing instances.

If, in the example above, you do `const a1 = new A(); const a2 = new A();`, then `a1.doSomething` would actually refer to `Object.getPrototypeOf(a1).doSomething` — which is the same as the `A.prototype.doSomething` you defined, i.e., `Object.getPrototypeOf(a1).doSomething === Object.getPrototypeOf(a2).doSomething === A.prototype.doSomething`.

It is essential to understand the prototypal inheritance model before writing complex code that makes use of it. Also, be aware of the length of the prototype chains in your code and break them up if necessary to avoid possible performance problems. Further, the native prototypes should **never** be extended unless it is for the sake of compatibility with newer JavaScript features.
