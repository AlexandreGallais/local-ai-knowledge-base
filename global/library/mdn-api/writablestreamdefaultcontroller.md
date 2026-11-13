---
title: "WritableStreamDefaultController"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/writablestreamdefaultcontroller/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WritableStreamDefaultController

The **`WritableStreamDefaultController`** interface of the Streams API represents a controller allowing control of a `WritableStream`'s state. When constructing a `WritableStream`, the underlying sink is given a corresponding `WritableStreamDefaultController` instance to manipulate.

## Constructor

None. `WritableStreamDefaultController` instances are created automatically during `WritableStream` construction.

## Instance properties

- `WritableStreamDefaultController.signal` (read-only)
    Returns the `AbortSignal` associated with the controller.

## Instance methods

- `WritableStreamDefaultController.error()`
    Causes any future interactions with the associated stream to error.

## Examples

```js
const writableStream = new WritableStream({
  start(controller) {
    // do stuff with controller

    // error stream if necessary
    controller.error("My stream is broken");
  },
  write(chunk, controller) {
    // …
  },
  close() {
    // …
  },
  abort(err) {
    // …
  },
});
```
