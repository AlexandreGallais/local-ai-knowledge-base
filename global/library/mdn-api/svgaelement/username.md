---
title: "SVGAElement: username property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgaelement/username/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGAElement: username property

The **`username`** property of the `SVGAElement` interface represents the username component of the SVG `` element's `href`.
If the URL does not have a username, this property contains an empty string, `""`.

This property can be set to change the username of the URL. If the URL has no `host` or its scheme is `file:`, then setting this property has no effect. Setting it also rewrites the element's `href` attribute as a complete, absolute URL.

The username is percent-encoded when setting but not percent-decoded when reading.

See `URL.username` for more information.

## Value

A string.

## Examples

### Getting the username from an SVG link

Given the following SVG:

```html
<svg viewBox="0 0 200 30" xmlns="http://www.w3.org/2000/svg">
  <a id="<example-value>" href="<example-value>">
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

We can read the username of the link:

```js
const link = document.getElementById("link");

log(`username: "${link.username}"`); // username: "anonymous"
```

## See also

- SVG `` element
- `HTMLAnchorElement.username`
