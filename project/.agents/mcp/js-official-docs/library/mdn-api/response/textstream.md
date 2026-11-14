---
title: "Response: textStream() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/response/textstream/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Response: textStream() method

The **`textStream()`** method of the `Response` interface returns a `ReadableStream` that can be used to read the contents of the response body in chunks of UTF-8.

This provides an easier mechanism for streaming the response body than piping the `Response.body` byte stream through a `TextDecoderStream`.

> **Note:**
> If invoked on a `Response` with a null body, for example a `` response, `textStream()` will return a valid empty stream.

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
    Thrown if the response body is disturbed or locked.

## Examples

### Reading response body content as a text stream

This example shows how to read a response body as a text stream.

We `fetch()` a URL to get a `Response`, obtain a `ReadableStream` of its body using `textStream()`, then read the text via a reader created using `ReadableStream.getReader()`.

```js
const pElem = document.querySelector("p");

async function streamResponseText(url) {
  const response = await fetch(url);
  const textStream = response.textStream();
  // instead of
  // const textStream = response.body.pipeThrough(new TextDecoderStream());

  const reader = textStream.getReader();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    pElem.textContent += value;
  }
}

streamResponseText("https://www.example.com");
```

## See also

- `ReadableStream`
- `ReadableStream.getReader()`
- `Request.body`
- `Request.textStream()`
