---
title: "`:target-current` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_target-current/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:target-current` CSS pseudo-class

The **`:target-current`** CSS pseudo-class selects the **active** scroll marker — the scroll marker of a `scroll-marker-group` that is currently scrolled to. This selector can be used to style the active navigation position within a scroll marker group.

> **Note:**
> The `:target-current` pseudo-class is only valid on `::scroll-marker` pseudo-elements and elements that have been designated as scroll markers using the `scroll-target-group` property.

## Syntax

```css
:target-current {
  /* ... */
}
```

## Examples

See Creating CSS carousels and `::scroll-marker` for complete examples that use the `:target-current` pseudo-class.

### Basic usage

```css
::scroll-marker {
  background-color: white;
}

::scroll-marker:target-current {
  background-color: black;
}
```

## See also

- `scroll-marker-group`
- `scroll-target-group`
- `:target-before`, `:target-after`
- `::scroll-marker`
- `::scroll-marker-group`
- Creating CSS carousels
- CSS overflow module
- CSS Carousel Gallery via chrome.dev (2025)
