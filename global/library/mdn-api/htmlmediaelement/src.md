---
title: "HTMLMediaElement: src property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/src/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: src property

The **`HTMLMediaElement.src`** property reflects the value of
the HTML media element's `src` attribute, which indicates the URL of a media
resource to use in the element.

> **Note:**
> The best way to know the URL of the media resource currently
> in active use in this element is to look at the value of the
> `currentSrc` attribute, which also takes
> into account selection of a best or preferred media resource from a list provided in
> an `HTMLSourceElement` (which represents a ``
> element).

## Value

A string containing the URL of a media resource to use in the
element; this property reflects the value of the HTML element's `src`
attribute.

## Examples

```js
const obj = document.createElement("video");
console.log(obj.src); // ""
```

## See also

- `HTMLMediaElement`: Interface used to define the `HTMLMediaElement.src` property
