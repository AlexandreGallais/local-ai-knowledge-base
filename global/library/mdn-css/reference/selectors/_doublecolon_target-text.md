---
title: "`::target-text` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_target-text/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::target-text` CSS pseudo-element

The **`::target-text`** CSS pseudo-element represents the text that has been scrolled to if the browser supports text fragments. It allows authors to choose how to highlight that section of text.

The `::target-text` pseudo-element follows a special inheritance model common to all highlight pseudo-elements. For more details on how this inheritance works, see the Highlight pseudo-elements inheritance section.

## Syntax

```css
::target-text {
  /* ... */
}
```

## Examples

### Highlighting text fragments

```css
::target-text {
  background-color: rebeccapurple;
  color: white;
}
```

To see this CSS in action follow the link to scroll-to-text demo.

## See also

- Text fragments
- `:target` (for highlighting target elements)
