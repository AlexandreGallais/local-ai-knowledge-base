---
title: "AbortSignal: abort() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/abortsignal/abort_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AbortSignal: abort() static method

The **`AbortSignal.abort()`** static method returns an `AbortSignal` that is already set as aborted (and which does not trigger an `abort` event).

This is shorthand for the following code:

```js
const controller = new AbortController();
controller.abort();
return controller.signal;
```

This could, for example, be passed to a fetch method in order to run its abort logic (i.e., it may be that code is organized such that the abort logic should be run even if the intended fetch operation has not been started).

> **Note:**
> The method is similar in purpose to `Promise.reject`.

## Syntax

```js
AbortSignal.abort()
AbortSignal.abort(reason)
```

### Parameters

- `reason`
    The reason why the operation was aborted, which can be any JavaScript value.
    If not specified, the reason is set to "AbortError" `DOMException`.

### Return value

An `AbortSignal` instance with the `AbortSignal.aborted` property set to `true`, and `AbortSignal.reason` set to the specified or default reason value.
