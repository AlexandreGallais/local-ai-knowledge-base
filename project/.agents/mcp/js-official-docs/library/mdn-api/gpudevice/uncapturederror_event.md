---
title: "GPUDevice: uncapturederror event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpudevice/uncapturederror_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUDevice: uncapturederror event

The **`uncapturederror`** event of the `GPUDevice` interface is fired when an error is thrown that has not been observed by a GPU error scope, to provide a way to report unexpected errors.

Known error cases should be handled using `pushErrorScope()` and `popErrorScope()`.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("uncapturederror", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onuncapturederror = (event) => { }
```

## Event type

A `GPUUncapturedErrorEvent`. Inherits from `Event`.

## Examples

You could use something like the following as a global mechanism to pick up any errors that aren't handled by error scopes and capture them.

```js
device.addEventListener("uncapturederror", (event) => {
  // Re-surface the error.
  console.error("A WebGPU error was not captured:", event.error);

  reportErrorToServer({
    type: event.error.constructor.name,
    message: event.error.message,
  });
});
```

See WebGPU Error Handling best practices for more examples and information.

## See also

- The WebGPU API
