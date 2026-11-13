---
title: "Property accessors"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/property_accessors/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Property accessors

**Property accessors** provide access to an object's properties by using the dot notation or the bracket notation.

```js
const person1 = {};
person1["firstName"] = "Mario";
person1["lastName"] = "Rossi";

console.log(person1.firstName);
// Expected output: "Mario"

const person2 = {
  firstName: "John",
  lastName: "Doe",
};

console.log(person2["lastName"]);
// Expected output: "Doe"
```

## Syntax

```js
object.propertyName
object[expression]
object.#privateProperty
```

## Description

One can think of an object as an _associative array_ (a.k.a. _map_, _dictionary_, _hash_, _lookup table_). The _keys_ in this array are the names of the object's properties.

There are two ways to access properties: _dot notation_ and _bracket notation_.

### Dot notation

In the `object.propertyName` syntax, the `propertyName` must be a valid JavaScript identifier which can also be a reserved word. For example, `object.$1` is valid, while `object.1` is not.

```js
const variable = object.propertyName;
object.propertyName = value;
```

```js
const object = {};
object.$1 = "foo";
console.log(object.$1); // 'foo'
```

```js
const object = {};
object.1 = "bar"; // SyntaxError
console.log(object.1); // SyntaxError
```

Here, the method named `createElement` is retrieved from `document` and is called.

```js
document.createElement("pre");
```

If you use a method for a numeric literal, and the numeric literal has no exponent and no decimal point, you should leave white-space(s) before the dot preceding the method call, so that the dot is not interpreted as a decimal point.

```js
77 .toExponential();
// or
77
.toExponential();
// or
(77).toExponential();
// or
77..toExponential();
// or
77.0.toExponential();
// because 77. === 77.0, no ambiguity
```

In addition, private elements can only be accessed using dot notation within the class that defines them.

### Bracket notation

In the `object[expression]` syntax, the `expression` should evaluate to a string or Symbol that represents the property's name. So, it can be any string literal, for example, including `'1foo'`, `'!bar!'`, or even `' '` (a space).

```js
const variable = object[propertyName];
object[propertyName] = value;
```

This does the exact same thing as the previous example.

```js
document["createElement"]("pre");
```

A space before bracket notation is allowed.

```js
document ["createElement"]("pre");
```

Passing expressions that evaluate to property name will do the same thing as directly passing the property name.

```js
const key = "name";
const getKey = () => "name";
const Obj = { name: "Michel" };

Obj["name"]; // returns "Michel"
Obj[key]; // evaluates to Obj["name"], and returns "Michel"
Obj[getKey()]; // evaluates to Obj["name"], and returns "Michel"
```

However, beware of using square brackets to access properties whose names are given by external input. This may make your code susceptible to object injection attacks.

### Property names

Each property name is a string or a Symbol. Any other value, including a number, is coerced to a string. This outputs `'value'`, since `1` is coerced into `'1'`.

```js
const object = {};
object["1"] = "value";
console.log(object[1]);
```

This also outputs `'value'`, since both `foo` and `bar` are converted to the same string (`"[object Object]"`).

```js
const foo = { uniqueProp: 1 };
const bar = { uniqueProp: 2 };
const object = {};
object[foo] = "value";
console.log(object[bar]);
```

### Method binding

It's typical when speaking of an object's properties to make a distinction between properties and methods. However, the property/method distinction is little more than a convention. A method is a property that can be called (for example, if it has a reference to a `Function` instance as its value).

A method is not bound to the object that it is a property of. Specifically, `this` is not fixed in a method and does not necessarily refer to the object containing the method. Instead, `this` is "passed" by the function call. See the reference for `this`.

## Examples

### Bracket notation vs. eval()

JavaScript novices often make the mistake of using `eval()` where the bracket notation can be used instead.

For example, the following syntax is often seen in many scripts.

```js
const x = eval(`document.forms.form_name.elements.${strFormControl}.value`);
```

`eval()` is slow and should be avoided whenever possible. Also, `strFormControl` would have to hold an identifier, which is not required for names and `id`s of form controls. It is better to use bracket notation instead:

```js
const x = document.forms.form_name.elements[strFormControl].value;
```

## See also

- `Object`
- `Object.defineProperty()`
- Optional chaining (`?.`)
