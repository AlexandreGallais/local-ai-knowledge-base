---
title: "XMLHttpRequest: responseURL property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xmlhttprequest/responseurl/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XMLHttpRequest: responseURL property

The read-only **`XMLHttpRequest.responseURL`** property returns the serialized URL of the response or the empty string if the URL is `null`. If the URL is returned, any URL fragment present in the URL will be stripped away. The value of `responseURL` will be the final URL obtained after any redirects.

## Example

```js
const xhr = new XMLHttpRequest();
xhr.open("GET", "http://example.com/test", true);
xhr.onload = () => {
  console.log(xhr.responseURL); // http://example.com/test
};
xhr.send(null);
```
