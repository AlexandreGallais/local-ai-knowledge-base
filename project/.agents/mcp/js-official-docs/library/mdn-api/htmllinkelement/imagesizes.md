---
title: "HTMLLinkElement: imageSizes property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmllinkelement/imagesizes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLLinkElement: imageSizes property

The **`imageSizes`** property of the `HTMLLinkElement` interface indicates the size and conditions for the preloaded images defined by the `imageSrcset` property. It reflects the value of the `<link>` element's `imagesizes` attribute. This property can retrieve or set the `imagesizes` attribute value.

The `<link>` element's `imagesizes` attribute is the same as the `` element's `sizes` attribute: a comma-separated **source size** list. Each source size includes a media condition, the size of the image as a `length`, or the keyword `auto`, which must come first. For more information about the syntax of the `sizes` attribute, see ``.

The `imagesrcset` and `imagesizes` attributes are only relevant on `<link>` elements that have both a `rel` attribute set to `preload` and the `as` attribute set to `image`.

## Value

A string composed of comma-separated source sizes, or the empty string `""` if unspecified.

## Examples

Given the following `<link>` element:

```html
<link
  rel="preload"
  as="image"
  imagesrcset="narrow.png, medium.png 600w, wide.png 1200w"
  imagesizes="(width < 400px) 200px, (400px <= width < 600px) 75vw, 50vw" />
```

```html
<pre id="log"></pre>
```

```css
#log {
  padding: 0 0.25rem;
  font-size: 1.2em;
  line-height: 1.4;
}
```

```js
const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
```

…we can retrieve and update the `imagesizes` attribute value with the `imageSizes` property:

```js
const link = document.querySelector("link");
log(`Original: ${link.imageSizes}`);

// Change the value
link.imageSizes = "50vw";
log(`Updated: ${link.imageSizes}`);
```

## See also

- `HTMLLinkElement.imageSrcset`
- `HTMLImageElement.sizes`
- Media queries
- Using the `srcset` and `sizes` attributes
