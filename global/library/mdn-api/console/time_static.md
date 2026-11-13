---
title: "console: time() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/console/time_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# console: time() static method

The **`console.time()`** static method starts a timer you can use to track how long an operation takes. You give each timer a unique name, and may have up to 10,000 timers running on a given page. When you call `console.timeEnd()` with the same name, the browser will output the time, in milliseconds, that elapsed since the timer was started.

See Timers in the `console` documentation for details and examples.

## Syntax

```js
console.time()
console.time(label)
```

### Parameters

- `label` (optional)
    A string representing the name to give the new timer. This will identify the timer; use the same name when calling `console.timeEnd()` to stop the timer and get the time output to the console. If omitted, the label `"default"` is used.

### Return value

None (`undefined`).

## Description

Developer tools may also include the interval between `console.time()` and `console.timeEnd()` in a performance recording. This profiling behavior is separate from the console output and is not specified by the Console API. For standard timing entries accessible to JavaScript, use `performance.mark()` and `performance.measure()`.

## See also

- See `console.timeLog()` and `console.timeEnd()` for examples
- `console.timeStamp()`
- `performance.mark()`
- `performance.measure()`
- Microsoft Edge's documentation for `console.time()`
- Node.js documentation for `console.time()`
- Google Chrome's documentation for `console.time()`
