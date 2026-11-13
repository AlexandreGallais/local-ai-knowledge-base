---
title: "WorkerGlobalScope: setInterval() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workerglobalscope/setinterval/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkerGlobalScope: setInterval() method

> **Warning:**
> When the `code` parameter is used, this method dynamically executes its value as JavaScript.
> APIs like this are known as injection sinks, and are potentially a vector for cross-site-scripting (XSS) attacks.
>
> You can mitigate this risk by always assigning `TrustedScript` objects instead of strings and enforcing trusted types.
> See Security considerations in `Window.setInterval()` for more information.

The **`setInterval()`** method of the `WorkerGlobalScope` interface repeatedly calls a function or executes a code snippet, with a fixed time delay between each call.

It is commonly used to set a delay for functions that are executed again and again, such as animations.
You can cancel the interval using `clearInterval()`.
See `Window.setInterval()` for more information.

Note that if you wish to have your function called _once_ after the specified delay, use `setTimeout()`.

## Syntax

```js
setInterval(code)
setInterval(code, delay)

setInterval(func)
setInterval(func, delay)
setInterval(func, delay, param1)
setInterval(func, delay, param1, param2)
setInterval(func, delay, param1, param3, /* …, */ paramN)
```

### Parameters

- `func`
    A `Function` to be executed every `delay` milliseconds.
    The first execution happens after `delay` milliseconds.
- `code`
    A `TrustedScript` or a string of arbitrary code that is compiled and executed every `delay` milliseconds.
    This can be used instead of passing a function, but is _strongly discouraged_ for the same reasons that make using `eval()` a security risk.
- `delay` (optional)
    The delay time between executions of the specified function or code, in milliseconds.
    Defaults to 0 if not specified.
    See Delay restrictions in `Window.setInterval` for details on the permitted range of `delay` values.
- `param1`, …, `paramN` (optional)
    Additional arguments which are passed through to the function specified by _func_ once the timer expires.

### Return value

A positive integer (typically within the range of 1 to 2,147,483,647) that uniquely identifies the interval timer created by the call.

This identifier, often referred to as an "interval ID", can be passed to `clearInterval()` to stop the repeated execution of the specified function.

### Exceptions

- `SyntaxError`
    The `code` can't be parsed as a script.
- `TypeError`
    Thrown if the `code` parameter is set to a string when Trusted Types are enforced by CSP and no default policy is defined.
    It is also thrown if the first parameter is not one of the supported types: a function, string or `TrustedScript`.

## Examples

See `setInterval()` for examples.

## See also

- Polyfill of `setInterval` which allows passing arguments to the callback in `core-js`
- `Window.setInterval()`
- `WorkerGlobalScope.clearInterval()`
- `WorkerGlobalScope.setTimeout()`
- `DedicatedWorkerGlobalScope.requestAnimationFrame()`
