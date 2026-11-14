---
title: "ReadableStreamDefaultReader: closed property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/readablestreamdefaultreader/closed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ReadableStreamDefaultReader: closed property

The **`closed`** read-only property of the
`ReadableStreamDefaultReader` interface returns a
`Promise` that fulfills when the stream closes, or rejects if the
stream throws an error or the reader's lock is released. This property enables you
to write code that responds to an end to the streaming process.

## Value

A `Promise`.

## Examples

In this snippet, a previously-created reader is queried to see if the stream has been
closed. When it is closed, the promise fulfills and the message is logged to the
console.

```js
reader.closed.then(() => {
  console.log("reader closed");
});
```

## See also

- `ReadableStreamDefaultReader()` constructor
- Using readable streams
