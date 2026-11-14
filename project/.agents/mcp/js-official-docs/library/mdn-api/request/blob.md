---
title: "Request: blob() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/request/blob/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Request: blob() method

The **`blob()`** method of the `Request` interface
reads the request body and returns it as a promise that resolves with a `Blob`.

## Syntax

```js
blob()
```

### Parameters

None.

### Return value

A promise that resolves with a `Blob` whose data is the body's bytes and the media type is the request's `Content-Type` header's value.

### Exceptions

- `TypeError`
    Thrown for one of the following reasons:
    - The request body is disturbed or locked.
    - There was an error decoding the body content (for example, because the `Content-Encoding` header is incorrect).

## Examples

```js
const obj = { hello: "world" };
const myBlob = new Blob([JSON.stringify(obj, null, 2)], {
  type: "application/json",
});

const request = new Request("/myEndpoint", {
  method: "POST",
  body: myBlob,
});

request.blob().then((myBlob) => {
  // do something with the blob sent in the request
});
```

## See also

- `Response.blob()`
