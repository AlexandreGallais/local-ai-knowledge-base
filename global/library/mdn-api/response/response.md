---
title: "Response: Response() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/response/response/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Response: Response() constructor

The **`Response()`** constructor creates a new `Response` object.

## Syntax

```js
new Response()
new Response(body)
new Response(body, options)
```

### Parameters

- `body` (optional)
    An object defining a body for the response. This can be `null` (which is
    the default value), or one of:
    - `Blob`
    - `ArrayBuffer`
    - `TypedArray`
    - `DataView`
    - `FormData`
    - `ReadableStream`
    - `URLSearchParams`
    - `String`
    - string literal

- `options` (optional)
    An options object containing any custom settings that you want to apply to the response, or an empty object (which is the default value). The possible options are:
    - `status`
        The status code for the response.
        The default value is `200`.
    - `statusText`
        The status message associated with the status code, such as `"OK"`.
        The default value is `""`.
    - `headers`
        Any headers you want to add to your response, contained within a `Headers` object or object literal of `String` key/value pairs (see HTTP headers for a reference).
        By default this is empty.

## Examples

In our Fetch Response example (see Fetch Response live)
we create a new `Response` object using the constructor, passing it a new `Blob` as a body, and an init object containing a custom `status` and `statusText`:

```js
const myBlob = new Blob();
const myOptions = { status: 200, statusText: "SuperSmashingGreat!" };
const myResponse = new Response(myBlob, myOptions);
```

## See also

- ServiceWorker API
- HTTP access control (CORS)
- HTTP
