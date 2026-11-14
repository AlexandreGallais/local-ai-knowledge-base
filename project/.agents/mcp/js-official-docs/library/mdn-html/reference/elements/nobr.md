---
title: "`<nobr>` HTML non-breaking text element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/nobr/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<nobr>` HTML non-breaking text element

The **`<nobr>`** HTML element prevents the text it contains from automatically wrapping across multiple lines, potentially resulting in the user having to scroll horizontally to see the entire width of the text.

> **Warning:**
> Although this element is widely supported, it was _never_ standard HTML, so you shouldn't use it. Instead, use the CSS property `white-space` like this:

```html
<span class="nobr">Long line with no breaks</span>
```

```css
.nobr {
  white-space: nowrap;
}
```

## See also

- `white-space`
- `overflow`
