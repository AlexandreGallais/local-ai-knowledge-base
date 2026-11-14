---
title: "Headers: has() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/headers/has/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Headers: has() method

The **`has()`** method of the `Headers` interface
returns a boolean stating whether a `Headers` object contains a certain
header.

For security reasons, some headers can only be controlled by the user agent. These
headers include the forbidden request headers
and forbidden response header names.

## Syntax

```js
has(name)
```

### Parameters

- `name`
    The name of the HTTP header you want to test for. If the given name is not a valid
    HTTP header name, this method throws a `TypeError`.

### Return value

A boolean value.

## Examples

Creating an empty `Headers` object is simple:

```js
const myHeaders = new Headers(); // Currently empty
```

You could add a header to this using `Headers.append`, then test for the
existence of it using `has()`:

```js
myHeaders.append("Content-Type", "image/jpeg");
myHeaders.has("Content-Type"); // Returns true
myHeaders.has("Accept-Encoding"); // Returns false
```

## See also

- ServiceWorker API
- HTTP access control (CORS)
- HTTP
