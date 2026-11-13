---
title: "Blob: textStream() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/blob/textstream/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Blob: textStream() method

The **`textStream()`** method of the `Blob` interface returns a `ReadableStream` that can be used to read the contents of the `Blob` in chunks of UTF-8.

This provides an easier mechanism for streaming the content than piping a `Blob.stream()` byte stream through a `TextDecoderStream`.

> **Note:**
> The `textStream()` method differs from `FileReader.readAsText()` in that it always uses UTF-8 encoding, whereas `readAsText()` has a parameter that sets the encoding.

## Syntax

```js
textStream()
```

### Parameters

None.

### Return value

A `ReadableStream`.

## Examples

### Reading blob content as a text stream

This example shows how to read blob content as a text stream.

We create a sample `Blob`, obtain a `ReadableStream` of its content using `textStream()`, then read the text via a reader created using `ReadableStream.getReader()`.

```js
const pElem = document.querySelector("p");

const obj = { hello: "world" };
const myBlob = new Blob([JSON.stringify(obj, null, 2)], {
  type: "application/json",
});

async function streamBlobText(blob) {
  const textStream = blob.textStream();
  // instead of
  // const textStream = blob.stream().pipeThrough(new TextDecoderStream());

  const reader = textStream.getReader();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    pElem.textContent += value;
  }
}

streamBlobText(myBlob);
```

## See also

- `ReadableStream`
- `ReadableStream.getReader()`
- `Blob.stream()`
