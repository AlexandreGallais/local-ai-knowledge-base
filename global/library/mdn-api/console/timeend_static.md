---
title: "console: timeEnd() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/console/timeend_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# console: timeEnd() static method

The **`console.timeEnd()`** static method stops a timer that was previously started by calling `console.time()`.

See Timers in the documentation for details and examples.

## Syntax

```js
console.timeEnd()
console.timeEnd(label)
```

### Parameters

- `label` (optional)
    A string representing the name of the timer to stop. Once stopped, the elapsed time is automatically displayed in the console along with an indicator that the time has ended. If omitted, the label "default" is used.

### Return value

None (`undefined`).

## Description

Developer tools may also include the interval between `console.time()` and `console.timeEnd()` in a performance recording. This profiling behavior is separate from the console output and is not specified by the Console API. For standard timing entries accessible to JavaScript, use `performance.mark()` and `performance.measure()`.

## Examples

```js
console.time("answer time");
alert("Click to continue");
console.timeLog("answer time");
alert("Do a bunch of other stuff…");
console.timeEnd("answer time");
```

The output from the example above shows the time taken by the user to dismiss the first alert box, followed by the cumulative time it took for the user to dismiss both alerts:

Notice that the timer's name is displayed when the timer value is logged using `console.timeLog()` and again when it's stopped. In addition, the call to `console.timeEnd()` has the additional information, "timer ended" to make it obvious that the timer is no
longer tracking time.

## See also

- See `console.timeLog()` for additional examples
- `console.time()`
- `console.timeStamp()`
- `performance.mark()`
- `performance.measure()`
- Microsoft Edge's documentation for `console.timeEnd()`
- Node.js documentation for `console.timeEnd()`
- Google Chrome's documentation for `console.timeEnd()`
