---
title: "SVGAElement: port property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgaelement/port/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGAElement: port property

The **`port`** property of the `SVGAElement` interface represents the port number of the SVG `` element's `href`.
If the port is the default for the protocol (`80` for `ws:` and `http:`, `443` for `wss:` and `https:`, and `21` for `ftp:`), this property contains an empty string, `""`.

This property can be set to change the port of the URL. If the URL has no `host` or its scheme is `file:`, then setting this property has no effect. Invalid port numbers are silently ignored. Setting it also rewrites the element's `href` attribute as a complete, absolute URL.

See `URL.port` for more information.

## Value

A string.

## Examples

### Getting the port from an SVG link

Given the following SVG:

```html
<svg viewBox="0 0 200 30" xmlns="http://www.w3.org/2000/svg">
  <a id="link" href="https://example.com:443/">
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

We can read the port of the link, which is empty for the default port of the scheme:

```js
const link = document.getElementById("link");

log(`port: "${link.port}"`); // port: ""

link.setAttribute("href", "https://example.com:8888/");
log(`port: "${link.port}"`); // port: "8888"
```

## See also

- SVG `` element
- `HTMLAnchorElement.port`
