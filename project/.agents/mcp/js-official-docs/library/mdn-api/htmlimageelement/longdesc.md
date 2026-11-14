---
title: "HTMLImageElement: longDesc property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlimageelement/longdesc/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLImageElement: longDesc property

The _deprecated_ **`longDesc`** property of the `HTMLImageElement` interface specifies the URL of a text or HTML file which contains a long-form description of the image. This can be used to provide optional added details beyond the short description provided in the `title` attribute. It reflects the `` element's `longdesc` content attribute.

This attribute is considered obsolete in the HTML spec. It has an uncertain future; authors should use a WAI-ARIA alternative such as `aria-describedby` or `aria-details`. You can also encapsulate the image within a link using the `` element.

## Value

A string which may be either an empty string (indicating that no long description is available) or the URL of a file containing a long form description of the image's contents.

## Examples

Consider the following older HTML:

```html
<img
  src="taco-tuesday.jpg"
  alt="Taco Tuesday"
  longdesc="image-descriptions/taco-tuesday.html" />
```

Here, the `longDesc` is used to indicate that the user should be able to access a detailed description of the image `taco-tuesday.jpg` in the HTML file `image-descriptions/taco-tuesday.html`.

This should be converted into the following HTML:

```html
<a href="image-descriptions/taco-tuesday.html">
  <img src="taco-tuesday.jpg" alt="Taco Tuesday" />
</a>
```

With that, the image is a link to the HTML file describing the image in more detail.

## See also

- `aria-details`
