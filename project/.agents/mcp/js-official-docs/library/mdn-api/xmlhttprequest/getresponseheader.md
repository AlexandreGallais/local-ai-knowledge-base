---
title: "XMLHttpRequest: getResponseHeader() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xmlhttprequest/getresponseheader/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XMLHttpRequest: getResponseHeader() method

The `XMLHttpRequest` method
**`getResponseHeader()`** returns the string containing the
text of a particular header's value.

If there are multiple response headers
with the same name, then their values are returned as a single concatenated string,
where each value is separated from the previous one by a pair of comma and space. The
`getResponseHeader()` method returns the value as a UTF byte sequence.

> **Note:**
> The search for the header name is case-insensitive.

If you need to get the raw string of all of the headers, use the
`getAllResponseHeaders()` method,
which returns the entire raw header string.

## Syntax

```js
getResponseHeader(headerName)
```

### Parameters

- `headerName`
    A string indicating the name of the header you want to return the
    text value of.

### Return value

A string representing the header's text value, or `null`
if either the response has not yet been received or the header doesn't exist in the
response.

## Examples

In this example, a request is created and sent, and a `readystatechange`
handler is established to look for the `readyState`
to indicate that the headers have been received; when that is the case,
the value of the `Content-Type` header is fetched. If the
`Content-Type` isn't the desired value, the `XMLHttpRequest` is
canceled by calling `abort()`.

```js
const client = new XMLHttpRequest();
client.open("GET", "unicorns-are-awesome.txt", true);
client.send();

client.onreadystatechange = () => {
  if (client.readyState === client.HEADERS_RECEIVED) {
    const contentType = client.getResponseHeader("Content-Type");
    if (contentType !== myExpectedType) {
      client.abort();
    }
  }
};
```

## See also

- Using XMLHttpRequest
- HTTP headers
- `getAllResponseHeaders()`
- `response`
- Setting request headers: `setRequestHeader()`
