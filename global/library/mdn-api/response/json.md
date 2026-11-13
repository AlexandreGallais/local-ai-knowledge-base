---
title: "Response: json() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/response/json/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Response: json() method

The **`json()`** method of the `Response` interface takes
a `Response` stream and reads it to completion. It returns a promise which
resolves with the result of parsing the body text as `JSON`.

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

- `AbortError` `DOMException`
    The request was aborted.
- `TypeError`
    Thrown for one of the following reasons:
    - The response body is disturbed or locked.
    - There was an error decoding the body content (for example, because the `Content-Encoding` header is incorrect).
- `SyntaxError`
    The response body cannot be parsed as JSON.

## Examples

In our fetch JSON example (run fetch JSON live),
we create a new request using the `Request()` constructor, then use it to fetch a `.json` file.
When the fetch is successful, we read and parse the data using `json()`, then read
values out of the resulting objects as you'd expect and insert them into list items to
display our product data.

```js
const myList = document.querySelector("ul");
const myRequest = new Request("products.json");

fetch(myRequest)
  .then((response) => response.json())
  .then((data) => {
    for (const product of data.products) {
      const listItem = document.createElement("li");
      listItem.appendChild(document.createElement("strong")).textContent =
        product.Name;
      listItem.append(` can be found in ${product.Location}. Cost: `);
      listItem.appendChild(document.createElement("strong")).textContent =
        `£${product.Price}`;
      myList.appendChild(listItem);
    }
  })
  .catch(console.error);
```

## See also

- ServiceWorker API
- Cross-Origin Resource Sharing (CORS)
- HTTP
