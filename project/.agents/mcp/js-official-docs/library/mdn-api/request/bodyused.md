---
title: "Request: bodyUsed property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/request/bodyused/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Request: bodyUsed property

The **`bodyUsed`** read-only property of the
`Request` interface is a boolean value that indicates
whether the request body has been read yet.

## Value

A boolean value.

## Examples

```js
const request = new Request("/myEndpoint", {
  method: "POST",
  body: "Hello world",
});

request.bodyUsed; // false

request.text().then((bodyAsText) => {
  console.log(request.bodyUsed); // true
});
```

## See also

- `Request.body`
