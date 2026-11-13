---
title: "TypeError: calling a builtin X constructor without new is forbidden"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/builtin_ctor_no_new/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypeError: calling a builtin X constructor without new is forbidden

The JavaScript exception "calling a builtin X constructor without new is forbidden" occurs when you try to call a builtin constructor without using the `new` keyword. All modern constructors, such as `Promise` and `Map`, must be called with `new`.

## Message

```plain
TypeError: Constructor X requires 'new' (V8-based)
TypeError: Promise constructor cannot be invoked without 'new' (V8-based)
TypeError: calling a builtin X constructor without new is forbidden (Firefox)
TypeError: calling X constructor without new is invalid (Safari)
```

## Error type

`TypeError`

## What went wrong?

In JavaScript, _calling_ a function without `new` and _constructing_ a function with `new` are two distinct operations, and functions can behave differently depending on how they are called.

Apart from the following legacy constructors, all modern constructors must be called with `new`:

- `Object()`
- `Function()` (and its subclasses)
- `Error()` (and its subclasses)
- `RegExp()`
- `Array()`

Some other constructors, such as `Date()`, and primitive wrappers, such as `String()`, `Number()`, and `Boolean()`, can also be called with or without `new`, but the return types differ in the two cases.

On every constructor page, you can find information about whether the constructor must be called with `new`.

## Examples

### Invalid cases

```js
const m = Map(); // TypeError: calling a builtin Map constructor without new is forbidden
```

### Valid cases

```js
const m = new Map();
```

## See also

- `new`
