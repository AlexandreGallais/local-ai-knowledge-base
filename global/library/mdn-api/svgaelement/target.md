---
title: "SVGAElement: target property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgaelement/target/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGAElement: target property

The **`SVGAElement.target`** read-only property of `SVGAElement` returns an `SVGAnimatedString` object that specifies the portion of a target window, frame, pane into which a document is to be opened when a link is activated.

This property is used when there are multiple possible targets for the ending resource, like when the parent document is a multi-frame HTML or XHTML document.

## Value

An `SVGAnimatedString` indicating the ending resource target that opens the document when the link is activated. See `target` for valid values.

## Examples

The code is taken from the "SVGAElement example code"

```js
// …
const linkRef = document.querySelector("a");
linkRef.target = "_blank";
// …
```

## See also

- `target`
