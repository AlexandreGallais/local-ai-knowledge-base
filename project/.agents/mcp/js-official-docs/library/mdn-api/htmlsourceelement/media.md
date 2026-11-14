---
title: "HTMLSourceElement: media property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlsourceelement/media/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLSourceElement: media property

The **`media`** property of the `HTMLSourceElement` interface is a string representing the intended destination medium for the resource. The value is a media query, which is a comma separated list of media-types, media-features, and logical operators.

It reflects the `media` attribute of the `` element.

## Value

A string.

## Examples

```html
<video>
  <source
    id="el"
    src="largeVideo.mov"
    type="video/quicktime"
    media="screen and (width >= 600px)" />
</video>
```

```js
const el = document.getElementById("el");
console.log(el.media); // Output: "screen and (width >= 600px)"
el.media = "(width >= 800px)"; // Updates the media value
```

## See also

- `HTMLSourceElement.type`
- `HTMLSourceElement.sizes`
- `HTMLSourceElement.src`
- `HTMLSourceElement.srcset`
- ``
- ``
- `<audio>`
- ``
- Using media queries
