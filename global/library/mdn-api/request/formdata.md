---
title: "Request: formData() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/request/formdata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Request: formData() method

The **`formData()`** method of the `Request` interface
reads the request body and returns it as a promise that resolves with a `FormData` object.

## Syntax

```js
formData()
```

### Parameters

None.

### Return value

A `Promise` that resolves with a `FormData` object.

### Exceptions

- `TypeError`
    Thrown for one of the following reasons:
    - The request body is disturbed or locked.
    - There was an error decoding the body content (for example, because the `Content-Encoding` header is incorrect).
    - The MIME type of the body cannot be determined from the `Content-Type` headers included in the request, or is not `application/x-www-form-urlencoded` or `multipart/form-data`.
    - The body cannot be parsed as a `FormData` object.

## Examples

```js
const formData = new FormData();
const fileField = document.querySelector('input[type="file"]');

formData.append("username", "abc123");
formData.append("avatar", fileField.files[0]);

const request = new Request("/myEndpoint", {
  method: "POST",
  body: formData,
});

request.formData().then((data) => {
  // do something with the formdata sent in the request
});
```

## See also

- `Response.formData()`
