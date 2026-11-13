---
title: "SVGAElement: search property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgaelement/search/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGAElement: search property

The **`search`** property of the `SVGAElement` interface represents the element's query string.
It is a `"?"` followed by the parameters of the SVG `` element's `href`. If the URL does not have any parameters, this property contains an empty string, `""`.

This property can be set to change the query string of the URL. When setting, a single `"?"` prefix is added to the provided value, if not already present, and setting it to `""` removes the query string. Setting it also rewrites the element's `href` attribute as a complete, absolute URL.

The query is percent-encoded when setting but not percent-decoded when reading.

See `URL.search` for more information.

## Value

A string.

## Examples

### Getting the search string from an SVG link

Given the following SVG:

```html
<svg viewBox="0 0 200 30" xmlns="http://www.w3.org/2000/svg">
  <a id="link" href="https://example.com/search?q=svg">
    <text x="0" y="20">Search for SVG</text>
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

We can read the query string of the link:

```js
const link = document.getElementById("link");

log(`search: "${link.search}"`); // search: "?q=svg"
```

### Advanced parsing using URLSearchParams

Alternatively, `URLSearchParams` can be used to read individual parameters out of the query string:

```html
<svg viewBox="0 0 200 30" xmlns="http://www.w3.org/2000/svg">
  <a id="link" href="https://example.com/search?q=svg">
    <text x="0" y="20">Search for SVG</text>
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

```js
const link = document.getElementById("link");
const params = new URLSearchParams(link.search);

log(`q: "${params.get("q")}"`); // q: "svg"
```

## See also

- SVG `` element
- `HTMLAnchorElement.search`
