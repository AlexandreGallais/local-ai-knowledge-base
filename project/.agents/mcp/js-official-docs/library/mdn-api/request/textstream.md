---
title: "Request: textStream() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/request/textstream/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Request: textStream() method

The **`textStream()`** method of the `Request` interface returns a `ReadableStream` that can be used to read the contents of the request body in chunks of UTF-8.

This provides an easier mechanism for streaming the request body than piping the `Request.body` byte stream through a `TextDecoderStream`.

> **Note:**
> If invoked on a `Request` with a null body, for example a `GET` request, `textStream()` will return a valid empty stream.

## Syntax

```js
textStream()
```

### Parameters

None.

### Return value

A `ReadableStream`.

### Exceptions

- `TypeError`
    Thrown if the request body is disturbed or locked.

## Examples

### Reading request body content as a text stream

This example shows how to read a request body as a text stream.

We create a sample `Request`, obtain a `ReadableStream` of its body using `textStream()`, then read the text via a reader created using `ReadableStream.getReader()`.

```js
const pElem = document.querySelector("p");

const req = new Request("https://example.com", {
  method: "POST",
  body: '{"hello": "world"}',
});

async function streamRequestText(request) {
  const textStream = request.textStream();
  // instead of
  // const textStream = request.body.pipeThrough(new TextDecoderStream());

  const reader = textStream.getReader();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    pElem.textContent += value;
  }
}

streamRequestText(req);
```

## See also

- `ReadableStream`
- `ReadableStream.getReader()`
- `Response.body`
- `Response.textStream()`
