---
title: "console: countReset() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/console/countreset_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# console: countReset() static method

The **`console.countReset()`** static method resets counter used with `console.count()`.

## Syntax

```js
console.countReset()
console.countReset(label)
```

### Parameters

- `label` (optional)
    A string. If supplied, `countReset()` resets the count for that label to 0. If omitted, `countReset()` resets the default counter to 0.

### Return value

None (`undefined`).

## Examples

For example, given code like this:

```js
function greet(user) {
  console.count();
  return `hi ${user}`;
}

greet("bob");
greet("alice");
greet("alice");
console.count();
console.countReset();
```

Console output will look something like this:

```plain
"default: 1"
"default: 2"
"default: 3"
"default: 4"
"default: 0"
```

Note that the call to `console.counterReset()` resets the value of the default counter to zero.

If we pass the `user` variable as the `label` argument with the string "bob" to the first invocation of `console.count()`, and the string "alice" to the second:

```js
function greet(user) {
  console.count(user);
  return `hi ${user}`;
}

greet("bob");
greet("alice");
greet("alice");
console.countReset("bob");
console.count("alice");
```

We will see output like this:

```plain
"bob: 1"
"alice: 1"
"alice: 2"
"bob: 0"
"alice: 3"
```

Resetting the value of the counter "bob" only changes the value of that counter. The value of "alice" is unchanged.

## See also

- Microsoft Edge's documentation for `console.countReset()`
- Node.js documentation for `console.countReset()`
- Google Chrome's documentation for `console.countReset()`
