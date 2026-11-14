---
title: "HTMLLinkElement: imageSrcset property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmllinkelement/imagesrcset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLLinkElement: imageSrcset property

The **`imageSrcset`** property of the `HTMLLinkElement` interface is a string which identifies one or more comma-separated **image candidate strings**. This property reflects the value of the `<link>` element's `imagesrcset` attribute. This property can retrieve or set the `imagesrcset` attribute value.

Each image candidate string contains an image URL and an optional width and/or pixel density descriptor indicating the conditions under which that candidate image should be used.

```plain
"images/team-photo.jpg, images/team-photo-retina.jpg 2x, images/team-photo-large.jpg 1400w"
```

For HTML `<link>` elements with `rel="preload"` and `as="image"` set, the `imagesrcset` attribute has similar syntax and semantics as the `` element's `srcset` attribute, which indicates to preload the appropriate resource used by an `` element with corresponding values for its `srcset` and `sizes` attributes.

If the `imageSrcset` property includes width descriptors, the `imageSizes` property must be non-null, or the `imageSrcset` value will be ignored.

## Value

A string composed of a comma-separated list of one or more image candidate strings, or the empty string `""` if unspecified.

## Examples

Given the following `<link>` element:

```html
<link
  rel="preload"
  as="image"
  imagesizes="50vw"
  imagesrcset="bg-narrow.png, bg-wide.png 800w" />
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

…we can access the `imagesrcset` attribute value, and update it, using the `imageSrcset` property:

```js
const link = document.querySelector("link");
log(`Original: ${link.imageSrcset}`);

// add an image candidate string
link.imageSrcset += ", bg-huge.png 1200w";
log(`Updated: ${link.imageSrcset}`);
```

## See also

- `HTMLLinkElement.imageSizes`
- `HTMLImageElement.srcset`
- Speculative loading
- Responsive images
