---
title: "Request: signal property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/request/signal/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Request: signal property

The read-only **`signal`** property of the `Request` interface returns the `AbortSignal` associated with the request.

## Value

An `AbortSignal` object.

## Examples

```js
// Create a new abort controller
const controller = new AbortController();

// Create a request with this controller's AbortSignal object
const req = new Request("/", { signal: controller.signal });

// Add an event handler logging a message in case of abort
req.signal.addEventListener("abort", () => {
  console.log("abort");
});

// In case of abort, log the AbortSignal reason, if any
fetch(req).catch(() => {
  if (req.signal.aborted) {
    if (req.signal.reason) {
      console.log(`Request aborted with reason: ${req.signal.reason}`);
    } else {
      console.log("Request aborted but no reason was given.");
    }
  } else {
    console.log("Request not aborted, but terminated abnormally.");
  }
});

// Actually abort the request
controller.abort();
```
