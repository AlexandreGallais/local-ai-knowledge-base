---
title: "TextEncoderStream: TextEncoderStream() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/textencoderstream/textencoderstream/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextEncoderStream: TextEncoderStream() constructor

The **`TextEncoderStream()`** constructor creates a new `TextEncoderStream` object which is used to convert a stream of strings into bytes using UTF-8 encoding.

## Syntax

```js
new TextEncoderStream()
```

### Parameters

None.

## Examples

In this example a `TextEncoderStream` is created and used to upload a stream of text.

```js
const body = textStream.pipeThrough(new TextEncoderStream());
fetch("/dest", {
  method: "POST",
  body,
  headers: { "Content-Type": "text/plain; charset=UTF-8" },
});
```
