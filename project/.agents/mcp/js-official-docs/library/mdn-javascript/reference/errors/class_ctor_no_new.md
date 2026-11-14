---
title: "TypeError: class constructors must be invoked with 'new'"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/class_ctor_no_new/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypeError: class constructors must be invoked with 'new'

The JavaScript exception "class constructors must be invoked with 'new'" occurs when a class constructor is called without the `new` keyword. All class constructors must be called with `new`.

## Message

```plain
TypeError: Class constructor X cannot be invoked without 'new' (V8-based)
TypeError: Class constructors cannot be invoked without 'new' (V8-based)
TypeError: class constructors must be invoked with 'new' (Firefox)
TypeError: Cannot call a class constructor without |new| (Safari)
```

## Error type

`TypeError`

## What went wrong?

In JavaScript, _calling_ a function without `new` and _constructing_ a function with `new` are two distinct operations, and functions can behave differently depending on how they are called.

Traditionally, JavaScript functions have been used as both constructors and normal functions, and can detect how they were called using `new.target`. However, class constructors are always constructors and cannot be called as normal functions.

## Examples

### Invalid cases

```js
class X {}

X(); // TypeError: class constructors must be invoked with 'new'
```

### Valid cases

```js
class X {}

new X();
```

## See also

- Classes
- `new`
