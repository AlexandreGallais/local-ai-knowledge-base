---
title: "Response: ok property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/response/ok/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Response: ok property

The **`ok`** read-only property of the `Response` interface contains a Boolean stating whether the response was successful (status in the range 200-299) or not.

## Value

A boolean value.

## Examples

In our Fetch Response example (see Fetch Response live)
we create a new `Request` object using the `Request()` constructor, passing it a JPG path.
We then fetch this request using `fetch()`, extract a blob from the response using `Response.blob`, create an object URL out of it using `URL.createObjectURL()`, and display this in an ``.

> **Note:**
> At the top of the `fetch()` block we log the response `ok` value to the console.

```js
const myImage = document.querySelector("img");

const myRequest = new Request("flowers.jpg");

fetch(myRequest).then((response) => {
  console.log(response.ok); // returns true if the response returned successfully
  response.blob().then((myBlob) => {
    const objectURL = URL.createObjectURL(myBlob);
    myImage.src = objectURL;
  });
});
```

## See also

- ServiceWorker API
- HTTP access control (CORS)
- HTTP
