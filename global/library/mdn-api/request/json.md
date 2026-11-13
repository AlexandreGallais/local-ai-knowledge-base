---
title: "Request: json() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/request/json/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Request: json() method

The **`json()`** method of the `Request` interface
reads the request body and returns it as a promise that resolves with the result of parsing the body text as `JSON`.

Note that despite the method being named `json()`, the result is not JSON but is instead the result of taking JSON as input and parsing it to produce a JavaScript object.

## Syntax

```js
json()
```

### Parameters

None.

### Return value

A `Promise` that resolves to a JavaScript object. This object could be
anything that can be represented by JSON — an object, an array, a string, a number…

### Exceptions

- `TypeError`
    Thrown for one of the following reasons:
    - The request body is disturbed or locked.
    - There was an error decoding the body content (for example, because the `Content-Encoding` header is incorrect).
- `SyntaxError`
    The request body cannot be parsed as JSON.

## Examples

```js
const obj = { hello: "world" };

const request = new Request("/myEndpoint", {
  method: "POST",
  body: JSON.stringify(obj),
});

request.json().then((data) => {
  // do something with the data sent in the request
});
```

## See also

- `Response.json()`
