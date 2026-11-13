---
title: "MathMLAnchorElement: protocol property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mathmlanchorelement/protocol/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MathMLAnchorElement: protocol property

The **`protocol`** property of the `MathMLAnchorElement` interface is a string containing the protocol or scheme of the `` element's `href`, including the final `":"`.

This property can be set to change the protocol of the URL. A `":"` is appended to the provided string if not provided. The provided scheme has to be compatible with the rest of the URL to be considered valid.

See `URL.protocol` for more information.

## Value

A string.

## Examples

### Basic usage

Given this MathML:

```html
<math>
  <a id="myAnchor" href="https://example.com/subsection#examples"> ... </a>
</math>
```

you can get the `protocol` of the anchor like this:

```js
const mathAnchor = document.getElementById("myAnchor");
mathAnchor.protocol; // returns 'https:'
```

## See also

- The MathML `` element
