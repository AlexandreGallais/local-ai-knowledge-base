---
title: "WritableStream: close() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/writablestream/close/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WritableStream: close() method

The **`close()`** method of the `WritableStream` interface closes the associated stream. All chunks written before this method is called are sent before the returned promise is fulfilled.

This is equivalent to getting a `WritableStreamDefaultWriter` with `getWriter()`, calling `close()` on it.

## Syntax

```js
close()
```

### Parameters

None.

### Return value

A `Promise` which fulfills with the `undefined` when all
remaining chunks were successfully written before the close, or rejects with an error if
a problem was encountered during the process.

### Exceptions

- `TypeError`
    The stream you are trying to close is locked.

## Examples

The following example illustrates several features of the `WritableStream`. It shows the
creation of the `WritableStream` with a custom sink and an API-supplied
queuing strategy. It then calls a function called `sendMessage()`, passing
the newly created stream and a string. Inside this function it calls the stream's
`getWriter()` method, which returns an instance of
`WritableStreamDefaultWriter`. A `forEach()` call is used to
write each chunk of the string to the stream. Finally, `write()` and
`close()` return promises that are processed to deal with success or failure
of chunks and streams. Note that in order to be able to call `close()` on the stream itself,
the writer must be disconnected using `defaultWriter.releaseLock();`.

```html
<ul id="log"></ul>
```

```js
const list = document.getElementById("log");
function log(message) {
  const listItem = document.createElement("li");
  listItem.textContent = message;
  list.appendChild(listItem);
}
```

```js
function sendMessage(message, writableStream) {
  // defaultWriter is of type WritableStreamDefaultWriter
  const defaultWriter = writableStream.getWriter();
  const encoder = new TextEncoder();
  const encoded = encoder.encode(message);
  encoded.forEach((chunk) => {
    defaultWriter.ready
      .then(() => {
        defaultWriter.write(chunk);
      })
      .catch((err) => {
        log("Chunk error:", err);
      });
  });

  // Call ready again to ensure that all chunks are written
  //   before closing the writer.
  defaultWriter.ready
    .then(() => {
      defaultWriter.releaseLock();
      writableStream.close();
    })
    .then(() => {
      log("All chunks written / stream closed.");
    })
    .catch((err) => {
      log("Stream error:", err);
    });
}

const decoder = new TextDecoder("utf-8");
const queuingStrategy = new CountQueuingStrategy({ highWaterMark: 1 });
let result = "";
const writableStream = new WritableStream(
  {
    // Implement the sink
    write(chunk) {
      return new Promise((resolve, reject) => {
        const buffer = new ArrayBuffer(1);
        const view = new Uint8Array(buffer);
        view[0] = chunk;
        const decoded = decoder.decode(view, { stream: true });
        const listItem = document.createElement("li");
        result += decoded;
        resolve();
      });
    },
    close() {
      const listItem = document.createElement("li");
      log(`[MESSAGE RECEIVED] ${result}`);
    },
    abort(err) {
      log("Sink error:", err);
    },
  },
  queuingStrategy,
);

log("Sending 'Hello, world.' message.");
sendMessage("Hello, world.", writableStream);
```
