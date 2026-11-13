---
title: "Request: arrayBuffer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/request/arraybuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Request: arrayBuffer() method

The **`arrayBuffer()`** method of the `Request` interface
reads the request body and returns it as a promise that resolves with an `ArrayBuffer`.

## Syntax

```js
arrayBuffer()
```

### Parameters

None.

### Return value

A promise that resolves with an `ArrayBuffer`.

### Exceptions

- `TypeError`
    Thrown for one of the following reasons:
    - The request body is disturbed or locked.
    - There was an error decoding the body content (for example, because the `Content-Encoding` header is incorrect).
- `RangeError`
    Thrown if there is a problem creating the associated `ArrayBuffer` (for example, if the data size is too large).

## Examples

```js
const myArray = new Uint8Array(10);

const request = new Request("/myEndpoint", {
  method: "POST",
  body: myArray,
});

request.arrayBuffer().then((buffer) => {
  // do something with the buffer sent in the request
});
```

## See also

- `Response.arrayBuffer()`
