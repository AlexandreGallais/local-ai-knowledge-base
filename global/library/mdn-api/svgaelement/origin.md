---
title: "SVGAElement: origin property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgaelement/origin/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGAElement: origin property

The **`origin`** read-only property of the `SVGAElement` interface represents the origin of the SVG `` element's `href`: usually its scheme, domain, and port.

The exact structure varies depending on the type of URL:

- For URLs using the `ftp:`, `http:`, `https:`, `ws:`, and `wss:` schemes, the `protocol` followed by `//`, followed by the `host`. Same as `host`, the `port` is only included if it's not the default for the protocol.
- For URLs using the `file:` scheme, the value is browser dependent.
- For URLs using the `blob:` scheme, the origin of the URL following `blob:`, but only if that URL uses the `http:`, `https:`, or `file:` scheme. For example, `blob:https://mozilla.org` will have `https://mozilla.org`.

For all other cases, the string `"null"` is returned.

See `URL.origin` for more information.

## Value

A string.

## Examples

### Getting the origin of an SVG link

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

We can read the origin of the link:

```js
const link = document.getElementById("link");

log(`origin: "${link.origin}"`); // origin: "https://example.com"
```

## See also

- SVG `` element
- `HTMLAnchorElement.origin`
