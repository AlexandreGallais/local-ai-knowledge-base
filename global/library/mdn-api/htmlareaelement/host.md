---
title: "HTMLAreaElement: host property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlareaelement/host/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLAreaElement: host property

The **`host`** property of the `HTMLAreaElement` interface is a string containing the host, which is the `hostname`, and then, if the port of the URL is nonempty, a `":"`, followed by the `port` of the URL. If the URL does not have a `hostname`, this property contains an empty string, `""`.

See `URL.host` for more information.

## Value

A string.

## Examples

```js
const area = document.createElement("area");

area.href = "https://developer.mozilla.org/en-US/HTMLAreaElement";
area.host === "developer.mozilla.org";

area.href = "https://developer.mozilla.org:443/en-US/HTMLAreaElement";
area.host === "developer.mozilla.org";
// The port number is not included because 443 is the scheme's default port

area.href = "https://developer.mozilla.org:4097/en-US/HTMLAreaElement";
area.host === "developer.mozilla.org:4097";
```

## See also

- The `HTMLAreaElement` interface it belongs to.
