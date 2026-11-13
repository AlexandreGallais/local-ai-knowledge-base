---
title: "Boolean() constructor"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/boolean/boolean/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Boolean() constructor

The **`Boolean()`** constructor creates `Boolean` objects. When called as a function, it returns primitive values of type Boolean.

```js
const flag = new Boolean();
console.log(typeof flag);
// Expected output: object
console.log(flag === false);
// Expected output: false

const flag2 = Boolean();
console.log(typeof flag2);
// Expected output: boolean
console.log(flag2 === false);
// Expected output: true
```

## Syntax

```js
new Boolean(value)
Boolean(value)
```

> **Note:**
> `Boolean()` can be called with or without `new`, but with different effects. See Return value.

### Parameters

- `value`
    The initial value of the `Boolean` object.

### Return value

When `Boolean()` is called as a function (without `new`), it returns `value` coerced to a boolean primitive.

When `Boolean()` is called as a constructor (with `new`), it coerces `value` to a boolean primitive and returns a wrapping `Boolean` object, which is **not** a primitive.

> **Warning:**
> You should rarely find yourself using `Boolean` as a constructor.

## Description

The value passed as the first parameter is converted to a boolean value. If the value is omitted or is `0`, `-0`, `0n`, `null`, `false`, `NaN`, `undefined`, or the empty string (`""`), then the object has an initial value of `false`. All other values, including any object, an empty array (`[]`), or the string `"false"`, create an object with an initial value of `true`.

> **Note:**
> When the non-standard property `document.all` is used as an argument for this constructor, the result is a `Boolean` object with the value `false`. This property is legacy and non-standard and should not be used.

## Examples

### Creating Boolean objects with an initial value of false

```js
const bZero = new Boolean(0);
const bNull = new Boolean(null);
const bEmptyString = new Boolean("");
const bfalse = new Boolean(false);

typeof bfalse; // "object"
Boolean(bfalse); // true
```

Note how converting a `Boolean` object to a primitive with `Boolean()` always yields `true`, even if the object holds a value of `false`. You are therefore always advised to avoid constructing `Boolean` wrapper objects.

If you need to take the primitive value out from the wrapper object, instead of using the `Boolean()` function, use the object's `valueOf()` method instead.

```js
const bfalse = new Boolean(false);

bfalse.valueOf(); // false
```

### Creating `Boolean` objects with an initial value of `true`

```js
const btrue = new Boolean(true);
const btrueString = new Boolean("true");
const bfalseString = new Boolean("false");
const bSuLin = new Boolean("Su Lin");
const bArrayProto = new Boolean([]);
const bObjProto = new Boolean({});
```

## See also

- Boolean
