---
title: "`<frameset>` HTML frameset element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/frameset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<frameset>` HTML frameset element

The **`<frameset>`** HTML element is used to contain `<frame>` elements.

> **Note:**
> Because the use of frames is now discouraged in favor of using ``, this element is not typically used by modern websites.

## Attributes

Like all other HTML elements, this element supports the global attributes.

- `cols` (deprecated) (non-standard)
    This attribute specifies the number and size of horizontal spaces in a frameset.
- `rows` (deprecated) (non-standard)
    This attribute specifies the number and size of vertical spaces in a frameset.

## Example

### A frameset document

A frameset document has a `<frameset>` element instead of a `<body>` element. The `<frame>` elements are placed within the `<frameset>`.

```html
<!doctype html>
<html lang="en-US">
  <head>
    <!-- Document metadata goes here -->
  </head>
  <frameset cols="50%, 50%">
    <frame
      src="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe" />
    <frame
      src="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/frame" />
  </frameset>
</html>
```

If you want to embed another HTML page into the `<body>` of a document, use an `` element.

## See also

- `<frame>`
- ``
