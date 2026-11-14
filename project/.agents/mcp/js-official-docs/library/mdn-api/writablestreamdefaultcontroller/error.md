---
title: "WritableStreamDefaultController: error() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/writablestreamdefaultcontroller/error/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WritableStreamDefaultController: error() method

The **`error()`** method of the
`WritableStreamDefaultController` interface causes any future interactions
with the associated stream to error.

This method is rarely used, since usually it suffices to return a rejected promise from
one of the underlying sink's methods. However, it can be useful for suddenly shutting
down a stream in response to an event outside the normal lifecycle of interactions with
the underlying sink.

## Syntax

```js
error(message)
```

### Parameters

- `message`
    A string representing the error you want future interactions to
    fail with.

### Return value

None (`undefined`).

### Exceptions

- `TypeError`
    The stream you are trying to error is not a `WritableStream`.

## Examples

```js
const writableStream = new WritableStream({
  start(controller) {
    // do stuff with controller

    // error stream if necessary
    controller.error("My error is broken");
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
