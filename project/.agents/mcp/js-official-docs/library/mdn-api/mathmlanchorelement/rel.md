---
title: "MathMLAnchorElement: rel property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mathmlanchorelement/rel/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MathMLAnchorElement: rel property

The **`rel`** property of the `MathMLAnchorElement` interface is a string containing a space-separated list of link types indicating the relationship between the resource represented by the link and the current document.

It reflects the `rel` attribute of the `` element.

## Value

A string.

## Examples

### Basic usage

Given this MathML:

```html
<math>
  <a id="myAnchor" href="https://example.com" rel="help alternate">...</a>
</math>
```

you can get the `rel` value of the anchor like this:

```js
const mathAnchor = document.getElementById("myAnchor");
mathAnchor.rel; // "help alternate"
```

## See also

- The MathML `` element
- `MathMLAnchorElement.relList`
- `rel` HTML attribute
