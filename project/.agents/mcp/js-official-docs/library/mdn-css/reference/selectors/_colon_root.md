---
title: "`:root` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_root/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:root` CSS pseudo-class

The **`:root`** CSS pseudo-class matches the root element of a tree representing the document. In HTML, `:root` represents the `<html>` element and is identical to the selector `html`, except that its specificity (0-1-0) is higher than html's (0-0-1).

```css
/* Selects the root element of the document:
   <html> in the case of HTML */
:root {
  background: yellow;
}
```

## Syntax

```css
:root {
  /* ... */
}
```

## Examples

### Declaring global CSS variables

`:root` can be useful for declaring global CSS variables:

```css
:root {
  --main-color: hotpink;
  --pane-padding: 5px 42px;
}
```

## See also

- `<html>`
- `Document.rootElement`
- `Node.getRootNode()`
- `Element.shadowRoot`
- `ShadowRoot`
