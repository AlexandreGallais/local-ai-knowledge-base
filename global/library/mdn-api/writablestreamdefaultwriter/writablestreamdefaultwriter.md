---
title: "WritableStreamDefaultWriter: WritableStreamDefaultWriter() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/writablestreamdefaultwriter/writablestreamdefaultwriter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WritableStreamDefaultWriter: WritableStreamDefaultWriter() constructor

The **`WritableStreamDefaultWriter()`**
constructor creates a new `WritableStreamDefaultWriter` object instance.

> **Note:**
> You generally wouldn't use this constructor manually; instead,
> you'd use the `WritableStream.getWriter()` method.

## Syntax

```js
new WritableStreamDefaultWriter(stream)
```

### Parameters

- `stream`
    The `WritableStream` to be written to.

### Return value

An instance of the `WritableStreamDefaultWriter` object.

### Exceptions

- `TypeError`
    The provided `stream` value is not a `WritableStream`, or it
    is locked to another writer already.

## Examples

The following example shows the creation of a `WritableStream` with a custom
sink and an API-supplied queuing strategy. It then calls a function called
`sendMessage()`, passing the newly created stream and a string. Inside this
function it calls the stream's `getWriter()` method, which returns an
instance of `WritableStreamDefaultWriter`. A `forEach()` call is
used to write each chunk of the string to the stream. Finally, `write()` and
`close()` return promises that are processed to deal with success or failure
of chunks and streams.

```js
const list = document.querySelector("ul");

function sendMessage(message, writableStream) {
  // defaultWriter is of type WritableStreamDefaultWriter
  const defaultWriter = writableStream.getWriter();
  const encoder = new TextEncoder();
  const encoded = encoder.encode(message);
  encoded.forEach((chunk) => {
    defaultWriter.ready
      .then(() => defaultWriter.write(chunk))
      .then(() => {
        console.log("Chunk written to sink.");
      })
      .catch((err) => {
        console.log("Chunk error:", err);
      });
  });
  // Call ready again to ensure that all chunks are written
  //   before closing the writer.
  defaultWriter.ready
    .then(() => {
      defaultWriter.close();
    })
    .then(() => {
      console.log("All chunks written");
    })
    .catch((err) => {
      console.log("Stream error:", err);
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
        listItem.textContent = `Chunk decoded: ${decoded}`;
        list.appendChild(listItem);
        result += decoded;
        resolve();
      });
    },
    close() {
      const listItem = document.createElement("li");
      listItem.textContent = `[MESSAGE RECEIVED] ${result}`;
      list.appendChild(listItem);
    },
    abort(err) {
      console.log("Sink error:", err);
    },
  },
  queuingStrategy,
);

sendMessage("Hello, world.", writableStream);
```

You can find the full code in our Simple writer example.
