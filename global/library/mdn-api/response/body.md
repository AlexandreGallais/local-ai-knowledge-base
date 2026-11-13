---
title: "Response: body property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/response/body/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Response: body property

The **`body`** read-only property of the `Response` interface is a `ReadableStream` of the body contents.

## Value

A `ReadableStream`, or else `null` for any `Response` object constructed with a null `body` property, or for any actual HTTP response that has no body.

The stream is a readable byte stream, which supports zero-copy reading using a `ReadableStreamBYOBReader`.

> **Note:**
> Current browsers don't actually conform to the spec requirement to set the `body` property to `null` for responses with no body (for example, responses to `HEAD` requests, or `204 No Content` responses).

## Examples

### Copying an image

In our simple stream pump example we fetch an image,
expose the response's stream using `response.body`, create a reader using `ReadableStream.getReader()`,
then enqueue that stream's chunks into a second, custom readable stream — effectively creating an identical copy of the image.

```js
const image = document.getElementById("target");

// Fetch the original image
fetch("./tortoise.png")
  // Retrieve its body as ReadableStream
  .then((response) => response.body)
  .then((body) => {
    const reader = body.getReader();

    return new ReadableStream({
      start(controller) {
        return pump();

        function pump() {
          return reader.read().then(({ done, value }) => {
            // When no more data needs to be consumed, close the stream
            if (done) {
              controller.close();
              return;
            }

            // Enqueue the next data chunk into our target stream
            controller.enqueue(value);
            return pump();
          });
        }
      },
    });
  })
  .then((stream) => new Response(stream))
  .then((response) => response.blob())
  .then((blob) => URL.createObjectURL(blob))
  .then((url) => console.log((image.src = url)))
  .catch((err) => console.error(err));
```

### Creating a BYOB reader

In this example we construct a `ReadableStreamBYOBReader` from the body using `ReadableStream.getReader({mode: 'byob'})`. We can then use this reader to implement zero copy transfer of the response data.

```js
async function getProducts(url) {
  const response = await fetch(url);
  const reader = response.body.getReader({ mode: "byob" });
  // read the response
}

getProducts(
  "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);
```

## See also

- Fetch API
- Streams API
- ServiceWorker API
