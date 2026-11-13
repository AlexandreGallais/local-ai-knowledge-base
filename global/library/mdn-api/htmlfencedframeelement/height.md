---
title: "HTMLFencedFrameElement: height property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlfencedframeelement/height/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLFencedFrameElement: height property

The **`height`** property of the `HTMLFencedFrameElement` gets and sets the value of the corresponding `<fencedframe>` `height` attribute, which specifies the height of the element.

The size of the embedded content may be set by internal `contentWidth` and `contentHeight` properties of the `<fencedframe>`'s `config` object. In such cases, changing the `width` or `height` of the `<fencedframe>` will change the size of the embedded container on the page, but the document inside the container will be visually scaled to fit. The reported width and height of the embedded document (i.e., `Window.innerWidth` and `Window.innerHeight`) will be unchanged.

## Value

A string representing the height of the element in CSS pixels. The default value is `150`.

## Examples

```js
const frame = document.createElement("fencedframe");
frame.height = "320";
```

## See also

- Fenced frames on privacysandbox.google.com
- The Privacy Sandbox on privacysandbox.google.com
