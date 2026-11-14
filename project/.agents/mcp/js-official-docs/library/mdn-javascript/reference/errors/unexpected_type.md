---
title: "TypeError: \"x\" is (not) \"y\""
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/unexpected_type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypeError: "x" is (not) "y"

The JavaScript exception "_x_ is (not) _y_" occurs when there was an
unexpected type. Oftentimes, unexpected `undefined` or `null`
values.

## Message

```plain
TypeError: Cannot read properties of undefined (reading 'x') (V8-based)
TypeError: "x" is undefined (Firefox)
TypeError: "undefined" is not an object (Firefox)
TypeError: undefined is not an object (evaluating 'obj.x') (Safari)

TypeError: "x" is not a symbol (V8-based & Firefox)
TypeError: Symbol.keyFor requires that the first argument be a symbol (Safari)
```

## Error type

`TypeError`.

## What went wrong?

There was an unexpected type. This occurs oftentimes with `undefined` or
`null` values.

Also, certain methods, such as `Object.create()` or
`Symbol.keyFor()`, require a specific type, that must be provided.

## Examples

### Invalid cases

You cannot invoke a method on an `undefined` or `null` variable.

```js
const foo = undefined;
foo.substring(1); // TypeError: foo is undefined

const foo2 = null;
foo2.substring(1); // TypeError: foo2 is null
```

Certain methods might require a specific type.

```js
const foo = {};
Symbol.keyFor(foo); // TypeError: foo is not a symbol

const foo2 = "bar";
Object.create(foo2); // TypeError: "foo2" is not an object or null
```

### Fixing the issue

To fix null pointer to `undefined` or `null` values, you can test if the value is `undefined` or `null` first.

```js
if (foo !== undefined && foo !== null) {
  // Now we know that foo is defined, we are good to go.
}
```

Or, if you are confident that `foo` will not be another falsy value like `""` or `0`, or if filtering those cases out is not an issue, you can simply test for its truthiness.

```js
if (foo) {
  // Now we know that foo is truthy, it will necessarily not be null/undefined.
}
```

## See also

- `undefined`
- `null`
