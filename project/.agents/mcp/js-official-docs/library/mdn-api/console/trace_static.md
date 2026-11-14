---
title: "console: trace() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/console/trace_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# console: trace() static method

The **`console.trace()`** static method outputs a stack trace to the console.

> **Note:**
> In some browsers, `console.trace()` may also output the sequence of calls and asynchronous events leading to the current `console.trace()` which are not on the call stack — to help identify the origin of the current event evaluation loop.

See Stack traces in the `console` documentation for details and examples.

## Syntax

```js
console.trace()
console.trace(object1, /* …, */ objectN)
```

### Parameters

- `objects` (optional)
    Zero or more objects to be output to console along with the trace. These are assembled and formatted the same way they would be if passed to the `console.log()` method.

### Return value

None (`undefined`).

## Examples

```js
function foo() {
  function bar() {
    console.trace();
  }
  bar();
}

foo();
```

In the console, the following trace will be displayed:

```plain
bar
foo
<anonymous>
```

## See also

- Microsoft Edge's documentation for `console.trace()`
- Node.js documentation for `console.trace()`
- Google Chrome's documentation for `console.trace()`
