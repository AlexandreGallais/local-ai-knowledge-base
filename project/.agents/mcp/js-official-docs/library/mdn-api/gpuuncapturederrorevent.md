---
title: "GPUUncapturedErrorEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpuuncapturederrorevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUUncapturedErrorEvent

The **`GPUUncapturedErrorEvent`** interface of the `WebGPU API` is the event object type for the `GPUDevice` `uncapturederror` event, used for telemetry and to report unexpected errors.

Known error cases should be handled using `pushErrorScope()` and `popErrorScope()`.

## Constructor

- `GPUUncapturedErrorEvent()`
    Creates a new `GPUUncapturedErrorEvent` object instance.

## Instance properties

_Inherits properties from its parent, `Event`._

- `error` (read-only)
    A `GPUError` object instance providing access to the details of the error.

## Examples

You could use something like the following as a global mechanism to pick up any errors that aren't handled by error scopes and capture them.

```js
// …

device.addEventListener("uncapturederror", (event) => {
  // Re-surface the error
  console.error("A WebGPU error was not captured:", event.error.message);
  reportErrorToServer({
    type: event.error.constructor.name,
    message: event.error.message,
  });
});

// …
```

## See also

- The WebGPU API
- WebGPU Error Handling best practices
