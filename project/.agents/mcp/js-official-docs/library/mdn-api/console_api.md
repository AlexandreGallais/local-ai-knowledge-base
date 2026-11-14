---
title: "Console API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/console_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Console API

The Console API provides functionality to allow developers to perform debugging tasks, such as logging messages or the values of variables at set points in your code, or timing how long an operation takes to complete.

## Concepts and usage

The Console API started as a largely proprietary API, with different browsers implementing it, albeit in inconsistent ways. The Console API spec was created to define consistent behavior, and all modern browsers eventually settled on implementing this behavior — although some implementations still have their own additional proprietary functions. Find out about these at:

- Google Chrome DevTools implementation
- Safari DevTools implementation

Usage is very simple — the `console` object contains many methods that you can call to perform rudimentary debugging tasks, generally focused around logging various values to the browser's Web Console.

By far the most commonly-used method is `console.log()`, which is used to log the current value contained inside a specific variable.

## Interfaces

- `console`
    Provides rudimentary debugging functionality, including logging, stack traces, timers, and counters.

## Examples

```js
let myString = "Hello world";

// Output "Hello world" to the console
console.log(myString);
```

See the console reference page for more examples.

## See also

- Tools
- Web Console — how the Web Console in Firefox handles console API calls
- about:debugging — how to see console output when the debugging target is a mobile device
