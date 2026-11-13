---
title: "SVGAElement: protocol property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgaelement/protocol/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGAElement: protocol property

The **`protocol`** property of the `SVGAElement` interface represents the protocol or scheme of the SVG `` element's `href`, including the final `":"`.

This property can be set to change the protocol of the URL. A `":"` is appended to the provided string if not provided. The provided scheme has to be compatible with the rest of the URL to be considered valid. Setting it also rewrites the element's `href` attribute as a complete, absolute URL.

See `URL.protocol` for more information.

## Value

A string.

## Examples

### Getting the protocol of an SVG link

Given the following SVG:

```html
<svg viewBox="0 0 200 30" xmlns="http://www.w3.org/2000/svg">
  <a id="link" href="https://example.com/">
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

We can read the protocol of the link, including the final `":"`:

```js
const link = document.getElementById("link");

log(`protocol: "${link.protocol}"`); // protocol: "https:"
```

## See also

- SVG `` element
- `HTMLAnchorElement.protocol`
