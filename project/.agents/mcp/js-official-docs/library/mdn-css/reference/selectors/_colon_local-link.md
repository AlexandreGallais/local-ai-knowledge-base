---
title: "`:local-link` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_local-link/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:local-link` CSS pseudo-class

The **`:local-link`** CSS pseudo-class represents a link to the same document. Therefore an element that is the source anchor of a hyperlink whose target's absolute URL matches the element's own document URL.

```css
/* Selects any <a> that links to the current document */
a:local-link {
  color: green;
}
```

## Syntax

```css
:local-link {
  /* ... */
}
```

## Examples

### HTML

```html
<a href="#target">This is a link on the current page.</a><br />
<a href="https://example.com">This is an external link</a><br />
```

### CSS

```css
a:local-link {
  color: green;
}
```

## Browser compatibility

Currently, no browsers support this feature.

## See also

- Link-related pseudo-classes: `:link`, `:visited`, `:hover`, `:active`, `:any-link`
- CSS selectors module
