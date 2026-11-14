---
title: "SVGAElement: pathname property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgaelement/pathname/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGAElement: pathname property

The **`pathname`** property of the `SVGAElement` interface represents the element's path.
It is an initial `"/"` followed by the path of the SVG `` element's `href`, not including the query string or fragment. If the element has no `href` attribute, this property contains an empty string, `""`.

This property can be set to change the path of the URL. Setting it also rewrites the element's `href` attribute as a complete, absolute URL.

See `URL.pathname` for more information.

## Value

A string.

## Examples

### Getting the pathname from an SVG link

Given the following SVG:

```html
<svg viewBox="0 0 200 30" xmlns="http://www.w3.org/2000/svg">
  <a id="link" href="https://example.com/docs/svg?q=path#example">
    <text x="0" y="20">Example</text>
  </a>
</svg>
```

```html
<pre id="log"></pre>
```

```css
svg {
  width: 200px;
  height: 30px;
}
svg a text {
  fill: blue;
  text-decoration: underline;
}
#log {
  padding: 0.5rem;
  border: 1px solid black;
}
```

```js
const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
}
```

We can read the path of the link, without the query string and the fragment:

```js
const link = document.getElementById("link");

log(`pathname: "${link.pathname}"`); // pathname: "/docs/svg"
```

## See also

- SVG `` element
- `HTMLAnchorElement.pathname`
