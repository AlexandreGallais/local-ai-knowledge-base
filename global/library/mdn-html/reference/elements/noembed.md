---
title: "`<noembed>` HTML embed fallback element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/noembed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<noembed>` HTML embed fallback element

The **`<noembed>`** HTML element is an obsolete, non-standard way to provide alternative, or "fallback", content for browsers that do not support the `` element or do not support the type of embedded content an author wishes to use. This element was deprecated in HTML 4.01 and above in favor of placing fallback content between the opening and closing tags of an `<object>` element.

> **Note:**
> While this element currently still works in many browsers, it is obsolete and should not be used. Use `<object>` instead, with fallback content between the opening and closing tags of the element.

## Examples

The message inside `<noembed>` tag will appear only when your browser does not support `` tag.

### Show an alternative content

```html
<embed
  type="video/webm"
  src="/media/examples/flower.mp4"
  width="200"
  height="200" />
<noembed>
  <h1>Alternative content</h1>
</noembed>
```
