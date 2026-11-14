---
title: "Reflect.apply()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/reflect/apply/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Reflect.apply()

The **`Reflect.apply()`** static method calls a target function with arguments as specified.

```js
console.log(Reflect.apply(Math.floor, undefined, [1.75]));
// Expected output: 1

console.log(
  Reflect.apply(String.fromCharCode, undefined, [104, 101, 108, 108, 111]),
);
// Expected output: "hello"

console.log(
  Reflect.apply(RegExp.prototype.exec, /ab/, ["confabulation"]).index,
);
// Expected output: 4

console.log(Reflect.apply("".charAt, "ponies", [3]));
// Expected output: "i"
```

## Syntax

```js
Reflect.apply(target, thisArgument, argumentsList)
```

### Parameters

- `target`
    The target function to call.
- `thisArgument`
    The value of `this` provided for the call to `target`.
- `argumentsList`
    An array-like object specifying the arguments with which `target` should be called.

### Return value

The result of calling the given `target` function with the specified `this` value and arguments.

### Exceptions

- `TypeError`
    Thrown if `target` is not a function or `argumentsList` is not an object.

## Description

`Reflect.apply()` provides the reflective semantic of a function call. That is, `Reflect.apply(target, thisArgument, argumentsList)` is semantically equivalent to:

```js
Math.floor.apply(null, [1.75]);
Reflect.apply(Math.floor, null, [1.75]);
```

The only differences are:

- `Reflect.apply()` takes the function to call as the `target` parameter instead of the `this` context.
- `Reflect.apply()` throws if `argumentsList` is omitted instead of defaulting to calling with no parameters.

`Reflect.apply()` invokes the `[[Call]]` object internal method of `target`.

## Examples

### Using Reflect.apply()

```js
Reflect.apply(Math.floor, undefined, [1.75]);
// 1;

Reflect.apply(String.fromCharCode, undefined, [104, 101, 108, 108, 111]);
// "hello"

Reflect.apply(RegExp.prototype.exec, /ab/, ["confabulation"]).index;
// 4

Reflect.apply("".charAt, "ponies", [3]);
// "i"
```

## See also

- Polyfill of `Reflect.apply` in `core-js`
- es-shims polyfill of `Reflect.apply`
- `Reflect`
- `Function.prototype.apply()`
- `handler.apply()`
