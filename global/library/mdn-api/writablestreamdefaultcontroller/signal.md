---
title: "WritableStreamDefaultController: signal property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/writablestreamdefaultcontroller/signal/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WritableStreamDefaultController: signal property

The read-only **`signal`** property of the `WritableStreamDefaultController` interface returns the `AbortSignal` associated with the controller.

## Value

An `AbortSignal` object.

## Examples

### Aborting a long write operation

In this example, we simulate a slow operation using a local sink: We do nothing when some data is written but to wait for a second. This gives us enough time to call the `writer.abort()` method and to immediately reject the promise.

```js
const writingStream = new WritableStream({
  // Define the slow local sink to simulate a long operation
  write(chunk, controller) {
    return new Promise((resolve, reject) => {
      controller.signal.addEventListener("abort", () =>
        reject(controller.signal.reason),
      );

      // Do nothing but wait with the data: it is a local sink
      setTimeout(resolve, 1000); // Timeout to simulate a slow operation
    });
  },
});

// Perform the write
const writer = writingStream.getWriter();
writer.write("Lorem ipsum test data");

// Abort the write manually
await writer.abort("Manual abort!");
```

### Transferring the `AbortSignal` to the underlying layer

In this example, we use the Fetch API to actually send the message to a server. The Fetch API also support `AbortSignal`: It is possible to use the same object for both the `fetch` method and the `WritableStreamDefaultController`.

```js
const endpoint = "https://www.example.com/api"; // Fake URL for example purpose
const writingStream = new WritableStream({
  async write(chunk, controller) {
    // Write to the server using the Fetch API
    const response = await fetch(endpoint, {
      signal: controller.signal, // We use the same object for both fetch and controller
      method: "POST",
      body: chunk,
    });
    await response.text();
  },
});

// Perform the write
const writer = writingStream.getWriter();
writer.write("Lorem ipsum test data");

// Abort the write manually
await writer.abort("Manual abort!");
```
