---
title: "Object.create()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/object/create/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Object.create()

The **`Object.create()`** static method creates a new object, using an existing object as the prototype of the newly created object.

```js
const person = {
  isHuman: false,
  printIntroduction() {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  },
};

const me = Object.create(person);

me.name = "Matthew"; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // Inherited properties can be overwritten

me.printIntroduction();
// Expected output: "My name is Matthew. Am I human? true"
```

## Syntax

```js
Object.create(proto)
Object.create(proto, propertiesObject)
```

### Parameters

- `proto`
    The object which should be the prototype of the newly-created object.
- `propertiesObject` (optional)
    If specified and not `undefined`, an object whose enumerable own properties specify property descriptors to be added to the newly-created object, with the corresponding property names. These properties correspond to the second argument of `Object.defineProperties()`.

### Return value

A new object with the specified prototype object and properties.

### Exceptions

- `TypeError`
    Thrown if `proto` is neither `null` nor an `Object`.

## Examples

### Classical inheritance with Object.create()

Below is an example of how to use `Object.create()` to achieve classical inheritance. This is for a single inheritance, which is all that JavaScript supports.

```js
// Shape - superclass
function Shape() {
  this.x = 0;
  this.y = 0;
}

// superclass method
Shape.prototype.move = function (x, y) {
  this.x += x;
  this.y += y;
  console.info("Shape moved.");
};

// Rectangle - subclass
function Rectangle() {
  Shape.call(this); // call super constructor.
}

// subclass extends superclass
Rectangle.prototype = Object.create(Shape.prototype, {
  // If you don't set Rectangle.prototype.constructor to Rectangle,
  // it will take the prototype.constructor of Shape (parent).
  // To avoid that, we set the prototype.constructor to Rectangle (child).
  constructor: {
    value: Rectangle,
    enumerable: false,
    writable: true,
    configurable: true,
  },
});

const rect = new Rectangle();

console.log("Is rect an instance of Rectangle?", rect instanceof Rectangle); // true
console.log("Is rect an instance of Shape?", rect instanceof Shape); // true
rect.move(1, 1); // Logs 'Shape moved.'
```

Note that there are caveats to watch out for using `create()`, such as re-adding the `constructor` property to ensure proper semantics. Although `Object.create()` is believed to have better performance than mutating the prototype with `Object.setPrototypeOf()`, the difference is in fact negligible if no instances have been created and property accesses haven't been optimized yet. In modern code, the class syntax should be preferred in any case.

### Using propertiesObject argument with Object.create()

`Object.create()` allows fine-tuned control over the object creation process. The object initializer syntax is, in fact, a syntax sugar of `Object.create()`. With `Object.create()`, we can create objects with a designated prototype and also some properties. Note that the second parameter maps keys to _property descriptors_ — this means you can control each property's enumerability, configurability, etc. as well, which you can't do in object initializers.

```js
o = {};
// Is equivalent to:
o = Object.create(Object.prototype);

o = Object.create(Object.prototype, {
  // foo is a regular data property
  foo: {
    writable: true,
    configurable: true,
    value: "hello",
  },
  // bar is an accessor property
  bar: {
    configurable: false,
    get() {
      return 10;
    },
    set(value) {
      console.log("Setting `o.bar` to", value);
    },
  },
});

// Create a new object whose prototype is a new, empty
// object and add a single property 'p', with value 42.
o = Object.create({}, { p: { value: 42 } });
```

With `Object.create()`, we can create an object with `null` as prototype. The equivalent syntax in object initializers would be the `__proto__` key.

```js
o = Object.create(null);
// Is equivalent to:
o = { __proto__: null };
```

By default properties are _not_ writable, enumerable or configurable.

```js
o.p = 24; // throws in strict mode
o.p; // 42

o.q = 12;
for (const prop in o) {
  console.log(prop);
}
// 'q'

delete o.p;
// false; throws in strict mode
```

To specify a property with the same attributes as in an initializer, explicitly specify `writable`, `enumerable` and `configurable`.

```js
o2 = Object.create(
  {},
  {
    p: {
      value: 42,
      writable: true,
      enumerable: true,
      configurable: true,
    },
  },
);
// This is not equivalent to:
// o2 = Object.create({ p: 42 })
// which will create an object with prototype { p: 42 }
```

You can use `Object.create()` to mimic the behavior of the `new` operator.

```js
function Constructor() {}
o = new Constructor();
// Is equivalent to:
o = Object.create(Constructor.prototype);
```

Of course, if there is actual initialization code in the `Constructor` function, the `Object.create()` method cannot reflect it.

## See also

- Polyfill of `Object.create` in `core-js`
- `Object.defineProperty()`
- `Object.defineProperties()`
- `Object.prototype.isPrototypeOf()`
- `Reflect.construct()`
- Object.getPrototypeOf by John Resig (2008)
