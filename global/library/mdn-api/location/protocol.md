---
title: "Location: protocol property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/location/protocol/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Location: protocol property

The **`protocol`** property of the `Location` interface is a string containing the protocol or scheme of the location's URL, including the final `":"`.

This property can be set to change the protocol of the URL. A `":"` is appended to the provided string if not provided. The provided scheme has to be compatible with the rest of the URL to be considered valid.

See `URL.protocol` for more information.

## Value

A string.

## Examples

```js
// Let's an <a id="myAnchor" href="https://developer.mozilla.org/en-US/Location.protocol"> element be in the document
const anchor = document.getElementById("myAnchor");
const result = anchor.protocol; // Returns:'https:'
```
