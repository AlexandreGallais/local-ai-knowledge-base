---
title: "HTMLSourceElement: sizes property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlsourceelement/sizes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLSourceElement: sizes property

The **`sizes`** property of the `HTMLSourceElement` interface is a string representing a list of one or more sizes, representing sizes between breakpoints, to which the resource applies.

It reflects the `sizes` attribute of the `` element.

## Value

A string.

## Examples

```html
<picture>
  <source
    id="el"
    srcset="medium-pic.jpg"
    type="image/jpeg"
    sizes="(50em <= width <= 60px) 50em,
           (30em <= width < 50em) 30em" />
</picture>
```

```js
const el = document.getElementById("el");
console.log(el.sizes); // Output: "(50em <= width <= 60px) 50em, (30em <= width < 50em) 30em"
el.sizes = "(50em <= width <= 60px) 100em, (30em <= width < 50em) 60em"; // Updates the sizes value
```

## See also

- `HTMLImageElement.sizes`
- `HTMLSourceElement.media`
- `HTMLSourceElement.type`
- `HTMLSourceElement.src`
- `HTMLSourceElement.srcset`
- ``
- ``
- `<audio>`
- ``
