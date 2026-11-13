---
title: "Headers: get() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/headers/get/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Headers: get() method

The **`get()`** method of the `Headers` interface
returns a byte string of all the values of a header within a `Headers` object
with a given name. If the requested header doesn't exist in the `Headers`
object, it returns `null`.

For security reasons, some headers can only be controlled by the user agent. These
headers include the forbidden request headers
and forbidden response header names.

## Syntax

```js
get(name)
```

### Parameters

- `name`
    The name of the HTTP header whose values you want to retrieve from the
    `Headers` object. If the given name doesn't match the
    field-name
    production in the HTTP specification, this method throws a `TypeError`.
    The name is case-insensitive.

### Return value

A `String` sequence representing the values of the retrieved header or
`null` if this header is not set.

## Examples

Creating an empty `Headers` object is simple:

```js
const myHeaders = new Headers(); // Currently empty
myHeaders.get("Not-Set"); // Returns null
```

You could add a header to this using `Headers.append`, then retrieve it
using `get()`:

```js
myHeaders.append("Content-Type", "image/jpeg");
myHeaders.get("Content-Type"); // Returns "image/jpeg"
```

If the header has multiple values associated with it, the byte string will contain all
the values, in the order they were added to the Headers object:

```js
myHeaders.append("Accept-Encoding", "deflate");
myHeaders.append("Accept-Encoding", "gzip");
myHeaders.get("Accept-Encoding"); // Returns "deflate, gzip"
myHeaders
  .get("Accept-Encoding")
  .split(",")
  .map((v) => v.trimStart()); // Returns [ "deflate", "gzip" ]
```

## See also

- ServiceWorker API
- HTTP access control (CORS)
- HTTP
