---
title: "WorkerGlobalScope: reportError() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workerglobalscope/reporterror/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkerGlobalScope: reportError() method

The **`reportError()`** method of the `WorkerGlobalScope` interface may be used to report errors to the console or event handlers of global scopes, emulating an uncaught JavaScript exception.

This feature is primarily intended for custom event-dispatching or callback-manipulating libraries.
Libraries can use this feature to catch errors in callback code and re-throw them to the top level handler.
This ensures that an exception in one callback will not prevent others from being handled, while at the same time ensuring that stack trace information is still readily available for debugging at the top level.

See `window.reportError()` for more information.

## Syntax

```js
reportError(throwable)
```

### Parameters

- `throwable`
    Any JavaScript value, but preferably an error object such as a `TypeError`.

### Return value

None (`undefined`).

### Exceptions

- `TypeError`
    The method is called without an error argument.

## See also

- `WorkerGlobalScope`
- `Window.reportError()`
- `error` event
- `error` event
- `error` event
