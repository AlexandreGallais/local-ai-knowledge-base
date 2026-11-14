---
title: "Location: hostname property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/location/hostname/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Location: hostname property

The **`hostname`** property of the `Location` interface is a string containing either the domain name or IP address of the location URL. If the URL does not have a hostname, this property contains an empty string, `""`. IPv4 and IPv6 addresses are normalized, such as stripping leading zeros, and domain names are converted to IDN.

See `URL.hostname` for more information.

## Value

A string.

## Examples

```js
console.log(window.location.hostname);
// developer.mozilla.org

const anchor = document.createElement("a");
anchor.href = "https://developer.mozilla.org:4097/";
console.log(anchor.hostname === "developer.mozilla.org");
// The port number is not included in hostname
```
