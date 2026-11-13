---
title: "Using the Fetch API (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fetch_api/using_fetch/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using the Fetch API (part 2 of 2)

## Handling the response

As soon as the browser has received the response status and headers from the server (and potentially before the response body itself has been received), the promise returned by `fetch()` is fulfilled with a `Response` object.

### Checking response status

The promise returned by `fetch()` will reject on some errors, such as a network error or a bad scheme. However, if the server responds with an error like `404`, then `fetch()` fulfills with a `Response`, so we have to check the status before we can read the response body.

The `Response.status` property tells us the numerical status code, and the `Response.ok` property returns `true` if the status is in the 200 range.

A common pattern is to check the value of `ok` and throw if it is `false`:

```js
async function getData() {
  const url = "https://example.org/products.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    // …
  } catch (error) {
    console.error(error.message);
  }
}
```

### Checking the response type

Responses have a `type` property that can be one of the following:

- `basic`: the request was a same-origin request.
- `cors`: the request was a cross-origin CORS request.
- `opaque`: the request was a cross-origin simple request made with the `no-cors` mode.
- `opaqueredirect`: the request set the `redirect` option to `manual`, and the server returned a redirect status.

The type determines the possible contents of the response, as follows:

- Basic <example-value> exclude response headers from the Forbidden response header name list.

- CORS responses include only response headers from the CORS-safelisted response header list.

- Opaque responses and opaque redirect responses have a `status` of `0`, an empty header list, and a `null` body.

### Checking headers

Just like the request, the response has a `headers` property which is a `Headers` object, and this contains any response headers that are exposed to scripts, subject to the exclusions made based on the response type.

A common use case for this is to check the content type before trying to read the body:

```js
async function fetchJSON(request) {
  try {
    const response = await fetch(request);
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("Oops, we haven't got JSON!");
    }
    // Otherwise, we can read the body as JSON
  } catch (error) {
    console.error("Error:", error);
  }
}
```

### Reading the response body

The `Response` interface provides a number of methods to retrieve the entire body contents in a variety of different formats:

- `Response.arrayBuffer()`
- `Response.blob()`
- `Response.formData()`
- `Response.json()`
- `Response.text()`

These are all asynchronous methods, returning a `Promise` which will be fulfilled with the body content.

In this example, we fetch an image and read it as a `Blob`, which we can then use to create an object URL:

```js
const image = document.querySelector("img");

const url = "flowers.jpg";

async function setImage() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const blob = await response.blob();
    const objectURL = URL.createObjectURL(blob);
    image.src = objectURL;
  } catch (e) {
    console.error(e);
  }
}
```

The method will throw an exception if the response body is not in the appropriate format: for example, if you call `json()` on a response that can't be parsed as JSON.

### Streaming the response body

Request and response bodies are actually `ReadableStream` objects, and whenever you read them, you're streaming the content. This is good for memory efficiency, because the browser doesn't have to buffer the entire response in memory before the caller retrieves it using a method like `json()`.

This also means that the caller can process the content incrementally as it is received.

For example, consider a `GET` request that fetches a large text file and processes it in some way, or displays it to the user:

```js
const url = "https://www.example.org/a-large-file.txt";

async function fetchText(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const text = await response.text();
    console.log(text);
  } catch (e) {
    console.error(e);
  }
}
```

If we use `Response.text()`, as above, we must wait until the whole file has been received before we can process any of it.

If we stream the response instead, we can process chunks of the body as they are received from the network:

```js
const url = "https://www.example.org/a-large-file.txt";

async function fetchTextAsStream(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const stream = response.body.pipeThrough(new TextDecoderStream());
    for await (const value of stream) {
      console.log(value);
    }
  } catch (e) {
    console.error(e);
  }
}
```

In this example, we `iterate asynchronously` over the stream, processing each chunk as it arrives.

Note that when you access the body directly like this, you get the raw bytes of the response and must transform it yourself. In this case we call `ReadableStream.pipeThrough()` to pipe the response through a `TextDecoderStream`, which decodes the UTF-8-encoded body data as text.

### Processing a text file line by line

In the example below, we fetch a text resource and process it line by line, using a regular expression to look for line endings. For simplicity, we assume the text is UTF-8, and don't handle fetch errors:

```js
async function* makeTextFileLineIterator(fileURL) {
  const response = await fetch(fileURL);
  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();

  let { value: chunk = "", done: readerDone } = await reader.read();

  const newline = /\r?\n/g;
  let startIndex = 0;

  while (true) {
    const result = newline.exec(chunk);
    if (!result) {
      if (readerDone) break;
      const remainder = chunk.slice(startIndex);
      ({ value: chunk, done: readerDone } = await reader.read());
      chunk = remainder + (chunk || "");
      startIndex = newline.lastIndex = 0;
      continue;
    }
    yield chunk.substring(startIndex, result.index);
    startIndex = newline.lastIndex;
  }

  if (startIndex < chunk.length) {
    // Last line didn't end in a newline char
    yield chunk.substring(startIndex);
  }
}

async function run(urlOfFile) {
  for await (const line of makeTextFileLineIterator(urlOfFile)) {
    processLine(line);
  }
}

function processLine(line) {
  console.log(line);
}

run("https://www.example.org/a-large-file.txt");
```

### Locked and disturbed streams

The consequences of request and response bodies being streams are that:

- if a reader has been attached to a stream using `ReadableStream.getReader()`, then the stream is _locked_, and nothing else can read the stream.
- if any content has been read from the stream, then the stream is _disturbed_, and nothing else can read from the stream.

This means it's not possible to read the same response (or request) body more than once:

```js
async function getData() {
  const url = "https://example.org/products.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result1 = await response.json();
    const result2 = await response.json(); // will throw
  } catch (error) {
    console.error(error.message);
  }
}
```

If you do need to read the body more than once, you must call `Response.clone()` before reading the body:

```js
async function getData() {
  const url = "https://example.org/products.json";
  try {
    const response1 = await fetch(url);
    if (!response1.ok) {
      throw new Error(`Response status: ${response1.status}`);
    }

    const response2 = response1.clone();

    const result1 = await response1.json();
    const result2 = await response2.json();
  } catch (error) {
    console.error(error.message);
  }
}
```

This is a common pattern when implementing an offline cache with service workers. The service worker wants to return the response to the app, but also to cache the response. So it clones the response, returns the original, and caches the clone:

```js
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open("MyCache_1");
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return Response.error();
  }
}

self.addEventListener("fetch", (event) => {
  if (precachedResources.includes(url.pathname)) {
    event.respondWith(cacheFirst(event.request));
  }
});
```

## See also

- Service Worker API
- Streams API
- CORS
- HTTP
- Fetch examples on GitHub
