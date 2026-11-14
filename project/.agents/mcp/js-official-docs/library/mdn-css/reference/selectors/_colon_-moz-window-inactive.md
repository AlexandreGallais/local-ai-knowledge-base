---
title: "`:-moz-window-inactive` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_-moz-window-inactive/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:-moz-window-inactive` CSS pseudo-class

The **`:-moz-window-inactive`** CSS pseudo-class is a Mozilla extension that matches any element while it's in an inactive window.

`:-moz-window-inactive` works in content HTML documents, too.

> **Note:**
> Prior to the addition of this pseudo-class, giving different styles to background windows was achieved by setting an attribute (`active="true"`) on the top-level XUL chrome window. This attribute is no longer used.

## Syntax

```css
:-moz-window-inactive {
  /* ... */
}
```

## Examples

This example alters the appearance of a box's background depending on whether its window is active or not.

### HTML

```html
<div id="my-box">
  <p>This is a box!</p>
</div>
```

### CSS

```css
#my-box {
  background: linear-gradient(to bottom, yellow, cyan);
  width: 200px;
  height: 200px;
}

#my-box:-moz-window-inactive {
  background: cyan;
}
```

### Result

The result of this code is shown below. You can view this as a  as well.

## Specifications

Not part of any standard.

## See also

- Mozilla CSS extensions
- Related CSS selectors:
  - `:active`

- The `Document.activeElement` property for regular DOM, and the `ShadowRoot.activeElement` property for shadow DOM roots.
