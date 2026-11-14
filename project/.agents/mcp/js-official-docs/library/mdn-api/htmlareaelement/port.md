---
title: "HTMLAreaElement: port property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlareaelement/port/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLAreaElement: port property

The **`port`** property of the `HTMLAreaElement` interface is a string containing the port number of the `<area>` element's `href`. If the port is the default for the protocol (`80` for `ws:` and `http:`, `443` for `wss:` and `https:`, and `21` for `ftp:`), this property contains an empty string, `""`.

This property can be set to change the port of the URL. If the URL has no `host` or its scheme is `file:`, then setting this property has no effect. It also silently ignores invalid port numbers.

See `URL.port` for more information.

## Value

A string.

## Examples

### Getting the port from an area link

```js
// An <area id="myArea" href="https://developer.mozilla.org:443/en-US/docs/HTMLAreaElement"> element is in the document
const area = document.getElementById("myArea");
area.port; // Returns ''
```

```js
// Another <area id="myArea" href="https://developer.mozilla.org:8888/en-US/docs/HTMLAreaElement"> element is in the document
const area = document.getElementById("myArea");
area.port; // Returns:'8888'
```

## See also

- The `HTMLAreaElement` interface it belongs to.
