---
title: "URL: host property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/url/host/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URL: host property

The **`host`** property of the `URL` interface is a string containing the host, which is the `hostname`, and then, if the port of the URL is nonempty, a `":"`, followed by the `port` of the URL. If the URL does not have a `hostname`, this property contains an empty string, `""`.

This property can be set to change both the hostname and the port of the URL. If the URL's scheme is not hierarchical (which the URL standard calls "special schemes"), then it has no concept of a host and setting this property has no effect.

> **Note:**
> If the given value for the `host` setter lacks a `port`, the URL's `port` will not change. This can be unexpected as the `host` getter does return a URL-port string, so one might have assumed the setter to always "reset" both.

## Value

A string.

## Examples

```js
let url = new URL("https://developer.mozilla.org/en-US/docs/Web/API/URL/host");
console.log(url.host); // "developer.mozilla.org"

url = new URL("https://developer.mozilla.org:443/en-US/docs/Web/API/URL/host");
console.log(url.host); // "developer.mozilla.org"
// The port number is not included because 443 is the scheme's default port

url = new URL("https://developer.mozilla.org:4097/en-US/docs/Web/API/URL/host");
console.log(url.host); // "developer.mozilla.org:4097"
```

## See also

- The `URL` interface it belongs to.
