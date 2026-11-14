---
title: "SVGAElement: host property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgaelement/host/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGAElement: host property

The **`host`** property of the `SVGAElement` interface represents the element's host.
It is the `hostname` of the SVG `` element's `href`, followed by a `":"` and the `port` if the URL has one. If the URL does not have a hostname, this property contains an empty string, `""`.

This property can be set to change the host of the URL. Setting it also rewrites the element's `href` attribute as a complete, absolute URL.

See `URL.host` for more information.

## Value

A string.

## Examples

### Getting the host from an SVG link

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

We can read the host of the link, and see how the port is included only when it's not the default one for the scheme:

```js
const link = document.getElementById("link");

log(`host: "${link.host}"`); // host: "example.com"

link.setAttribute("href", "https://example.com:443/");
log(`host: "${link.host}"`); // host: "example.com"

link.setAttribute("href", "https://example.com:4097/");
log(`host: "${link.host}"`); // host: "example.com:4097"
```

## See also

- SVG `` element
- `HTMLAnchorElement.host`
