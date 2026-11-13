---
title: "URL: hostname property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/url/hostname/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URL: hostname property

The **`hostname`** property of the `URL` interface is a string containing either the domain name or IP address of the URL. If the URL does not have a hostname, this property contains an empty string, `""`. IPv4 and IPv6 addresses are normalized, such as stripping leading zeros, and domain names are converted to IDN.

This property can be set to change the hostname of the URL. If the URL's scheme is not hierarchical (which the URL standard calls "special schemes"), then it has no concept of a host and setting this property has no effect.

## Value

A string.

## Examples

```js
const url = new URL(
  "https://developer.mozilla.org/en-US/docs/Web/API/URL/hostname",
);
console.log(url.hostname); // Logs: 'developer.mozilla.org'

url.hostname = "你好.com";
console.log(url.hostname); // Logs: 'xn--6qq79v.com'
```

## See also

- The `URL` interface it belongs to.
