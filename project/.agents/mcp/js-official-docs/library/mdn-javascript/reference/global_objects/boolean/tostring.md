---
title: "Boolean.prototype.toString()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/boolean/tostring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Boolean.prototype.toString()

The **`toString()`** method of `Boolean` values returns a string representing the specified boolean value.

```js
const flag1 = new Boolean(true);

console.log(flag1.toString());
// Expected output: "true"

const flag2 = new Boolean(1);

console.log(flag2.toString());
// Expected output: "true"
```

## Syntax

```js
toString()
```

### Parameters

None.

### Return value

A string representing the specified boolean value.

## Description

The `Boolean` object overrides the `toString` method of `Object`; it does not inherit
`Object.prototype.toString()`. For `Boolean` values, the `toString` method returns a string representation of the boolean value, which is either `"true"` or `"false"`.

The `toString()` method requires its `this` value to be a `Boolean` primitive or wrapper object. It throws a `TypeError` for other `this` values without attempting to coerce them to boolean values.

Because `Boolean` doesn't have a `[Symbol.toPrimitive]()` method, JavaScript calls the `toString()` method automatically when a `Boolean` _object_ is used in a context expecting a string, such as in a template literal. However, boolean _primitive_ values do not consult the `toString()` method to be coerced to strings — rather, they are directly converted using the same algorithm as the initial `toString()` implementation.

```js
Boolean.prototype.toString = () => "Overridden";
console.log(`${true}`); // "true"
console.log(`${new Boolean(true)}`); // "Overridden"
```

## Examples

### Using toString()

```js
const flag = new Boolean(true);
console.log(flag.toString()); // "true"
console.log(false.toString()); // "false"
```

## See also

- `Object.prototype.toString()`
