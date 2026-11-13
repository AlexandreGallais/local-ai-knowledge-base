---
title: "HTMLSourceElement: src property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlsourceelement/src/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLSourceElement: src property

The **`src`** property of the `HTMLSourceElement` interface is a string indicating the URL of a media resource to use as the source for the element.

It reflects the `src` attribute of the `` element nested in an `<audio>` or `` element. It has no meaning and is ignored when it is nested in a `` element.

## Value

A string; the URL of a source resource to use in the element.

## Examples

```html
<video>
  <source
    id="el"
    src="large.webp"
    type="video/webp"
    media="screen and (600px <= width <= 800px)" />
</video>
```

```js
const el = document.getElementById("el");
console.log(el.src); // Output: "large.webp"
el.src = "medium.webp"; // Updates the src value
```

## See also

- `HTMLSourceElement.type`
- `HTMLSourceElement.srcset`
- `HTMLSourceElement.media`
- `HTMLSourceElement.sizes`
- ``
- `<audio>`
- ``
