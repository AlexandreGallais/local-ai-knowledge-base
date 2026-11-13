---
title: "console: timeLog() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/console/timelog_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# console: timeLog() static method

The **`console.timeLog()`** static method logs the current value of a timer that was previously started by calling `console.time()`.

## Syntax

```js
console.timeLog()
console.timeLog(label)
console.timeLog(label, val1)
console.timeLog(label, val1, /* …, */ valN)
```

### Parameters

- `label` (optional)
    The name of the timer to log to the console. If this is omitted the label "default" is used.
- `valN` (optional)
    Additional values to be logged to the console after the timer output.

### Return value

None (`undefined`).

## Description

The `console.timeLog()` method logs the current value of a timer.

The method can be passed the name of a timer. This will attempt to log the value of a timer created with that name in a previous call to `console.time()`:

```js
console.time("reticulating splines");
reticulateSplines();
console.timeLog("reticulating splines");
// reticulating splines: 650ms
```

If the timer name is omitted, then the timer is named `"default"`:

```js
console.time();
reticulateSplines();
console.timeLog();
// default: 780ms
```

```js
console.time("default");
reticulateSplines();
console.timeLog();
// default: 780ms
```

If there is no corresponding timer, `console.timeLog()` logs a warning like:

```plain
Timer "timer name" doesn't exist.
```

You can log additional values to the console after the timer output:

```js
console.time();
reticulateSplines();
console.timeLog("default", "Hello", "world");
// default: 780ms Hello world
```

See Timers in the documentation for more details and examples.

## Examples

```js
console.time("answer time");
alert("Click to continue");
console.timeLog("answer time");
alert("Do a bunch of other stuff…");
console.timeEnd("answer time");
```

The output from the example above shows the time taken by the user to dismiss the first alert box, followed by the cumulative time it took for the user to dismiss both alerts:

```plain
answer time: 2542ms debugger eval code:3:9
answer time: 4161ms - timer ended
```

Notice that the timer's name is displayed when the timer value is logged using `console.timeLog()` and again when it's stopped. In addition, the call to `console.timeEnd()` has the additional information, "timer ended" to make it obvious that the timer is no longer tracking time.

## See also

- `console.time()`
- See `console.timeEnd()` for additional examples
- Node.js documentation for `console.timeLog()`
