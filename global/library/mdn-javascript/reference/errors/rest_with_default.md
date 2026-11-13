---
title: "SyntaxError: rest parameter may not have a default"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/rest_with_default/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: rest parameter may not have a default

The JavaScript exception "rest parameter may not have a default" occurs when a rest parameter has a default value. Because the rest parameter always creates an array, the default value would never apply.

## Message

```plain
SyntaxError: Rest parameter may not have a default initializer (V8-based)
SyntaxError: rest parameter may not have a default (Firefox)
SyntaxError: Unexpected token '<example-value>'. Expected a '<example-value>' or a '<example-value>' after a parameter declaration. (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

A default parameter gives a parameter a default value if the argument is not passed or passed as `undefined`. A rest parameter collects all the remaining arguments passed to the function and always creates an array. Therefore, it doesn't make sense to have a default value for a rest parameter.

## Examples

### Invalid cases

```js
function doSomething(...args = []) {}
```

### Valid cases

```js
function doSomething(...args) {
  // args is always an array
}
```

## See also

- Functions
- Default parameters
- Rest parameters
