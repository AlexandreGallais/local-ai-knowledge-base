---
title: "Headers: entries() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/headers/entries/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Headers: entries() method

The **`Headers.entries()`** method returns an
`iterator` allowing you to go through all key/value pairs
contained in this object. Both the key and value of each pair are
`String` objects.

## Syntax

```js
entries()
```

### Parameters

None.

### Return value

Returns an `iterator`.

## Examples

```js
// Create a test Headers object
const myHeaders = new Headers();
myHeaders.append("Content-Type", "text/xml");
myHeaders.append("Vary", "Accept-Language");

// Display the key/value pairs
for (const pair of myHeaders.entries()) {
  console.log(`${pair[0]}: ${pair[1]}`);
}
```

The result is:

```plain
content-type: text/xml
vary: Accept-Language
```

## See also

- ServiceWorker API
- HTTP access control (CORS)
- HTTP
