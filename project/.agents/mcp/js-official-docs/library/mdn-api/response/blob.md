---
title: "Response: blob() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/response/blob/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Response: blob() method

The **`blob()`** method of the `Response` interface takes
a `Response` stream and reads it to completion. It returns a promise that
resolves with a `Blob`.

## Syntax

```js
blob()
```

### Parameters

None.

> **Note:**
> If the `Response` has a
> `Response.type` of `"opaque"`, the resulting `Blob`
> will have a `Blob.size` of `0` and a `Blob.type` of
> empty string `""`, which renders it _useless_ for methods like
> `URL.createObjectURL()`.

### Return value

A promise that resolves with a `Blob` whose data is the body's bytes and the media type is the response's `Content-Type` header's value.

### Exceptions

- `AbortError` `DOMException`
    The request was aborted.
- `TypeError`
    Thrown for one of the following reasons:
    - The response body is disturbed or locked.
    - There was an error decoding the body content (for example, because the `Content-Encoding` header is incorrect).

## Examples

In our fetch request example (run fetch request live), we
create a new request using the `Request()` constructor,
then use it to fetch a JPG. When the fetch is successful, we read a `Blob`
out of the response using `blob()`, put it into an object URL using
`URL.createObjectURL()`, and then set that URL as the source of an
`` element to display the image.

```js
const myImage = document.querySelector("img");

const myRequest = new Request("flowers.jpg");

fetch(myRequest)
  .then((response) => response.blob())
  .then((myBlob) => {
    const objectURL = URL.createObjectURL(myBlob);
    myImage.src = objectURL;
  });
```

## See also

- ServiceWorker API
- HTTP access control (CORS)
- HTTP
