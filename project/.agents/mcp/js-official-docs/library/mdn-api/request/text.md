---
title: "Request: text() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/request/text/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Request: text() method

The **`text()`** method of the `Request` interface
reads the request body and returns it as a promise that resolves with a `String`.
The response is _always_ decoded using UTF-8.

## Syntax

```js
text()
```

### Parameters

None.

### Return value

A Promise that resolves with a `String`.

### Exceptions

- `TypeError`
    Thrown for one of the following reasons:
    - The request body is disturbed or locked.
    - There was an error decoding the body content (for example, because the `Content-Encoding` header is incorrect).

## Examples

```js
const text = "Hello world";

const request = new Request("/myEndpoint", {
  method: "POST",
  body: text,
});

request.text().then((text) => {
  // do something with the text sent in the request
});
```

## See also

- `Response.text()`
