---
title: "RegExp.prototype.compile()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/regexp/compile/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RegExp.prototype.compile()

> **Note:**
> The `compile()` method is only specified for compatibility reasons. Using `compile()` causes the otherwise immutable regex source and flags to become mutable, which may break user expectations. You can use the `RegExp()` constructor to construct a new regular expression object instead.

The **`compile()`** method of `RegExp` instances is used to recompile a regular expression with new source and flags after the `RegExp` object has already been created.

## Syntax

```js
compile(pattern, flags)
```

### Parameters

- `pattern`
    The text of the regular expression.
- `flags`
    Any combination of flag values.

### Return value

None (`undefined`).

### Exceptions

- `TypeError`
    Thrown if the `this` value is not an instance of the current realm's `RegExp` constructor.
    This includes a subclass of `RegExp` and the `RegExp` constructor from a different realm.

## Examples

### Using compile()

The following example shows how to recompile a regular expression with a new pattern and a new flag.

```js
const regexObj = /foo/gi;
regexObj.compile("new foo", "g");
```

## See also

- `RegExp`
