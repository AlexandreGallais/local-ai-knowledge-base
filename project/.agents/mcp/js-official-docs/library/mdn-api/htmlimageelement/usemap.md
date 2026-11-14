---
title: "HTMLImageElement: useMap property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlimageelement/usemap/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLImageElement: useMap property

The **`useMap`** property of the `HTMLImageElement` interface provides the name of the client-side image map to apply to the image. It reflects the `` element's `usemap` content attribute.

## Value

A string containing the hash `#` symbol followed by the `name` of the `<map>` element which defines the image map to apply to the image.

## Examples

### Using useMap

Consider a `<map>` that looks like this:

```html
<map name="mainmenu-map">
  <area
    shape="circle"
    coords="25, 25, 75"
    href="/index.html"
    alt="Return to home page" />
  <area shape="rect" coords="25, 25, 100, 150" href="/index.html" alt="Shop" />
</map>
```

Given the image map named `mainmenu-map`, you can dynamically construct images that reference the image map as follows:

```js
const image = new Image();
image.src = "menu-box.png";
image.alt = "";
image.useMap = "#mainmenu-map";
```

For additional examples (including interactive ones), see the articles about the `<map>` and `<area>` elements, as well as the guide to using image maps.

## See also

- Add a hitmap on top of an image
- `<map>`
- `<area>`
