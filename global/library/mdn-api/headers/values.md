---
title: "Headers: values() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/headers/values/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Headers: values() method

The **`Headers.values()`** method returns an
`iterator` allowing you to go through all values contained
in this object. The values are `String` objects.

## Syntax

```js
values()
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

// Display the values
for (const value of myHeaders.values()) {
  console.log(value);
}
```

The result is:

```plain
text/xml
Accept-Language
```

## See also

- ServiceWorker API
- HTTP access control (CORS)
- HTTP
