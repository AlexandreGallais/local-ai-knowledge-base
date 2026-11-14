---
title: "JavaScript data types and data structures (part 2 of 2)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/data_structures/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# JavaScript data types and data structures (part 2 of 2)

## Objects

In computer science, an object is a value in memory which is possibly referenced by an identifier. In JavaScript, objects are the only mutable values. Functions are, in fact, also objects with the additional capability of being _callable_.

### Properties

In JavaScript, objects can be seen as a collection of properties. With the object literal syntax, a limited set of properties are initialized; then properties can be added and removed. Object properties are equivalent to key-value pairs. Property keys are either strings or symbols. When other types (such as numbers) are used to index objects, the values are implicitly converted to strings. Property values can be values of any type, including other objects, which enables building complex data structures.

There are two types of object properties: The _data_ property and the _accessor_ property. Each property has corresponding _attributes_. Each attribute is accessed internally by the JavaScript engine, but you can set them through `Object.defineProperty()`, or read them through `Object.getOwnPropertyDescriptor()`. You can read more about the various nuances on the `Object.defineProperty()` page.

#### Data property

Data properties associate a key with a value. It can be described by the following attributes:

- `value`
    The value retrieved by a get access of the property. Can be any JavaScript value.
- `writable`
    A boolean value indicating if the property can be changed with an assignment.
- `enumerable`
    A boolean value indicating if the property can be enumerated by a `for...in` loop. See also Enumerability and ownership of properties for how enumerability interacts with other functions and syntaxes.
- `configurable`
    A boolean value indicating if the property can be deleted, can be changed to an accessor property, and can have its attributes changed.

#### Accessor property

Associates a key with one of two accessor functions (`get` and `set`) to retrieve or store a value.

> **Note:**
> It's important to recognize it's accessor _property_ — not accessor _method_. We can give a JavaScript object class-like accessors by using a function as a value — but that doesn't make the object a class.

An accessor property has the following attributes:

- `get`
    A function called with an empty argument list to retrieve the property value whenever a get access to the value is performed. See also getters. May be `undefined`.
- `set`
    A function called with an argument that contains the assigned value. Executed whenever a specified property is attempted to be changed. See also setters. May be `undefined`.
- `enumerable`
    A boolean value indicating if the property can be enumerated by a `for...in` loop. See also Enumerability and ownership of properties for how enumerability interacts with other functions and syntaxes.
- `configurable`
    A boolean value indicating if the property can be deleted, can be changed to a data property, and can have its attributes changed.

The prototype of an object points to another object or to `null` — it's conceptually a hidden property of the object, commonly represented as `[[Prototype]]`. Properties of the object's `[[Prototype]]` can also be accessed on the object itself.

Objects are ad-hoc key-value pairs, so they are often used as maps. However, there can be ergonomics, security, and performance issues. Use a `Map` for storing arbitrary data instead. The `Map` reference contains a more detailed discussion of the pros & cons between plain objects and maps for storing key-value associations.

### Dates

JavaScript provides two sets of APIs for representing dates: the legacy `Date` object and the modern `Temporal` object. `Date` has many undesirable design choices and should be avoided in new code if possible.

### Indexed collections: Arrays and typed Arrays

Arrays are regular objects for which there is a particular relationship between integer-keyed properties and the `length` property.

Additionally, arrays inherit from `Array.prototype`, which provides a handful of convenient methods to manipulate arrays. For example, `indexOf()` searches a value in the array and `push()` appends an element to the array. This makes Arrays a perfect candidate to represent ordered lists.

Typed Arrays present an array-like view of an underlying binary data buffer, and offer many methods that have similar semantics to the array counterparts. "Typed array" is an umbrella term for a range of data structures, including `Int8Array`, `Float32Array`, etc. Check the typed array page for more information. Typed arrays are often used in conjunction with `ArrayBuffer` and `DataView`.

### Keyed collections: Maps, Sets, WeakMaps, WeakSets

These data structures take object references as keys. `Set` and `WeakSet` represent a collection of unique values, while `Map` and `WeakMap` represent a collection of key-value associations.

You could implement `Map`s and `Set`s yourself. However, since objects cannot be compared (in the sense of `<` "less than", for instance), neither does the engine expose its hash function for objects, look-up performance would necessarily be linear. Native implementations of them (including `WeakMap`s) can have look-up performance that is approximately logarithmic to constant time.

Usually, to bind data to a DOM node, one could set properties directly on the object, or use `data-*` attributes. This has the downside that the data is available to any script running in the same context. `Map`s and `WeakMap`s make it easy to _privately_ bind data to an object.

`WeakMap` and `WeakSet` only allow garbage-collectable values as keys, which are either objects or non-registered symbols, and the keys may be collected even when they remain in the collection. They are specifically used for memory usage optimization.

### Structured data: JSON

JSON (**J**ava**S**cript **O**bject **N**otation) is a lightweight data-interchange format, derived from JavaScript, but used by many programming languages. JSON builds universal data structures that can be transferred between different environments and even across languages. See `JSON` for more details.

### More objects in the standard library

JavaScript has a standard library of built-in objects. Read the reference to find out more about the built-in objects.

## Type coercion

As mentioned above, JavaScript is a weakly typed language. This means that you can often use a value of one type where another type is expected, and the language will convert it to the right type for you. To do so, JavaScript defines a handful of coercion rules.

### Primitive coercion

The primitive coercion process is used where a primitive value is expected, but there's no strong preference for what the actual type should be. This is usually when a string, a number, or a BigInt are equally acceptable. For example:

- The `Date()` constructor, when it receives one argument that's not a `Date` instance — strings represent date strings, while numbers represent timestamps.
- The `+` operator — if one operand is a string, string concatenation is performed; otherwise, numeric addition is performed.
- The `==` operator — if one operand is a primitive while the other is an object, the object is converted to a primitive value with no preferred type.

This operation does not do any conversion if the value is already a primitive. Objects are converted to primitives by calling its `[Symbol.toPrimitive]()` (with `"default"` as hint), `valueOf()`, and `toString()` methods, in that order. Note that primitive conversion calls `valueOf()` before `toString()`, which is similar to the behavior of number coercion but different from string coercion.

The `Symbol.toPrimitive` method, if present, must return a primitive — returning an object results in a `TypeError`. For `valueOf()` and `toString()`, if one returns an object, the return value is ignored and the other's return value is used instead; if neither is present, or neither returns a primitive, a `TypeError` is thrown. For example, in the following code:

```js
console.log({} + []); // "[object Object]"
```

Neither `{}` nor `[]` have a `Symbol.toPrimitive` method. Both `{}` and `[]` inherit `valueOf()` from `Object.prototype.valueOf`, which returns the object itself. Since the return value is an object, it is ignored. Therefore, `toString()` is called instead. `{}.toString()` returns `"[object Object]"`, while `[].toString()` returns `""`, so the result is their concatenation: `"[object Object]"`.

The `Symbol.toPrimitive` method always takes precedence when doing conversion to any primitive type. Primitive conversion generally behaves like number conversion, because `valueOf()` is called in priority; however, objects with custom `Symbol.toPrimitive` methods can choose to return any primitive. `Date` and `Symbol` objects are the only built-in objects that override the `Symbol.toPrimitive` method. `Date.prototype[Symbol.toPrimitive]()` treats the `"default"` hint as if it's `"string"`, while `Symbol.prototype[Symbol.toPrimitive]()` ignores the hint and always returns a symbol.

### Numeric coercion

There are two numeric types: Number and BigInt. Sometimes the language specifically expects a number or a BigInt (such as `Array.prototype.slice()`, where the index must be a number); other times, it may tolerate either and perform different operations depending on the operand's type. For strict coercion processes that do not allow implicit conversion from the other type, see number coercion and BigInt coercion.

Numeric coercion is nearly the same as number coercion, except that BigInts are returned as-is instead of causing a `TypeError`. Numeric coercion is used by all arithmetic operators, since they are overloaded for both numbers and BigInts. The only exception is unary plus, which always does number coercion.

### Other coercions

All data types, except Null, Undefined, and Symbol, have their respective coercion process. See string coercion, boolean coercion, and object coercion for more details.

As you may have noticed, there are three distinct paths through which objects may be converted to primitives:

- Primitive coercion: `Symbol.toPrimitive` → `valueOf()` → `toString()`
- Numeric coercion, number coercion, BigInt coercion: `Symbol.toPrimitive` → `valueOf()` → `toString()`
- String coercion: `Symbol.toPrimitive` → `toString()` → `valueOf()`

In all cases, `Symbol.toPrimitive`, if present, must be callable and return a primitive, while `valueOf` or `toString` will be ignored if they are not callable or return an object. At the end of the process, if successful, the result is guaranteed to be a primitive. The resulting primitive is then subject to further coercions depending on the context.

## See also

- JavaScript Data Structures and Algorithms by Oleksii Trekhleb
- Computer Science in JavaScript by Nicholas C. Zakas
