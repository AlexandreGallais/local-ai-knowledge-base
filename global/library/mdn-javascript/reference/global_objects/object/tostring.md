---
title: "Object.prototype.toString()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/object/tostring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Object.prototype.toString()

The **`toString()`** method of `Object` instances returns a string representing this object. This method is meant to be overridden by derived objects for custom type coercion logic.

```js
const map = new Map();

console.log(map.toString());
// Expected output: "[object Map]"
```

## Syntax

```js
toString()
```

### Parameters

By default `toString()` takes no parameters. However, objects that inherit from `Object` may override it with their own implementations that do take parameters. For example, the `Number.prototype.toString()` and `BigInt.prototype.toString()` methods take an optional `radix` parameter.

### Return value

A string representing the object.

## Description

JavaScript calls the `toString` method to convert an object to a primitive value. You rarely need to invoke the `toString` method yourself; JavaScript automatically invokes it when encountering an object where a primitive value is expected.

This method is called in priority by string conversion, but numeric conversion and primitive conversion call `valueOf()` in priority. However, because the base `valueOf()` method returns an object, the `toString()` method is usually called in the end, unless the object overrides `valueOf()`. For example, `+[1]` returns `1`, because its `toString()` method returns `"1"`, which is then converted to a number.

All objects that inherit from `Object.prototype` (that is, all except `null`-prototype objects) inherit the `toString()` method. When you create a custom object, you can override `toString()` to call a custom method, so that your custom object can be converted to a string value. Alternatively, you can add a `[Symbol.toPrimitive]()` method, which allows even more control over the conversion process, and will always be preferred over `valueOf` or `toString` for any type conversion.

To use the base `Object.prototype.toString()` with an object that has it overridden (or to invoke it on `null` or `undefined`), you need to call `Function.prototype.call()` or `Function.prototype.apply()` on it, passing the object you want to inspect as the first parameter (called `thisArg`).

```js
const arr = [1, 2, 3];

arr.toString(); // "1,2,3"
Object.prototype.toString.call(arr); // "[object Array]"
```

`Object.prototype.toString()` returns `"[object Type]"`, where `Type` is the object type. If the object has a `Symbol.toStringTag` property whose value is a string, that value will be used as the `Type`. Many built-in objects, including `Map` and `Symbol`, have a `Symbol.toStringTag`. Some objects predating ES6 do not have `Symbol.toStringTag`, but have a special tag nonetheless. They include (the tag is the same as the type name given below):

- `Array`
- `Function` (anything whose `typeof` returns `"function"`)
- `Error`
- `Boolean`
- `Number`
- `String`
- `Date`
- `RegExp`

The `arguments` object returns `"[object Arguments]"`. Everything else, including user-defined classes, unless with a custom `Symbol.toStringTag`, will return `"[object Object]"`.

`Object.prototype.toString()` invoked on `null` and `undefined` returns `[object Null]` and `[object Undefined]`, respectively.

## Examples

### Overriding toString for custom objects

You can create a function to be called in place of the default `toString()` method. The `toString()` function you create should return a string value. If it returns an object and the method is called implicitly during type conversion, then its result is ignored and the value of a related method, `valueOf()`, is used instead, or a `TypeError` is thrown if none of these methods return a primitive.

The following code defines a `Dog` class.

```js
class Dog {
  constructor(name, breed, color, sex) {
    this.name = name;
    this.breed = breed;
    this.color = color;
    this.sex = sex;
  }
}
```

If you call the `toString()` method, either explicitly or implicitly, on an instance of `Dog`, it returns the default value inherited from `Object`:

```js
const theDog = new Dog("Gabby", "Lab", "chocolate", "female");

theDog.toString(); // "[object Object]"
`${theDog}`; // "[object Object]"
```

The following code overrides the default `toString()` method. This method generates a string containing the `name`, `breed`, `color`, and `sex` of the object.

```js
class Dog {
  constructor(name, breed, color, sex) {
    this.name = name;
    this.breed = breed;
    this.color = color;
    this.sex = sex;
  }
  toString() {
    return `Dog ${this.name} is a ${this.sex} ${this.color} ${this.breed}`;
  }
}
```

With the preceding code in place, any time an instance of `Dog` is used in a string context, JavaScript automatically calls the `toString()` method.

```js
const theDog = new Dog("Gabby", "Lab", "chocolate", "female");

`${theDog}`; // "Dog Gabby is a female chocolate Lab"
```

### Using toString() to detect object class

`toString()` can be used with every object and (by default) allows you to get its class.

```js
const toString = Object.prototype.toString;

toString.call(new Date()); // [object Date]
toString.call(new String()); // [object String]
// Math has its Symbol.toStringTag
toString.call(Math); // [object Math]

toString.call(undefined); // [object Undefined]
toString.call(null); // [object Null]
```

Using `toString()` in this way is unreliable; objects can change the behavior of `Object.prototype.toString()` by defining a `Symbol.toStringTag` property, leading to unexpected results. For example:

```js
const myDate = new Date();
Object.prototype.toString.call(myDate); // [object Date]

myDate[Symbol.toStringTag] = "myDate";
Object.prototype.toString.call(myDate); // [object myDate]

Date.prototype[Symbol.toStringTag] = "prototype polluted";
Object.prototype.toString.call(new Date()); // [object prototype polluted]
```

## See also

- Polyfill of `Object.prototype.toString` with `Symbol.toStringTag` support in `core-js`
- `Object.prototype.valueOf()`
- `Number.prototype.toString()`
- `Symbol.toPrimitive`
- `Symbol.toStringTag`
