---
title: "Headers: keys() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/headers/keys/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Headers: keys() method

The **`Headers.keys()`** method returns an
`iterator` allowing you to go through all keys contained
in this object. The keys are `String` objects.

## Syntax

```js
keys()
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

// Display the keys
for (const key of myHeaders.keys()) {
  console.log(key);
}
```

The result is:

```plain
content-type
vary
```

## See also

- ServiceWorker API
- HTTP access control (CORS)
- HTTP
