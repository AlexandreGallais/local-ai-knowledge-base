---
title: "MathMLAnchorElement: hostname property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mathmlanchorelement/hostname/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MathMLAnchorElement: hostname property

The **`hostname`** property of the `MathMLAnchorElement` interface is a string containing either the domain name or IP address of the `` element's `href`. If the URL does not have a hostname, this property contains an empty string, `""`. IPv4 and IPv6 addresses are normalized, such as stripping leading zeros, and domain names are converted to IDN.

See `URL.hostname` for more information.

## Value

A string.

## Examples

### Basic usage

Given this MathML:

```html
<math>
  <a id="myAnchor" href="https://example.com#examples"> ... </a>
</math>
```

you can get the `hostname` of the anchor like this:

```js
const mathAnchor = document.getElementById("myAnchor");
mathAnchor.hostname; // returns 'example.com'
```

## See also

- The MathML `` element
