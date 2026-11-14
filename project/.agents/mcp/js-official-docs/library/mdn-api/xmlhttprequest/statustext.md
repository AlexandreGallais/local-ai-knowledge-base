---
title: "XMLHttpRequest: statusText property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xmlhttprequest/statustext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XMLHttpRequest: statusText property

The read-only **`XMLHttpRequest.statusText`** property returns a string containing the response's status message as returned by the HTTP server. Unlike `XMLHttpRequest.status` which indicates a numerical status code, this property contains the _text_ of the response status, such as "OK" or "Not Found". If the request's `readyState` is in `UNSENT` or `OPENED` state, the value of `statusText` will be an empty string.

If the server response doesn't explicitly specify a status text, `statusText` will assume the default value "OK".

> **Note:**
> Responses over an HTTP/2 connection will always have an empty string as status message as HTTP/2 does not support them.

## Value

A string.

## Examples

```js
const xhr = new XMLHttpRequest();
console.log("0 UNSENT", xhr.statusText);

xhr.open("GET", "/server", true);
console.log("1 OPENED", xhr.statusText);

xhr.onprogress = () => {
  console.log("3 LOADING", xhr.statusText);
};

xhr.onload = () => {
  console.log("4 DONE", xhr.statusText);
};

xhr.send(null);

/**
 * Outputs the following:
 *
 * 0 UNSENT
 * 1 OPENED
 * 3 LOADING OK
 * 4 DONE OK
 */
```

## See also

- List of HTTP status
- HTTP
- WHATWG Fetch Living Standard
