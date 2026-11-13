---
title: "Request: body property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/request/body/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Request: body property

The **`body`** read-only property of the `Request`
interface contains a `ReadableStream` with the body contents
that have been added to the request. Note that a request using the
`GET` or `HEAD` method cannot have a body
and `null` is returned in these cases.

## Value

A `ReadableStream` or `null`.

## Examples

```js
const request = new Request("/myEndpoint", {
  method: "POST",
  body: "Hello world",
});

request.body; // ReadableStream
```

## See also

- `Request.bodyUsed`
