---
title: "Request: clone() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/request/clone/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Request: clone() method

The **`clone()`** method of the `Request` interface creates a copy of the current `Request` object.

Like the underlying `ReadableStream.tee` api,
the `body` of a cloned `Request`
will signal backpressure at the rate of the _faster_ consumer of the two bodies,
and unread data is enqueued internally on the slower consumed `body`
without any limit or backpressure.
Beware when you construct a `Request` from a stream and then `clone` it.

`clone()` throws a `TypeError` if the request body has already been used. In fact, the main reason `clone()` exists is to allow multiple uses of body objects (when they are one-use only.)

If you intend to modify the request, you may prefer the `Request` constructor.

## Syntax

```js
clone()
```

### Parameters

None.

### Return value

A `Request` object, which is an exact copy of the `Request` that `clone()` was called on.

## Examples

In the following snippet, we create a new request using the `Request()` constructor (for an image file in the same directory as the script), then clone the request.

```js
const myRequest = new Request("flowers.jpg");
const newRequest = myRequest.clone(); // a copy of the request is now stored in newRequest
```

## See also

- Service Worker API
- HTTP access control (CORS)
- HTTP
