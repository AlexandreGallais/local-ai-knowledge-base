---
title: "MathMLAnchorElement: target property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mathmlanchorelement/target/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MathMLAnchorElement: target property

The **`target`** property of the `MathMLAnchorElement` interface is a string that indicates where to display the linked resource.

It reflects the `target` attribute of the `` element.

## Value

A string representing the target. Its value can be one of the keywords `_blank`, `_self`, `_parent`, or `_top`.

## Examples

### Basic usage

Given this MathML:

```html
<math>
  <a id="myAnchor" href="https://example.com" target="_blank"> ... </a>
</math>
```

you can get the `target` of the anchor like this:

```js
const mathAnchor = document.getElementById("myAnchor");
mathAnchor.target; // returns '_blank'
```

## See also

- The MathML `` element
