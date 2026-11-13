---
title: "XMLHttpRequest: send() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xmlhttprequest/send/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XMLHttpRequest: send() method

The `XMLHttpRequest` method
**`send()`** sends the request to the server.

If the
request is asynchronous (which is the default), this method returns as soon as the
request is sent and the result is delivered using events. If the request is synchronous,
this method doesn't return until the response has arrived.

`send()` accepts an optional parameter which lets you specify the request's
body; this is primarily used for requests such as `PUT`. If the request
method is `GET` or `HEAD`, the `body`
parameter is ignored and the request body is set to `null`.

If no `Accept` header has been set using the
`setRequestHeader()`, an
`Accept` header with the type `"*/*"` (any type) is sent.

## Syntax

```js
send()
send(body)
```

### Parameters

- `body` (optional)
    A body of data to be sent in the XHR request. This can be:
    - A `Document`, in which case it is serialized before being sent.
    - An `XMLHttpRequestBodyInit`, which per the Fetch spec can be a `Blob`, an `ArrayBuffer`, a `TypedArray`, a `DataView`, a `FormData`, a `URLSearchParams`, or a string.
    - `null`

    If no value is specified for the body, a default value of `null` is used.

The best way to send binary content (e.g., in file uploads) is by using
a `TypedArray`, a `DataView` or a `Blob` object
in conjunction with the `send()` method.

### Return value

None (`undefined`).

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if `send()` has already been invoked for the request, and/or the request is complete.
- `NetworkError` `DOMException`
    Thrown if the resource type to be fetched is a Blob, and the method is not `GET`.

## Example: GET

```js
const xhr = new XMLHttpRequest();
xhr.open("GET", "/server", true);

xhr.onload = () => {
  // Request finished. Do processing here.
};

xhr.send(null);
// xhr.send('string');
// xhr.send(new Blob());
// xhr.send(new Int8Array());
// xhr.send(document);
```

## Example: POST

```js
const xhr = new XMLHttpRequest();
xhr.open("POST", "/server", true);

// Send the proper header information along with the request
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

xhr.onreadystatechange = () => {
  // Call a function when the state changes.
  if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    // Request finished. Do processing here.
  }
};
xhr.send("foo=bar&lorem=ipsum");
// xhr.send(new Int8Array());
// xhr.send(document);
```

## See also

- Using XMLHttpRequest
- HTML in XMLHttpRequest
