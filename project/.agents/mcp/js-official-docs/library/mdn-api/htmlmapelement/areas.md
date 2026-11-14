---
title: "HTMLMapElement: areas property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmapelement/areas/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMapElement: areas property

The **`areas`** read-only property of the `HTMLMapElement` interface returns a collection of `<area>` elements associated with the `<map>` element.

## Value

A `HTMLCollection` object of `HTMLAreaElement` elements.

## Example

```html
<map id="image-map" name="image-map">
  <area shape="circle" coords="50,50,35" href="#left" alt="left arrow" />
  <area shape="circle" coords="150,50,35" href="#right" alt="right arrow" />
</map>
<img
  usemap="#image-map"
  src="left-right-arrow.png"
  alt="left right arrow image" />
<output></output>
```

```css
output {
  display: block;
}
```

```js
const mapElement = document.getElementById("image-map");
const outputElement = document.querySelector("output");

for (const area of mapElement.areas) {
  area.addEventListener("click", (event) => {
    outputElement.textContent = `You clicked on the ${area.alt} area.\n\n`;
  });
}
```

## See also

- `HTMLAreaElement`
- `HTMLImageElement.useMap`
