---
title: "`elementtiming` HTML attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/attributes/elementtiming/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `elementtiming` HTML attribute

The **`elementtiming`** attribute is used to indicate that an element is flagged for tracking by `PerformanceObserver` objects using the `"element"` type. For more details, see the `PerformanceElementTiming` interface.

This attribute may be applied to ``, `<image>` elements inside an ``, poster images of `` elements, elements which have a `background-image`, and elements containing text nodes, such as a ``.

In the DOM, this attribute is reflected as `Element.elementTiming`.

## Usage notes

The value given for `elementtiming` becomes an identifier for the observed element.

```html
<img alt="alt" src="img.jpg" elementtiming="label for element" />
```

Good contenders for elements you might want to observe are:

- The main image for an article.
- A blog post title
- Images in a carousel for a shopping site.
- The poster image for the main video on a page.

## Examples

```html
<img
  alt="Alt for a main blog post image"
  src="my-massive-image.jpg"
  elementtiming="Main image" />

<p elementtiming="important-text">Some very important information.</p>
```

## See also

- `PerformanceElementTiming`
- `Element.elementTiming`
