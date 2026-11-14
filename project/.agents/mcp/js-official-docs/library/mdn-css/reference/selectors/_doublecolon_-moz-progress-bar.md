---
title: "`::-moz-progress-bar` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_-moz-progress-bar/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::-moz-progress-bar` CSS pseudo-element

The **`::-moz-progress-bar`** CSS pseudo-element is a Mozilla extension that represents the progress bar inside a `<progress>` element. (The bar represents the amount of progress that has been made.)

If you want to select the unfinished part of `<progress>` in Mozilla, please select the `<progress>` directly.

## Syntax

```css
::-moz-progress-bar {
  /* ... */
}
```

## Examples

### HTML

```html
<progress value="30" max="100">30%</progress>
<progress max="100">Indeterminate</progress>
```

### CSS

```css
::-moz-progress-bar {
  background-color: red;
}

/* Force indeterminate bars to have zero width */
:indeterminate::-moz-progress-bar {
  width: 0;
}
```

## Specifications

Not part of any standard.

## See also

- `<progress>`
- `::-webkit-progress-bar`
- `::-webkit-progress-value`
- `::-webkit-progress-inner-element`
