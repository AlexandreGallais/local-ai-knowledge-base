---
title: "String.prototype.toString()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/tostring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String.prototype.toString()

The **`toString()`** method of `String` values returns this string value.

```js
const stringObj = new String("foo");

console.log(stringObj);
// Expected output: String { "foo" }

console.log(stringObj.toString());
// Expected output: "foo"
```

## Syntax

```js
toString()
```

### Parameters

None.

### Return value

A string representing the specified string value.

## Description

The `String` object overrides the `toString` method of `Object`; it does not inherit
`Object.prototype.toString()`. For `String` values, the `toString` method returns the string itself (if it's a primitive) or the string that the `String` object wraps. It has the exact same implementation as `String.prototype.valueOf()`.

The `toString()` method requires its `this` value to be a `String` primitive or wrapper object. It throws a `TypeError` for other `this` values without attempting to coerce them to string values.

Because `String` doesn't have a `[Symbol.toPrimitive]()` method, JavaScript calls the `toString()` method automatically when a `String` _object_ is used in a context expecting a string, such as in a template literal. However, string _primitive_ values do not consult the `toString()` method to be coerced to strings — since they are already strings, no conversion is performed.

```js
String.prototype.toString = () => "Overridden";
console.log(`${"foo"}`); // "foo"
console.log(`${new String("foo")}`); // "Overridden"
```

## Examples

### Using toString()

The following example displays the string value of a `String` object:

```js
const x = new String("Hello world");

console.log(x.toString()); // "Hello world"
```

## See also

- `String.prototype.valueOf()`
