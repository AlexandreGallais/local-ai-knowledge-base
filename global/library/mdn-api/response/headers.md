---
title: "Response: headers property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/response/headers/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Response: headers property

The **`headers`** read-only property of the
`Response` interface contains the `Headers` object associated
with the response.

## Value

A `Headers` object.

## Examples

In our Fetch Response example (see Fetch Response live)
we create a new `Request` object using the `Request()` constructor, passing it a JPG path.
We then fetch this request using `fetch()`, extract a blob from the response using `Response.blob`,
create an object URL out of it using `URL.createObjectURL()`, and display this in an ``.

Note that at the top of the `fetch()` block, we log the response headers to the console.

```js
const myImage = document.querySelector("img");

const myRequest = new Request("flowers.jpg");

fetch(myRequest)
  .then((response) => {
    console.log("response.headers =", response.headers);
    return response.blob();
  })
  .then((myBlob) => {
    const objectURL = URL.createObjectURL(myBlob);
    myImage.src = objectURL;
  });
```

## See also

- ServiceWorker API
- HTTP access control (CORS)
- HTTP
