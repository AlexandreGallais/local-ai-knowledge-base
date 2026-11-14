---
title: "SVGAElement: hostname property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgaelement/hostname/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGAElement: hostname property

The **`hostname`** property of the `SVGAElement` interface represents the element's hostname.
It is either the domain name or IP address of the SVG `` element's `href`. Unlike `host`, it never includes the port. If the URL does not have a hostname, this property contains an empty string, `""`. IP addresses are normalized, such as stripping leading zeros, and domain names are converted to IDN.

This property can be set to change the hostname of the URL. Setting it also rewrites the element's `href` attribute as a complete, absolute URL.

See `URL.hostname` for more information.

## Value

A string.

## Examples

### Getting the hostname from an SVG link

Given the following SVG:

```html
<svg viewBox="0 0 200 30" xmlns="http://www.w3.org/2000/svg">
  <a id="link" href="https://example.com:4097/">
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

We can read the hostname of the link, without the port:

```js
const link = document.getElementById("link");

log(`hostname: "${link.hostname}"`); // hostname: "example.com"
```

## See also

- SVG `` element
- `HTMLAnchorElement.hostname`
