---
title: "console: count() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/console/count_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# console: count() static method

The **`console.count()`** static method logs the number of times that this particular call to `count()` has been called.

## Syntax

```js
console.count()
console.count(label)
```

### Parameters

- `label` (optional)
    A string. If supplied, `count()` outputs the number of times it has been called with that label. If omitted, `count()` behaves as though it was called with the "default" label.

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
greet();
console.count();
```

Console output will look something like this:

```plain
"default: 1"
"default: 2"
"default: 3"
"default: 4"
```

The label is displayed as `default` because no explicit label was supplied.

If we pass the `user` variable as the `label` argument to the first invocation of `console.count()`, and the string "alice" to the second:

```js
function greet(user) {
  console.count(user);
  return `hi ${user}`;
}

greet("bob");
greet("alice");
greet("alice");
console.count("alice");
```

We will see output like this:

```plain
"bob: 1"
"alice: 1"
"alice: 2"
"alice: 3"
```

We're now maintaining separate counts based only on the value of `label`.

## See also

- Microsoft Edge's documentation for `console.count()`
- Node.js documentation for `console.count()`
- Google Chrome's documentation for `console.count()`
