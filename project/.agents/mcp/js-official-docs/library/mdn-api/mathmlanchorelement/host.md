---
title: "MathMLAnchorElement: host property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mathmlanchorelement/host/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MathMLAnchorElement: host property

The **`host`** property of the `MathMLAnchorElement` interface is a string containing the host, which is the `hostname`, and then, if the port of the URL is nonempty, a `":"`, followed by the `port` of the URL. If the URL does not have a `hostname`, this property contains an empty string, `""`.

See `URL.host` for more information.

## Value

A string.

## Examples

### Basic usage

Given this MathML:

```html
<math>
  <a href="https://example.com#examples">...</a>
</math>
```

```js
const mathAnchor = document.querySelector("math a");

mathAnchor.href = "https://example.com/subsection";
mathAnchor.host === "example.com";

mathAnchor.href = "https://example.com:443";
mathAnchor.host === "example.com";
// The port number is not included because 443 is the scheme's default port

mathAnchor.href = "https://example.com:4097";
mathAnchor.host === "example.com:4097";
```

## See also

- The MathML `` element
