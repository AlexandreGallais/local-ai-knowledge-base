---
title: "String() constructor"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/string/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String() constructor

The **`String()`** constructor creates `String` objects. When called as a function, it returns primitive values of type String.

## Syntax

```js
new String(thing)
String(thing)
```

> **Note:**
> `String()` can be called with or without `new`, but with different effects. See Return value.

### Parameters

- `thing`
    Anything to be converted to a string.

### Return value

When `String()` is called as a function (without `new`), it returns `value` coerced to a string primitive. Specially, Symbol values are converted to `"Symbol(description)"`, where `description` is the description of the Symbol, instead of throwing.

When `String()` is called as a constructor (with `new`), it coerces `value` to a string primitive (without special symbol handling) and returns a wrapping `String` object, which is **not** a primitive.

> **Warning:**
> You should rarely find yourself using `String` as a constructor.

## Examples

### String constructor and String function

String function and String constructor produce different results:

```js
const a = new String("Hello world"); // a === "Hello world" is false
const b = String("Hello world"); // b === "Hello world" is true
a instanceof String; // is true
b instanceof String; // is false
typeof a; // "object"
typeof b; // "string"
```

Here, the function produces a string (the primitive type) as promised.
However, the constructor produces an instance of the type String (an object wrapper) and
that's why you rarely want to use the String constructor at all.

### Using String() to stringify a symbol

`String()` is the only case where a symbol can be converted to a string without throwing, because it's very explicit.

```js
const sym = Symbol("example");
`${sym}`; // TypeError: Cannot convert a Symbol value to a string
"" + sym; // TypeError: Cannot convert a Symbol value to a string
"".concat(sym); // TypeError: Cannot convert a Symbol value to a string
```

```js
const sym = Symbol("example");
String(sym); // "Symbol(example)"
```

## See also

- Numbers and strings guide
