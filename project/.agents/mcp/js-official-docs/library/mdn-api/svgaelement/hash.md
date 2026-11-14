---
title: "SVGAElement: hash property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgaelement/hash/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGAElement: hash property

The **`hash`** property of the `SVGAElement` interface represents the element's fragment identifier.
It is the string `"#"`, followed by the fragment identifier of the SVG `` element's `href`. If the URL does not have a fragment identifier, this property contains an empty string, `""`.

This property can be set to change the fragment of the URL. When setting, a single `"#"` prefix is added to the provided value, if not already present, and setting it to `""` removes the fragment. Setting it also rewrites the element's `href` attribute as a complete, absolute URL.

See `URL.hash` for more information.

## Value

A string.

## Examples

### Getting the hash from an SVG link

Given the following SVG:

```html
<svg viewBox="0 0 200 30" xmlns="http://www.w3.org/2000/svg">
  <a id="link" href="https://example.com/#example">
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

We can read the fragment identifier of the link:

```js
const link = document.getElementById("link");

log(`hash: "${link.hash}"`); // hash: "#example"
```

## See also

- SVG `` element
- `HTMLAnchorElement.hash`
