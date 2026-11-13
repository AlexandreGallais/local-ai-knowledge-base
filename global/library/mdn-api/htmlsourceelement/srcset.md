---
title: "HTMLSourceElement: srcset property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlsourceelement/srcset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLSourceElement: srcset property

The **`srcset`** property of the `HTMLSourceElement` interface is a string containing a comma-separated list of candidate images.

Each candidate image includes the URL of an image resource to use as the source for the element and optionally a descriptor indicating the circumstances in which the image should be used. The descriptor is either a number followed by `'w'`, indicating the element width, or a number followed by `'x'`, indicating the device pixel density.

It reflects the `srcset` attribute of the `` element nested in a `` element. It has no meaning and is ignored when it is nested in an `<audio>` or `` element, which use the `src` attribute instead.

## Value

A string.

## Examples

```html
<picture>
  <source
    id="el"
    srcset="smile.png, smile-1.5x.png 1.5x, smile-2x.png 2x"
    type="image/png" />
</picture>
```

```js
const el = document.getElementById("el");
console.log(el.srcset); // Output: "smile.png, smile-1.5x.png 1.5x, smile-large 800w"
el.srcset = "smile.png, smile-med.png 600w, smile-large.png 800w"; // Updates the srcset value
```

## See also

- `HTMLSourceElement.type`
- `HTMLSourceElement.src`
- `HTMLSourceElement.media`
- `HTMLSourceElement.sizes`
- ``
- ``
