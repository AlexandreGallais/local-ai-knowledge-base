---
title: "WorkerGlobalScope: dump() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workerglobalscope/dump/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkerGlobalScope: dump() method

The **`WorkerGlobalScope.dump()`** method logs messages to the browser's standard output (`stdout`). If the browser was started from a terminal, output sent to `dump()` will appear in the terminal. This is the same as `Window.dump()`, but for workers.

Output from `dump()` is _not_ sent to the browser's developer tools console. To log to the developer tools console, use `console.log()`.

## Syntax

```js
dump(message)
```

### Parameters

- `message`
    A string containing the message to log.

### Return value

None (`undefined`).

## Specifications

This feature is not part of any specification.
