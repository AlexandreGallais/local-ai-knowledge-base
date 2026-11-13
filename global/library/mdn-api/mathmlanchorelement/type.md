---
title: "MathMLAnchorElement: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mathmlanchorelement/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MathMLAnchorElement: type property

The **`type`** property of the `MathMLAnchorElement` interface is a string that indicates the MIME type of the linked resource.

It reflects the `type` attribute of the `` element.

## Value

A string.

## Examples

### Basic usage

Given this MathML:

```html
<math>
  <a id="myAnchor" href="https://example.com" type="text/html"> ... </a>
</math>
```

you can get the `type` of the anchor like this:

```js
const mathAnchor = document.getElementById("myAnchor");
mathAnchor.type; // returns 'text/html'
```

## See also

- The MathML `` element
